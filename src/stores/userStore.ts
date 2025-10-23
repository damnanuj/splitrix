import { create } from "zustand";
import { addFriend, getAllUsers } from "src/services/user.service";
import { useAuthStore } from "./authStore";

export interface AppUser {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  friends?: string[];
}

interface UserState {
  users: AppUser[];
  isLoading: boolean;
  isRefreshing: boolean;
  addingIds: Set<string>;
  fetchUsers: (opts?: { refresh?: boolean }) => Promise<void>;
  addAsFriend: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  isRefreshing: false,
  addingIds: new Set<string>(),

  fetchUsers: async (opts) => {
    const refresh = opts?.refresh === true;
    if (refresh) set({ isRefreshing: true });
    else set({ isLoading: true });

    try {
      const { data } = await getAllUsers();
      // API returns { success, msg, data: AppUser[] }

      // Get current user from auth store
      const { authData } = useAuthStore.getState();
      // console.log(authData, "-<<<<<<authData");
      const currentUserId = authData?._id;

      if (!currentUserId) {
        console.warn("No current user ID found");
        set({ users: data || [] });
        return;
      }

      // Show all users without filtering
      set({ users: data || [] });
    } catch (error) {
      console.error("fetchUsers error:", error);
    } finally {
      set({ isLoading: false, isRefreshing: false });
    }
  },

  addAsFriend: async (userId: string) => {
    try {
      const adding = new Set(get().addingIds);
      adding.add(userId);
      set({ addingIds: adding });

      await addFriend(userId);

      // Update the local user data to reflect the new friendship
      const { authData } = useAuthStore.getState();
      const currentUserId = authData?._id;

      if (currentUserId) {
        const updatedUsers = get().users.map((user) => {
          if (user._id === userId) {
            // Add current user to this user's friends array
            return {
              ...user,
              friends: [...(user.friends || []), currentUserId],
            };
          }
          return user;
        });
        set({ users: updatedUsers });
      }
    } catch (error) {
      console.error("addAsFriend error:", error);
    } finally {
      const adding = new Set(get().addingIds);
      adding.delete(userId);
      set({ addingIds: adding });
    }
  },
}));
