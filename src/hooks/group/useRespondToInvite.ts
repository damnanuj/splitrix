import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondToGroupInvite } from "src/services/group.service";
import { GroupDetailsData } from "src/stores/types";

type RespondAction = "accepted" | "declined";

export const useRespondToInvite = (groupId: string, inviteId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: RespondAction) => {
      if (!inviteId) throw new Error("Missing invite id");
      const res = await respondToGroupInvite(inviteId, action);
      if (!res?.success)
        throw new Error(res?.msg || "Failed to respond to invite");
      return { action };
    },

    onMutate: async (action) => {
      await queryClient.cancelQueries({
        queryKey: ["group", "details", groupId],
      });

      const previous = queryClient.getQueryData<GroupDetailsData>([
        "group",
        "details",
        groupId,
      ]);

      if (previous) {
        const next: GroupDetailsData = {
          ...previous,
          userMembership: {
            ...previous.userMembership,
            isMember: action === "accepted" ? true : false,
            membershipStatus: action === "accepted" ? "accepted" : "declined",
            hasPendingInvite: false,
            pendingInviteId: undefined as unknown as string,
          },
        };
        queryClient.setQueryData(["group", "details", groupId], next);
      }

      return { previous } as { previous?: GroupDetailsData };
    },

    onError: (_err, _action, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["group", "details", groupId],
          context.previous
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["group", "details", groupId],
      });
    },
  });
};
