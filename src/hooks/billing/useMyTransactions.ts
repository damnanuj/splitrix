import { useQuery } from "@tanstack/react-query";
import { getMyTransactions } from "src/services/billing.service";
import { Transaction } from "src/stores/types";

export const useMyTransactions = () => {
  return useQuery<Transaction[], Error>({
    queryKey: ["my-transactions"],
    queryFn: async (): Promise<Transaction[]> => {
      const res = await getMyTransactions();
      if (res.success) {
        return Array.isArray(res.data) ? res.data : [];
      }
      throw new Error(res.message || "Failed to fetch transactions");
    },
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

