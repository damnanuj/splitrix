# 🏗️ Splitrix Server Architecture Overview

## 📋 System Architecture

### **Core Principles**
1. **Lightweight Notifications**: Store only essential reference data
2. **Live Data Fetching**: Current information fetched separately
3. **Immutable Events**: Notifications represent what happened, not current state
4. **Real-time Awareness**: Always show fresh, accurate data

---

## 🔄 Data Flow Architecture

### **1. Notification Creation Flow**
```
User A invites User B to Group
    ↓
Create Invite Record (status: pending)
    ↓
Create Lightweight Notification
    ├── type: "invite_sent"
    ├── data: { groupId, inviteId, inviterId }
    └── message: "John invited you to join 'Billionaires'"
    ↓
User B receives notification
    ↓
Frontend fetches live data when displaying
    ↓
Shows current group info + invite status
```

### **2. Live Data Fetching Flow**
```
Frontend requests notification
    ↓
Backend fetches notification (lightweight)
    ↓
Backend fetches live data:
    ├── Current group info
    ├── Current membership status
    ├── Current invite status
    └── Real-time user data
    ↓
Returns notification + live data
    ↓
Frontend displays fresh information
```

### **3. Invite Response Flow**
```
User responds to invite
    ↓
Update invite status (accepted/declined)
    ↓
If accepted: Add user to group
    ↓
Create notification for inviter
    ↓
Update original notification (if needed)
    ↓
Frontend shows updated status
```

---

## 🗄️ Database Schema

### **Notification Model (Lightweight)**
```javascript
{
  user: ObjectId,           // Who received the notification
  type: String,             // Event type (invite_sent, etc.)
  title: String,            // Notification title
  message: String,         // Notification message
  data: {
    groupId: ObjectId,      // Reference to group
    inviteId: ObjectId,     // Reference to invite
    inviterId: ObjectId,    // Reference to inviter
    // Other reference fields...
  },
  readAt: Date,            // When notification was read
  createdAt: Date,         // When event occurred
  updatedAt: Date
}
```

### **Invite Model (Enhanced)**
```javascript
{
  groupId: ObjectId,        // Group being invited to
  inviterId: ObjectId,      // Who sent the invite
  inviteeId: ObjectId,      // Who was invited
  status: String,           // pending, accepted, declined, expired
  respondedAt: Date,        // When invite was responded to
  message: String,         // Optional invite message
  expiresAt: Date,         // When invite expires (7 days)
  createdAt: Date,
  updatedAt: Date
}
```

### **Group Model (Existing)**
```javascript
{
  name: String,            // Group name
  createdBy: ObjectId,      // Group creator
  members: [ObjectId],     // Group members
  description: String,     // Group description
  avatar: String,          // Group avatar
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛣️ API Route Structure

### **Authentication Routes** (`/api/auth`)
- `POST /signup` - Create user account
- `POST /login` - Authenticate user
- `POST /google` - Google OAuth

### **User Routes** (`/api/user`)
- `GET /` - List all users
- `GET /:id` - Get user details
- `POST /friends` - Add friend
- `GET /friends/list` - List friends

### **Group Routes** (`/api/group`)
- `POST /` - Create group
- `GET /mine` - Get user's groups
- `POST /invite` - Send group invite

### **Group Info Routes** (`/api/groups`) - **NEW**
- `GET /:id` - Get live group information
- `GET /:id/membership` - Check membership status

### **Invite Routes** (`/api/invites`) - **NEW**
- `GET /:id` - Get invite details
- `POST /:id/respond` - Accept/decline invite
- `GET /` - Get all user's invites

### **Notification Routes** (`/api/notifications`) - **ENHANCED**
- `GET /` - Get notifications with live data
- `GET /?unreadOnly=true` - Get unread notifications
- `GET /unread-count` - Get unread count
- `PUT /:id/read` - Mark as read
- `PUT /read-all` - Mark all as read
- `GET /invites` - Get pending invites

### **Financial Routes** (`/api/bill`, `/api/settlement`, `/api/balance`)
- Bill management
- Settlement tracking
- Balance calculations

---

## 🔔 Notification System Architecture

### **1. Lightweight Storage**
```javascript
// Notification stores only references
{
  type: "invite_sent",
  data: {
    groupId: "64f1a2b3c4d5e6f7g8h9i0j3",
    inviteId: "64f1a2b3c4d5e6f7g8h9i0j4",
    inviterId: "64f1a2b3c4d5e6f7g8h9i0j1"
  }
}
```

### **2. Live Data Enhancement**
```javascript
// Live data fetched separately
{
  liveData: {
    group: {
      id: "64f1a2b3c4d5e6f7g8h9i0j3",
      name: "Billionaires Club",
      members: [...], // Current members
      creator: {...}  // Current creator
    },
    inviteStatus: "pending",
    isMember: false,
    membershipStatus: "not_member"
  }
}
```

### **3. Real-time Status**
- **Group membership**: Always current
- **Invite status**: Reflects actual state
- **User information**: Fresh data
- **Group details**: Up-to-date

---

## 🎯 Frontend Integration Patterns

### **1. Notification Display**
```javascript
// Check notification type and live data
if (notification.type === 'invite_sent') {
  const { group, inviteStatus, isMember } = notification.liveData;
  
  if (inviteStatus === 'pending' && !isMember) {
    // Show Accept/Decline buttons
    showInviteActions(group, notification.data.inviteId);
  } else if (inviteStatus === 'accepted') {
    // Show "You accepted this invite"
    showAcceptedStatus();
  } else if (isMember) {
    // Show "You're now a member"
    showMemberStatus(group);
  }
}
```

### **2. Live Data Fetching**
```javascript
// Get fresh group information
const getGroupInfo = async (groupId) => {
  const response = await fetch(`/api/groups/${groupId}`);
  const data = await response.json();
  
  // Use fresh data for UI
  updateGroupUI(data.data);
};
```

### **3. Invite Management**
```javascript
// Respond to invite
const respondToInvite = async (inviteId, action) => {
  const response = await fetch(`/api/invites/${inviteId}/respond`, {
    method: 'POST',
    body: JSON.stringify({ action })
  });
  
  // Update UI with new status
  updateInviteStatus(inviteId, action);
};
```

---

## 🔄 State Management

### **1. Notification State**
```javascript
// Frontend state structure
const notificationState = {
  notifications: [
    {
      id: "notif1",
      type: "invite_sent",
      data: { groupId: "group1", inviteId: "invite1" },
      liveData: {
        group: { name: "Billionaires", members: [...] },
        inviteStatus: "pending",
        isMember: false
      }
    }
  ],
  unreadCount: 3
};
```

### **2. Group State**
```javascript
// Group state with live data
const groupState = {
  groups: {
    "group1": {
      id: "group1",
      name: "Billionaires",
      members: [...], // Current members
      isMember: true,
      isCreator: false
    }
  }
};
```

### **3. Invite State**
```javascript
// Invite state management
const inviteState = {
  invites: {
    "invite1": {
      id: "invite1",
      groupId: "group1",
      status: "pending",
      isMember: false,
      membershipStatus: "not_member"
    }
  }
};
```

---

## 🚀 Performance Optimizations

### **1. Efficient Queries**
- Notifications use indexes for fast retrieval
- Live data fetched only when needed
- Caching for frequently accessed data

### **2. Lightweight Responses**
- Only essential data in notifications
- Live data fetched separately
- Minimal payload sizes

### **3. Real-time Updates**
- WebSocket connections for live updates
- Optimistic UI updates
- Background data refresh

---

## 🔧 Error Handling

### **1. API Errors**
```javascript
// Standard error response format
{
  "success": false,
  "msg": "Error description",
  "code": "ERROR_CODE"
}
```

### **2. Frontend Error Handling**
```javascript
// Handle API errors gracefully
try {
  const response = await fetch('/api/notifications');
  const data = await response.json();
  
  if (!data.success) {
    showError(data.msg);
    return;
  }
  
  updateNotifications(data.data);
} catch (error) {
  showError('Network error occurred');
}
```

---

## 🎉 Benefits of New Architecture

### **1. No Stale Data**
- Notifications never contain outdated information
- Live data is always current
- Group membership status is accurate

### **2. Lightweight Storage**
- Notifications store only essential references
- No duplicate data storage
- Efficient database queries

### **3. Real-time Awareness**
- Frontend always knows current state
- Users see accurate information
- No confusion about invite status

### **4. Scalable Architecture**
- Clean separation of concerns
- Easy to extend with new notification types
- Modular and maintainable code

### **5. Better User Experience**
- Users always see current information
- No need to refresh or reload data
- Clear status indicators

---

## 🔮 Future Enhancements

### **1. Real-time Updates**
- WebSocket connections for live updates
- Push notifications for mobile
- Real-time collaboration features

### **2. Advanced Caching**
- Redis for session management
- CDN for static assets
- Database query optimization

### **3. Analytics & Monitoring**
- User behavior tracking
- Performance monitoring
- Error logging and alerting

---

## 📞 Support & Maintenance

### **1. API Versioning**
- Backward compatibility maintained
- Gradual migration support
- Clear deprecation notices

### **2. Documentation**
- Comprehensive API docs
- Code examples and tutorials
- Integration guides

### **3. Testing**
- Unit tests for all endpoints
- Integration tests for workflows
- Performance testing

This architecture ensures your notification system is robust, scalable, and always provides fresh, accurate data to users! 🚀
