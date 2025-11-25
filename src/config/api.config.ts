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
    getById: (id: string) => `/group/${id}`,
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
  },
};
