import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "src/api/queryFunctions/auth";

const useLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  return {
    login: loginMutation.mutateAsync,
  };
};

export default useLogin;
