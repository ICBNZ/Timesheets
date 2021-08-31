/* Auth service */
import { axiosInstance } from "./header";

class Auth {
  register = (username, first_name, last_name, email, password) => {
    return axiosInstance.post("/signup/", {
      username,
      first_name,
      last_name,
      email,
      password
    });
  };

  // User Login
  login = (username, password) => {
    return axiosInstance
      .post("/login/", {
        username,
        password
      })
      .then(response => {
        if (response.data) {
          let userData = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email
          };
          let tokens = {
            refresh: response.data.refresh,
            access: response.data.access
          };
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("tokens", JSON.stringify(tokens));
        }

        return response.data;
      });
  };

  // User Logout
  logout = () => {
    localStorage.removeItem("user");
  };
}

export default new Auth();
