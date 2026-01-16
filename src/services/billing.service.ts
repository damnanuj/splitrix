import apiService from "./api.service";
import { API_ENDPOINTS } from "src/config/api.config";
import {
  CreateExpensePayload,
  CreateExpenseResponse,
  GroupBillsResponse,
  MyTransactionsResponse,
} from "src/stores/types";

export const createExpense = async (
  payload: CreateExpensePayload
): Promise<CreateExpenseResponse> => {
  const response = await apiService.post(
    API_ENDPOINTS.billing.createExpense,
    payload
  );
  return response.data;
};

export const getGroupExpenses = async (
  groupId: string
): Promise<GroupBillsResponse> => {
  const response = await apiService.get(
    API_ENDPOINTS.billing.groupExpenses(groupId)
  );
  return response.data;
};

export const getMyTransactions = async (): Promise<MyTransactionsResponse> => {
  const response = await apiService.get(API_ENDPOINTS.billing.myTransactions);
  return response.data;
};
