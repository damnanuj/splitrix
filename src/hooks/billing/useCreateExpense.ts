import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "src/services/billing.service";
import { CreateExpensePayload, CreateExpenseResponse } from "src/stores/types";

export const useCreateExpense = (groupId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<CreateExpenseResponse, Error, CreateExpensePayload>({
    mutationFn: async (payload) => {
      const response = await createExpense(payload);
      if (response.success) {
        return response;
      }
      throw new Error(response.msg || "Failed to create expense");
    },
    onSuccess: () => {
      if (groupId) {
        // Refresh group core details
        queryClient.invalidateQueries({
          queryKey: ["group", "details", groupId],
        });

        // Refresh group bills / split history
        queryClient.invalidateQueries({
          queryKey: ["group", "bills", groupId],
        });

        // Refresh group balance summary (used in group card)
        queryClient.invalidateQueries({
          queryKey: ["group", "balance-summary", groupId],
        });

        // Refresh groups list (FriendsGroups tab) so balances update
        queryClient.invalidateQueries({
          queryKey: ["groups", "mine"],
        });
      }
    },
  });
};

export default useCreateExpense;
