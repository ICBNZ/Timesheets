/* User service */
import axios from "axios";
import authHeader from "./header";
import { axiosInstance } from "./header";
import { BASE_URL } from "./header";

export const getUser = id => {
  return axiosInstance.get(`/profile/${id}`, { headers: authHeader() });
};
