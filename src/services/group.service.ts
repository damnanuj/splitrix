import { API_ENDPOINTS } from "src/config/api.config";
import apiService from "./api.service";
import {
  CreateGroup,
  GroupDetailsResponse,
  GroupBalanceSummaryResponse,
} from "src/stores/types";

export const getGroups = async () => {
  const response = await apiService.get(API_ENDPOINTS.group.mine);
  return response.data;
};

export const createGroup = async (group: CreateGroup) => {
  const response = await apiService.post(API_ENDPOINTS.group.create, group);
  return response.data;
};

export const addMembersToGroup = async (
  groupId: string,
  memberIds: string[]
) => {
  const response = await apiService.put(
    API_ENDPOINTS.group.addMembers(groupId),
    {
      memberIds,
    }
  );
  return response.data;
};

export const respondToGroupInvite = async (
  inviteId: string,
  action: "accepted" | "declined"
) => {
  const response = await apiService.post(API_ENDPOINTS.group.inviteRespond, {
    inviteId,
    action,
  });
  return response.data;
};

export const getGroupById = async (
  groupId: string
): Promise<GroupDetailsResponse> => {
  const response = await apiService.get(API_ENDPOINTS.group.getById(groupId));
  return response.data;
};

export const getGroupBalanceSummary = async (
  groupId: string
): Promise<GroupBalanceSummaryResponse> => {
  const response = await apiService.get(
    API_ENDPOINTS.group.getGroupBalanceSummary(groupId)
  );
  return response.data;
};
