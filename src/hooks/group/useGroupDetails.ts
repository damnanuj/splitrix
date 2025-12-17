import { useQuery } from "@tanstack/react-query";
import {
  getGroupBalanceSummary,
  getGroupById,
} from "src/services/group.service";
import { GroupBalanceSummaryData, GroupDetailsData } from "src/stores/types";

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

export const useGroupBalanceSummary = (groupId: string) => {
  return useQuery<GroupBalanceSummaryData[], Error>({
    queryKey: ["group", "balance-summary", groupId],
    queryFn: async (): Promise<GroupBalanceSummaryData[]> => {
      const res = await getGroupBalanceSummary(groupId);
      if (res.success) return res.data;
      throw new Error(res.msg || "Failed to fetch group balance summary");
    },
    enabled: Boolean(groupId),
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
