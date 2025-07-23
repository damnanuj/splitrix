import axios from "axios";
import axiosInstance from "../api";

export const loginService = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/auth/login", payload);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const googleLoginService = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/auth/google", payload);
    return res.data;
  } catch (err: any) {
    return (
      err.response?.data || { success: false, message: "Something went wrong" }
    );
  }
};
