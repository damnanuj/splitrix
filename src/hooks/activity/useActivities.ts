import { useQuery } from "@tanstack/react-query";
import { getActivities } from "src/services/activity.service";
import { Activity } from "src/stores/types";

export const useActivities = () => {
  return useQuery<Activity[], Error>({
    queryKey: ["activities"],
    queryFn: async (): Promise<Activity[]> => {
      const res = await getActivities();
      if (res.success) {
        return Array.isArray(res.data) ? res.data : [];
      }
      throw new Error(res.message || "Failed to fetch activities");
    },
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

