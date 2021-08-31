/* Header service - auth header, axios instance, interceptor */

import axios from "axios";
export const BASE_URL = "http://localhost:8000";

// get user
export const user = JSON.parse(localStorage.getItem("user"));

// auth header - access token for sending as header to retrieve user data
export default function authHeader() {
  const tokens = JSON.parse(localStorage.getItem("tokens"));

  if (tokens && tokens.access) {
    return { Authorization: "JWT " + tokens.access };
  } else {
    return {};
  }
}

// axios instance - base axios request - adds base url, auth header
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: authHeader()
});

// intercept axios calls and refresh token if required
axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;
    if (
      err.response.status === 401 &&
      err.response.statusText === "Unauthorized" &&
      originalConfig.url !== "/register/" &&
      originalConfig.url !== "/login/"
    ) {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      try {
        const res = await axiosInstance.post("/token-refresh/", {
          refresh: tokens.refresh
        });

        const newTokens = {
          refresh: res.data.refresh,
          access: res.data.access
        };

        // set tokens
        localStorage.setItem("tokens", JSON.stringify(newTokens));

        // Set headers
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + res.data.access;

        // original header
        originalConfig.headers["Authorization"] = "JWT " + res.data.access;

        return axiosInstance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  }
);
