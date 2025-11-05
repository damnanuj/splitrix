export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface GroupDetailsData {
  group: Group;
  userMembership: {
    isMember: boolean;
    isCreator: boolean;
    membershipStatus: string;
    hasPendingInvite: boolean;
    pendingInviteId?: string;
    balance: Balance | null;
  };
}

export interface GroupDetailsResponse {
  success: boolean;
  msg: string;
  data: GroupDetailsData;
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
  addFriend: (friend: Friend) => void;
  refreshFriends: () => Promise<void>;
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

export type Notification = {
  _id: string;
  user: string;
  type: string;
  inviteId?: string;
  groupId?: string;
  inviterId?: string;
  inviterName?: string;
  groupName?: string;
  groupAvatar?: string;
  inviterProfilePicture?: string;
  title: string;
  message: string;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
};

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
  data: Notification[];
}

export interface MarkAsReadResponse {
  success: boolean;
  msg: string;
  notificationId: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  // New methods for TanStack Query integration
  setNotifications: (notifications: Notification[]) => void;
  updateNotifications: (
    updater: (notifications: Notification[]) => Notification[]
  ) => void;
  setUnreadCount: (unreadCount: number) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  // Legacy methods for backward compatibility
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
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
