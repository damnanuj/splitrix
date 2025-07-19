import axios from "axios";
import axiosInstance from "../api";

export const loginUser = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/auth/login", payload);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
