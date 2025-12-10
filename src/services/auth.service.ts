import { API_ENDPOINTS } from "src/config/api.config";
import apiService from "./api.service";
export const loginService = async (payload: any) => {
  try {
    const res = await apiService.post(API_ENDPOINTS.auth.login, payload);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const googleLoginService = async (idToken: string) => {
  try {
    console.log(idToken, "-<<<<<<idToken");
    const res = await apiService.post(API_ENDPOINTS.auth.google, { idToken });
    // console.log(res.data.data, "-<<<<<<googleLoginService");
    return res.data;
  } catch (err: any) {
    return (
      err.response?.data || { success: false, message: "Something went wrong" }
    );
  }
};
