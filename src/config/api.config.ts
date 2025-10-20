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
  },
};


