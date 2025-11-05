import { useQuery } from "@tanstack/react-query";
import { getGroupById } from "src/services/group.service";
import { GroupDetailsData } from "src/stores/types";

export const useGroupDetails = (groupId: string) => {
  return useQuery<GroupDetailsData, Error>({
    queryKey: ["group", "details", groupId],
    queryFn: async (): Promise<GroupDetailsData> => {
      const res = await getGroupById(groupId);
      if (res.success) return res.data;
      throw new Error(res.msg || "Failed to fetch group details");
    },
    enabled: Boolean(groupId),
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
