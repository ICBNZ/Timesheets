/* Hours service */
import authHeader from "./header";
import { axiosInstance } from "./header";
import { formatDate } from "../helpers/datetime";

// Get all timesheets
class Timesheets {
  getAllTimesheets = () => {
    return axiosInstance.get("/timesheet/", { headers: authHeader() });
  };

  // Add new timesheet
  addTimesheet = user => {
    const data = {
      user: user.id,
      week: "",
      signed: false,
      submitted: false,
      client: ""
    };
    return axiosInstance.post(`/timesheet/`, data, {
      headers: authHeader()
    });
  };

  // Get timesheet
  getTimesheet = id => {
    return axiosInstance.get(`/timesheet/${id}/`, {
      headers: authHeader()
    });
  };

  // Update timesheet
  updateTimesheet = (id, data) => {
    return axiosInstance.put(`/timesheet/${id}/`, data, {
      headers: authHeader()
    });
  };

  // Delete timesheet
  deleteTimesheet = id => {
    return axiosInstance.delete(`/timesheet/${id}/`, {
      headers: authHeader()
    });
  };

  // Add day
  addDay = (id, data) => {
    return axiosInstance.post(`/timesheet/${id}/day/`, data, {
      headers: authHeader()
    });
  };

  // Add day
  updateDay = (id, data) => {
    return axiosInstance.post(`/timesheet/${id}/day/${data.id}`, data, {
      headers: authHeader()
    });
  };

  // Delete day
  deleteDay = id => {
    return axiosInstance.delete(`/timesheet/day/${id}/`, {
      headers: authHeader()
    });
  };
}
export default new Timesheets();
