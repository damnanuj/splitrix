import { create } from "zustand";
import { Group } from "./types";
import { getGroups } from "src/services/user.service";

export interface GroupsState {
  groups: Group[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  fetchGroups: (opts?: { refresh?: boolean }) => Promise<void>;
  //   createGroup: (group: Group) => Promise<void>;
  //   updateGroup: (group: Group) => Promise<void>;
  //   deleteGroup: (groupId: string) => Promise<void>;
}

export const useGroupsStore = create<GroupsState>((set, get) => ({
  groups: [],
  isLoading: false,
  isRefreshing: false,
  error: null,

  fetchGroups: async (opts?: { refresh?: boolean }) => {
    const refresh = opts?.refresh === true;
    if (refresh) set({ isRefreshing: true });
    else set({ isLoading: true });

    try {
      const { data } = await getGroups();

      set({ groups: data || [] });
    } catch (error) {
      console.error("fetchGroups error:", error);
    } finally {
      set({ isLoading: false, isRefreshing: false });
    }
  },
}));
