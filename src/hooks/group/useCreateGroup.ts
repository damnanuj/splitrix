import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "src/services/group.service";
import { CreateGroup, Group } from "src/stores/types";

interface CreateGroupResponse {
  success: boolean;
  msg: string;
  data: Group;
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateGroupResponse, Error, CreateGroup>({
    mutationFn: async (payload) => {
      // console.log("payload-------->>", payload);
      const res = (await createGroup(payload)) as CreateGroupResponse;

      if (res?.success) {
        return res;
      }

      throw new Error(res?.msg || "Failed to create group");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", "mine"] });
    },
  });
};

export default useCreateGroup;
