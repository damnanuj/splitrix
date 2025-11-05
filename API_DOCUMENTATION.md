# 🚀 Splitrix Server API Documentation

## 📋 Overview

This document provides comprehensive API documentation for the Splitrix Server with the new lightweight notification system and live data fetching architecture. All endpoints return real-time data to ensure users always see fresh information.

## 🏗️ Architecture Principles

### **1. Lightweight Notifications**
- Notifications store only essential reference data (groupId, inviteId, inviterId)
- No stale group details stored in notifications
- Live data fetched separately when needed

### **2. Live Data Fetching**
- Current group information fetched in real-time
- Membership status always accurate
- Invite status reflects actual state

### **3. Immutable Events**
- Notifications represent events that happened
- Never updated, only new notifications created
- Historical accuracy maintained

## 🔐 Authentication

All protected routes require Bearer token authentication:
```http
Authorization: Bearer <jwt_token>
```

## 📡 Base URL
```
http://localhost:8000/api
```

---

## 🔐 Authentication Endpoints

### **POST** `/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "success": true,
  "msg": "User created successfully",
  "data": {
    "user": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": ""
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **POST** `/auth/login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Login successful",
  "data": {
    "user": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": ""
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **POST** `/auth/google`
Authenticate with Google OAuth.

**Request Body:**
```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "photo": "https://lh3.googleusercontent.com/avatar.jpg"
}
```

**Response:** Same as login response.

---

## 👥 User Management

### **GET** `/user/`
Get all users (for friend suggestions).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": "https://example.com/avatar.jpg"
    }
  ]
}
```

### **GET** `/user/:userId`
Get specific user details.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "https://example.com/avatar.jpg",
    "friends": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    ]
  }
}
```

### **POST** `/user/friends`
Add a friend.

**Request Body:**
```json
{
  "friendId": "64f1a2b3c4d5e6f7g8h9i0j2"
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Friend added successfully"
}
```

### **GET** `/user/friends/list`
Get user's friends list.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "profilePicture": "https://example.com/avatar.jpg"
    }
  ]
}
```

---

## 🏢 Group Management

### **POST** `/group/`
Create a new group.

**Request Body:**
```json
{
  "name": "Billionaires Club",
  "description": "A group for billionaires to split expenses",
  "avatar": "https://example.com/group-avatar.jpg",
  "memberIds": []
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Group created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "name": "Billionaires Club",
    "description": "A group for billionaires to split expenses",
    "avatar": "https://example.com/group-avatar.jpg",
    "createdBy": "64f1a2b3c4d5e6f7g8h9i0j1",
    "members": ["64f1a2b3c4d5e6f7g8h9i0j1"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **GET** `/group/mine`
Get current user's groups.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
      "name": "Billionaires Club",
      "description": "A group for billionaires to split expenses",
      "avatar": "https://example.com/group-avatar.jpg",
      "createdBy": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "members": [
        {
          "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
          "name": "John Doe",
          "email": "john@example.com"
        }
      ],
      "memberCount": 1
    }
  ]
}
```

### **POST** `/group/invite`
Send group invitation.

**Request Body:**
```json
{
  "groupId": "64f1a2b3c4d5e6f7g8h9i0j3",
  "userId": "64f1a2b3c4d5e6f7g8h9i0j2"
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Invite sent successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
    "groupId": "64f1a2b3c4d5e6f7g8h9i0j3",
    "inviterId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "inviteeId": "64f1a2b3c4d5e6f7g8h9i0j2",
    "status": "pending",
    "expiresAt": "2024-01-08T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 📊 Live Group Information

### **GET** `/groups/:groupId`
Get real-time group information with current members and membership status.

**Response:**
```json
{
  "success": true,
  "msg": "Group information fetched successfully",
  "data": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "name": "Billionaires Club",
    "description": "A group for billionaires to split expenses",
    "avatar": "https://example.com/group-avatar.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "creator": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": "https://example.com/avatar.jpg"
    },
    "members": [
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePicture": "https://example.com/avatar.jpg"
      },
      {
        "id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "profilePicture": "https://example.com/avatar2.jpg"
      }
    ],
    "memberCount": 2,
    "isMember": true,
    "isCreator": true,
    "membershipStatus": "member"
  }
}
```

### **GET** `/groups/:groupId/membership`
Quick check for user's membership status in a group.

**Response:**
```json
{
  "success": true,
  "msg": "Membership status fetched successfully",
  "data": {
    "isMember": true,
    "isCreator": false,
    "membershipStatus": "member"
  }
}
```

---

## 📨 Invite Management

### **GET** `/invites/:inviteId`
Get detailed invite information with current status.

**Response:**
```json
{
  "success": true,
  "msg": "Invite details fetched successfully",
  "data": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j4",
    "groupId": "64f1a2b3c4d5e6f7g8h9i0j3",
    "group": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j3",
      "name": "Billionaires Club",
      "description": "A group for billionaires to split expenses",
      "avatar": "https://example.com/group-avatar.jpg"
    },
    "inviter": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": "https://example.com/avatar.jpg"
    },
    "invitee": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "profilePicture": "https://example.com/avatar2.jpg"
    },
    "status": "pending",
    "message": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "respondedAt": null,
    "expiresAt": "2024-01-08T00:00:00.000Z",
    "isExpired": false,
    "isMember": false,
    "membershipStatus": "not_member"
  }
}
```

### **POST** `/invites/:inviteId/respond`
Accept or decline an invite.

**Request Body:**
```json
{
  "action": "accepted"
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Invite accepted successfully",
  "data": {
    "inviteId": "64f1a2b3c4d5e6f7g8h9i0j4",
    "status": "accepted",
    "respondedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### **GET** `/invites`
Get all invites for the current user.

**Query Parameters:**
- `type`: `sent` | `received` | `all` (default: `all`)

**Response:**
```json
{
  "success": true,
  "msg": "Invites fetched successfully",
  "data": [
    {
      "id": "64f1a2b3c4d5e6f7g8h9i0j4",
      "groupId": "64f1a2b3c4d5e6f7g8h9i0j3",
      "group": {
        "id": "64f1a2b3c4d5e6f7g8h9i0j3",
        "name": "Billionaires Club",
        "description": "A group for billionaires to split expenses",
        "avatar": "https://example.com/group-avatar.jpg",
        "creator": {
          "id": "64f1a2b3c4d5e6f7g8h9i0j1",
          "name": "John Doe",
          "email": "john@example.com",
          "profilePicture": "https://example.com/avatar.jpg"
        },
        "members": [...]
      },
      "inviter": {...},
      "invitee": {...},
      "status": "accepted",
      "respondedAt": "2024-01-01T12:00:00.000Z",
      "isMember": true,
      "membershipStatus": "member",
      "isSentByMe": false,
      "isReceivedByMe": true
    }
  ]
}
```

---

## 🔔 Notification System (Lightweight)

### **GET** `/notifications`
Get all notifications with live data.

**Query Parameters:**
- `unreadOnly`: `true` | `false` (default: `false`)

**Response:**
```json
{
  "success": true,
  "msg": "Notifications fetched successfully",
  "data": {
    "notifications": [
      {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j5",
        "type": "invite_sent",
        "title": "Group invite",
        "message": "John Doe invited you to join 'Billionaires Club'",
        "data": {
          "groupId": "64f1a2b3c4d5e6f7g8h9i0j3",
          "inviteId": "64f1a2b3c4d5e6f7g8h9i0j4",
          "inviterId": "64f1a2b3c4d5e6f7g8h9i0j1"
        },
        "readAt": null,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "liveData": {
          "group": {
            "id": "64f1a2b3c4d5e6f7g8h9i0j3",
            "name": "Billionaires Club",
            "description": "A group for billionaires to split expenses",
            "avatar": "https://example.com/group-avatar.jpg",
            "creator": {
              "id": "64f1a2b3c4d5e6f7g8h9i0j1",
              "name": "John Doe",
              "email": "john@example.com",
              "profilePicture": "https://example.com/avatar.jpg"
            },
            "members": [
              {
                "id": "64f1a2b3c4d5e6f7g8h9i0j1",
                "name": "John Doe",
                "email": "john@example.com",
                "profilePicture": "https://example.com/avatar.jpg"
              }
            ]
          },
          "inviteStatus": "pending",
          "isMember": false,
          "membershipStatus": "not_member"
        }
      }
    ],
    "unreadCount": 1
  }
}
```

### **GET** `/notifications/unread-count`
Get count of unread notifications.

**Response:**
```json
{
  "success": true,
  "msg": "Unread count fetched successfully",
  "data": {
    "unreadCount": 3
  }
}
```

### **PUT** `/notifications/:notificationId/read`
Mark a specific notification as read.

**Response:**
```json
{
  "success": true,
  "msg": "Notification marked as read",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j5",
    "readAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### **PUT** `/notifications/read-all`
Mark all notifications as read.

**Response:**
```json
{
  "success": true,
  "msg": "All notifications marked as read",
  "data": {
    "modifiedCount": 3
  }
}
```

### **GET** `/notifications/invites`
Get pending invites (alternative to invite routes).

**Response:**
```json
{
  "success": true,
  "msg": "Pending invites fetched successfully",
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
      "groupId": "64f1a2b3c4d5e6f7g8h9i0j3",
      "invitedBy": "64f1a2b3c4d5e6f7g8h9i0j1",
      "invitedUser": "64f1a2b3c4d5e6f7g8h9i0j2",
      "status": "pending",
      "group": {
        "name": "Billionaires Club",
        "description": "A group for billionaires to split expenses",
        "avatar": "https://example.com/group-avatar.jpg",
        "createdBy": {
          "name": "John Doe",
          "email": "john@example.com",
          "profilePicture": "https://example.com/avatar.jpg"
        }
      },
      "invitedBy": {
        "name": "John Doe",
        "email": "john@example.com",
        "profilePicture": "https://example.com/avatar.jpg"
      }
    }
  ]
}
```

---

## 💰 Financial Management

### **POST** `/bill/`
Create a new bill.

**Request Body (Equal Split):**
```json
{
  "title": "Dinner at Restaurant",
  "amount": 500,
  "group": "64f1a2b3c4d5e6f7g8h9i0j3",
  "paidBy": "64f1a2b3c4d5e6f7g8h9i0j1",
  "participants": ["64f1a2b3c4d5e6f7g8h9i0j1", "64f1a2b3c4d5e6f7g8h9i0j2"],
  "splitType": "equal",
  "description": "Dinner with friends"
}
```

**Request Body (Unequal Split):**
```json
{
  "title": "Dinner",
  "amount": 500,
  "group": "64f1a2b3c4d5e6f7g8h9i0j3",
  "paidBy": "64f1a2b3c4d5e6f7g8h9i0j1",
  "participants": ["64f1a2b3c4d5e6f7g8h9i0j1", "64f1a2b3c4d5e6f7g8h9i0j2"],
  "splitType": "unequal",
  "shares": [
    { "user": "64f1a2b3c4d5e6f7g8h9i0j1", "amount": 300 },
    { "user": "64f1a2b3c4d5e6f7g8h9i0j2", "amount": 200 }
  ]
}
```

**Request Body (Itemized):**
```json
{
  "title": "Stationery Shopping",
  "amount": 100,
  "group": "64f1a2b3c4d5e6f7g8h9i0j3",
  "paidBy": "64f1a2b3c4d5e6f7g8h9i0j1",
  "participants": ["64f1a2b3c4d5e6f7g8h9i0j1", "64f1a2b3c4d5e6f7g8h9i0j2"],
  "splitType": "itemized",
  "items": [
    { "label": "Book", "amount": 70, "paidBy": "64f1a2b3c4d5e6f7g8h9i0j1", "involved": ["64f1a2b3c4d5e6f7g8h9i0j1"] },
    { "label": "Pen", "amount": 30, "paidBy": "64f1a2b3c4d5e6f7g8h9i0j1", "involved": ["64f1a2b3c4d5e6f7g8h9i0j2"] }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Bill created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j6",
    "title": "Dinner at Restaurant",
    "amount": 500,
    "group": "64f1a2b3c4d5e6f7g8h9i0j3",
    "paidBy": "64f1a2b3c4d5e6f7g8h9i0j1",
    "participants": ["64f1a2b3c4d5e6f7g8h9i0j1", "64f1a2b3c4d5e6f7g8h9i0j2"],
    "splitType": "equal",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **GET** `/bill/group/:groupId`
Get all bills for a group.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j6",
      "title": "Dinner at Restaurant",
      "amount": 500,
      "group": "64f1a2b3c4d5e6f7g8h9i0j3",
      "paidBy": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "participants": [
        {
          "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
          "name": "John Doe",
          "email": "john@example.com"
        },
        {
          "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      ],
      "splitType": "equal",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 💸 Settlement Management

### **POST** `/settlement/`
Create a settlement.

**Request Body:**
```json
{
  "group": "64f1a2b3c4d5e6f7g8h9i0j3",
  "from": "64f1a2b3c4d5e6f7g8h9i0j1",
  "to": "64f1a2b3c4d5e6f7g8h9i0j2",
  "amount": 230,
  "note": "Dinner payback"
}
```

**Response:**
```json
{
  "success": true,
  "msg": "Settlement created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j7",
    "group": "64f1a2b3c4d5e6f7g8h9i0j3",
    "from": "64f1a2b3c4d5e6f7g8h9i0j1",
    "to": "64f1a2b3c4d5e6f7g8h9i0j2",
    "amount": 230,
    "note": "Dinner payback",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **GET** `/settlement/group/:groupId`
Get all settlements for a group.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j7",
      "group": "64f1a2b3c4d5e6f7g8h9i0j3",
      "from": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "to": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "amount": 230,
      "note": "Dinner payback",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## ⚖️ Balance Tracking

### **GET** `/balance/group/:groupId`
Get balances for a specific group.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "user": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "balance": 150,
      "owes": [],
      "owedBy": [
        {
          "user": {
            "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
            "name": "Jane Doe",
            "email": "jane@example.com"
          },
          "amount": 150
        }
      ]
    },
    {
      "user": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "balance": -150,
      "owes": [
        {
          "user": {
            "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
            "name": "John Doe",
            "email": "john@example.com"
          },
          "amount": 150
        }
      ],
      "owedBy": []
    }
  ]
}
```

### **GET** `/balance/me`
Get current user's net balance across all groups.

**Response:**
```json
{
  "success": true,
  "data": {
    "netBalance": 50,
    "groups": [
      {
        "groupId": "64f1a2b3c4d5e6f7g8h9i0j3",
        "groupName": "Billionaires Club",
        "balance": 150
      }
    ]
  }
}
```

---

## 🚨 Error Responses

### **400 Bad Request**
```json
{
  "success": false,
  "msg": "Required fields missing"
}
```

### **401 Unauthorized**
```json
{
  "success": false,
  "msg": "Authentication required"
}
```

### **403 Forbidden**
```json
{
  "success": false,
  "msg": "You don't have permission to perform this action"
}
```

### **404 Not Found**
```json
{
  "success": false,
  "msg": "Resource not found"
}
```

### **409 Conflict**
```json
{
  "success": false,
  "msg": "Invite already exists"
}
```

### **500 Internal Server Error**
```json
{
  "success": false,
  "msg": "Internal server error"
}
```

---

## 🎯 Frontend Integration Guide

### **1. Authentication Flow**
```javascript
// Login and store token
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.data.token);
  return data;
};
```

### **2. Notification Display**
```javascript
// Get notifications with live data
const getNotifications = async () => {
  const response = await fetch('/api/notifications', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const data = await response.json();
  
  // Display notifications with live data
  data.data.notifications.forEach(notification => {
    if (notification.type === 'invite_sent') {
      const { group, inviteStatus, isMember } = notification.liveData;
      
      if (inviteStatus === 'pending' && !isMember) {
        // Show Accept/Decline buttons
      } else if (inviteStatus === 'accepted') {
        // Show "You accepted this invite"
      } else if (isMember) {
        // Show "You're now a member"
      }
    }
  });
};
```

### **3. Real-time Data Fetching**
```javascript
// Get fresh group information
const getGroupInfo = async (groupId) => {
  const response = await fetch(`/api/groups/${groupId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const data = await response.json();
  
  // Use fresh data for UI
  const { isMember, isCreator, members } = data.data;
  updateGroupUI({ isMember, isCreator, members });
};
```

### **4. Invite Management**
```javascript
// Respond to invite
const respondToInvite = async (inviteId, action) => {
  const response = await fetch(`/api/invites/${inviteId}/respond`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action })
  });
  const data = await response.json();
  
  if (data.success) {
    // Update UI to reflect new status
    updateInviteStatus(inviteId, action);
  }
};
```

---

## 🔄 Data Flow Architecture

### **1. Notification Creation**
```
User A invites User B to Group
↓
Create lightweight notification (only references)
↓
User B receives notification with live data
↓
Frontend displays current group info
```

### **2. Live Data Fetching**
```
Frontend requests notification
↓
Backend fetches notification + live data
↓
Returns notification with current group info
↓
Frontend shows fresh, accurate data
```

### **3. Invite Response**
```
User responds to invite
↓
Update invite status
↓
Add user to group (if accepted)
↓
Create notification for inviter
↓
Update frontend with new status
```

---

## 🎉 Key Benefits

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

This API documentation provides everything the frontend team needs to integrate with the new lightweight notification system and live data fetching architecture! 🚀
