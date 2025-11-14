import { useQuery } from "@tanstack/react-query";
import { getFriendsList } from "src/services/user.service";
import { Friend } from "src/stores/types";

interface FriendsListResponse {
  success: boolean;
  msg: string;
  data: Friend[];
}

export const useFriendsList = () => {
  return useQuery<Friend[], Error>({
    queryKey: ["friends", "list"],
    queryFn: async () => {
      const res = (await getFriendsList()) as FriendsListResponse;

      if (res?.success) {
        return Array.isArray(res.data) ? res.data : [];
      }

      throw new Error(res?.msg || "Failed to fetch friends");
    },
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useFriendsList;
