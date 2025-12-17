import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMembersToGroup } from "src/services/group.service";

interface AddMembersResponse {
  success: boolean;
  message: string;
}

export const useAddGroupMembers = (groupId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<AddMembersResponse, Error, string[]>({
    mutationFn: async (memberIds: string[]) => {
      if (!groupId) {
        throw new Error("Group ID is required to add members");
      }

      const response = await addMembersToGroup(groupId, memberIds);
      if (response.success) {
        return response as AddMembersResponse;
      }
      throw new Error(response.message || "Failed to add members to group");
    },
    onSuccess: () => {
      if (!groupId) return;

      // Invalidate group details to refresh member list
      queryClient.invalidateQueries({
        queryKey: ["group", "details", groupId],
      });

      // Also invalidate groups list
      queryClient.invalidateQueries({
        queryKey: ["groups", "mine"],
      });
    },
  });
};

export default useAddGroupMembers;
