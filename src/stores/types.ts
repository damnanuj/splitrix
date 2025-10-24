export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}
export interface Friend {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  balance: {
    net: number;
    status: string;
    amount: number;
  };
}

export interface FriendsState {
  friends: Friend[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  setFriends: (friends: Friend[]) => void;
  fetchFriends: (opts?: { refresh?: boolean }) => Promise<void>;
}

export interface Group {
  _id: string;
  name: string;
  description: string;
  createdBy: User;
  members: User[];
  avatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  balance: Balance;
}

export interface Balance {
  net: number;
  amountOwed: number;
  amountToReceive: number;
}

// {
//   "_id": "68f6357cef754a62d1e6fc5f",
//   "name": "Billionaires",
//   "createdBy": {
//       "_id": "68f63460ef754a62d1e6fc4f",
//       "name": "Steve Rogers",
//       "email": "steve@gmail.com",
//       "profilePicture": ""
//   },
//   "members": [
//       "68f63460ef754a62d1e6fc4f"
//   ],
//   "description": "Office Buddies",
//   "avatar": "",
//   "createdAt": "2025-10-20T13:13:32.522Z",
//   "updatedAt": "2025-10-20T13:13:32.522Z",
//   "__v": 0
// }

export interface CreateGroup {
  name: string;
  memberIds: string[];
  description: string;
}

export interface Notification {
  _id: string;
  user: string; // Now just the user ID string
  type:
    | "invite_sent"
    | "invite_accepted"
    | "invite_declined"
    | "expense_added"
    | "expense_updated"
    | "payment_received"
    | "payment_sent";
  title: string;
  message: string;
  data: {
    groupId?: string;
    groupName?: string;
    groupDescription?: string;
    groupAvatar?: string;
    inviterId?: string;
    inviterName?: string;
    inviterEmail?: string;
    inviterProfilePicture?: string;
    inviteId?: string;
    expenseId?: string;
    amount?: number;
    [key: string]: any;
  };
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UnreadCountResponse {
  success: boolean;
  msg: string;
  data: {
    unreadCount: number;
  };
}

export interface NotificationResponse {
  success: boolean;
  msg: string;
  data: {
    notifications: Notification[];
    unreadCount: number;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  clearError: () => void;
}

// {
//   "_id": "68f6357cef754a62d1e6fc5f",
//   "name": "Billionaires",
//   "createdBy": "68f63460ef754a62d1e6fc4f",
//   "members": [
//       "68f63460ef754a62d1e6fc4f"
//   ],
//   "description": "Office Buddies",
//   "avatar": "",
//   "createdAt": "2025-10-20T13:13:32.522Z",
//   "updatedAt": "2025-10-20T13:13:32.522Z",
//   "__v": 0
// }
