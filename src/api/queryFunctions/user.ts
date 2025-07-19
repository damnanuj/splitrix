import axiosInstance from "../api";

export const getUserData = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};
