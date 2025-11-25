import { useState, useCallback, useMemo, useEffect } from "react";
import { useFriendsList } from "./useFriendsList";
import { useAuthStore } from "src/stores/authStore";

export interface DisplayMember {
  _id: string;
  name: string;
  email?: string;
  profilePicture?: string;
  isCurrentUser?: boolean;
}

export const useMemberSelection = () => {
  const { authData } = useAuthStore();
  const currentUserId = authData?._id;
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(() =>
    currentUserId ? [currentUserId] : []
  );
  const { data: friends = [], isLoading: isFriendsLoading } = useFriendsList();

  useEffect(() => {
    if (currentUserId) {
      setSelectedMemberIds((prev) => {
        if (prev.includes(currentUserId)) return prev;
        return [currentUserId, ...prev];
      });
    }
  }, [currentUserId]);

  const handleToggleMember = useCallback(
    (memberId: string) => {
      if (currentUserId === memberId) return;
      setSelectedMemberIds((prev) => {
        if (prev.includes(memberId)) {
          return prev.filter((id) => id !== memberId);
        }
        return [...prev, memberId];
      });
    },
    [currentUserId]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      if (currentUserId === memberId) return;
      setSelectedMemberIds((prev) => prev.filter((id) => id !== memberId));
    },
    [currentUserId]
  );

  const availableFriends = useMemo(
    () => friends.filter((friend) => friend._id !== currentUserId),
    [friends, currentUserId]
  );

  const selectedMembers = useMemo<DisplayMember[]>(() => {
    const mapped: DisplayMember[] = [];

    selectedMemberIds.forEach((id) => {
      if (authData && id === currentUserId) {
        mapped.push({
          _id: currentUserId,
          name: authData.name || "You",
          email: authData.email,
          profilePicture: authData.profilePicture,
          isCurrentUser: true,
        });
        return;
      }

      const friend = friends.find((item) => item._id === id);
      if (friend) {
        mapped.push({
          _id: friend._id,
          name: friend.name || "Member",
          email: friend.email,
          profilePicture: friend.profilePicture,
        });
      }
    });

    return mapped;
  }, [selectedMemberIds, friends, authData, currentUserId]);

  return {
    selectedMemberIds,
    setSelectedMemberIds,
    selectedMembers,
    availableFriends,
    isFriendsLoading,
    handleToggleMember,
    handleRemoveMember,
    currentUserId,
  };
};
