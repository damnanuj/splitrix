import { useQuery } from "@tanstack/react-query";
import { getGroupExpenses } from "src/services/billing.service";
import { GroupExpense } from "src/stores/types";

export const useGroupBills = (groupId: string) => {
  return useQuery<GroupExpense[], Error>({
    queryKey: ["group", "bills", groupId],
    queryFn: async (): Promise<GroupExpense[]> => {
      const res = await getGroupExpenses(groupId);
      if (res.success) return res.data;
      throw new Error(res.msg || "Failed to fetch group expenses");
    },
    enabled: Boolean(groupId),
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
