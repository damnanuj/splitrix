import axiosInstance from "../api";

export const getUserData = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const getUserById = async (id: any) => {
  const response = await axiosInstance.get(`/user/${id}`);
  return response.data;
};
