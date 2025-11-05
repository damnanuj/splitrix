import { useQuery } from "@tanstack/react-query";
import { getGroups } from "src/services/group.service";
import { Group } from "src/stores/types";

export const useGroups = () => {
  return useQuery<Group[], Error>({
    queryKey: ["groups", "mine"],
    queryFn: async (): Promise<Group[]> => {
      const res = await getGroups();
      if (res?.success) {
        return Array.isArray(res.data) ? res.data : [];
      }
      throw new Error(res?.msg || "Failed to fetch groups");
    },
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
