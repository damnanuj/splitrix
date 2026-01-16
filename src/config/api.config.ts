export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    google: "/auth/google",
  },
  user: {
    get: "/user",
    getById: (id: string) => `/user/${id}`,
    list: "/user/",
    addFriend: "/user/friends",
    friendsList: "/user/friends/list",
    removeFriend: (id: string) => `/user/friends/remove/${id}`,
  },

  group: {
    create: "/group",
    mine: "/group/mine",
    invite: "/group/invite",
    inviteRespond: "/group/invite/respond",
    addMembers: (id: string) => `/group/add-members/${id}`,
    getById: (id: string) => `/group/${id}`,
    getGroupBalanceSummary: (id: string) => `/group/balances-summary/${id}`,
  },
  notification: {
    list: "/notifications",
    unreadCount: "/notifications/unread-count",
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: "/notifications/read-all",
  },
  billing: {
    createExpense: "/bill",
    groupExpenses: (groupId: string) => `/bill/group/${groupId}`,
    myTransactions: "/bill/my-transactions",
  },
  activity: {
    me: "/activity/me",
  },
};
