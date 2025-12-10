export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface GroupDetailsData {
  _id: string;
  name: string;
  description: string;
  createdBy: User;
  members: User[];
  memberCount: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
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
  removeFriend: (friendId: string) => void;
  refreshFriends: () => Promise<void>;
}

export interface Group {
  _id: string;
  name: string;
  description: string;
  createdBy: User;
  members: User[];
  memberCount: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  balance: Balance;
}

export interface Balance {
  net: number;
  amountOwed: number;
  amountToReceive: number;
}

export interface CreateGroup {
  name: string;
  memberIds: string[];
  description: string;
}

export type SplitType = "amount" | "share" | "percent";

export interface ExpenseShare {
  user: string;
  amount: number;
}

export interface CreateExpensePayload {
  title: string;
  amount: number;
  group: string;
  paidBy: string;
  createdBy: string;
  splitType: SplitType;
  shares: ExpenseShare[];
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  group: string;
  paidBy: string;
  createdBy: string;
  splitType: SplitType;
  shares: ExpenseShare[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseResponse {
  success: boolean;
  msg: string;
  data: Expense;
}

export interface GroupBillsMember {
  name: string;
  email: string;
  avatar?: string;
}

export interface GroupExpenseSplitUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface GroupExpenseSplit {
  user: User;
  share: number;
  paid: number;
  balance: number;
}

export interface GroupExpenseStake {
  amount: number;
  displayMsg: string;
}

export interface GroupExpense {
  id: string;
  description: string;
  amount: number;
  date: string;
  paidBy: User;
  splits: GroupExpenseSplit[];
  yourStake: GroupExpenseStake;
}

export interface GroupBillsResponse {
  success: boolean;
  msg: string;
  data: GroupExpense[];
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
