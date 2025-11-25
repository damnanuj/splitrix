import { create } from "zustand";
import { Friend, FriendsState } from "./types";
import { getFriendsList } from "src/services/user.service";

export const useFriendsStore = create<FriendsState>((set, get) => ({
  friends: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  setFriends: (friends: Friend[]) => set({ friends }),

  fetchFriends: async (opts?: { refresh?: boolean }) => {
    const refresh = opts?.refresh === true;

    // Prevent multiple simultaneous requests
    if (get().isLoading && !refresh) return;

    if (refresh) {
      set({ isRefreshing: true, error: null });
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      const { data } = await getFriendsList();
      set({ friends: data || [] });
    } catch (error) {
      console.error("fetchFriends error:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch friends",
      });
    } finally {
      set({ isLoading: false, isRefreshing: false });
    }
  },

  addFriend: (friend: Friend) => {
    const currentFriends = get().friends;
    // Check if friend already exists to avoid duplicates
    const friendExists = currentFriends.some((f) => f._id === friend._id);
    if (!friendExists) {
      set({ friends: [...currentFriends, friend] });
    }
  },

  removeFriend: (friendId: string) => {
    const currentFriends = get().friends;
    set({ friends: currentFriends.filter((f) => f._id !== friendId) });
  },

  refreshFriends: async () => {
    try {
      const { data } = await getFriendsList();
      set({ friends: data || [] });
    } catch (error) {
      console.error("refreshFriends error:", error);
    }
  },
}));
