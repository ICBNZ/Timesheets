/* Timesheets List - List of all timesheets created by logged in User */

// React, Redux
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Actions
import {
  getAllTimesheets,
  addTimesheet,
  deleteTimesheet
} from "../redux/actions/hours";
// Images
import timesheetIcon from "../images/timesheet-icon.png";

// Display Timesheets
export const TimesheetsList = props => {
  const [deleted, setDeleted] = useState(false);
  const timesheets = useSelector(state => state.timesheets.payload);
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Get All
  const retrieveAllTimesheets = () => {
    dispatch(getAllTimesheets()); // dispatch get all timesheets
  };

  useEffect(() => {
    retrieveAllTimesheets();
  }, []);

  // Add
  const handleAdd = () => {
    dispatch(addTimesheet(currentUser))
      .then(res => {
        props.history.push(`/timesheet/${res.id}/day`);
      })
      .catch(e => {
        console.error(e);
      });
  };

  // Delete
  const handleDelete = id => {
    // confirm deletion
    if (window.confirm("Are you sure you want to delete timesheet?")) {
      dispatch(deleteTimesheet(id))
        .then(() => {
          setDeleted(true);
          // window.location.reload();
          retrieveAllTimesheets(); // update user data
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  // If no user redirect to login
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <div className="inner-cont lg">
        <div className="header">
          <h1 className="main-title">Timesheets</h1>
          <button className="main-btn" onClick={handleAdd}>
            Add Timesheet
          </button>
        </div>
        <br />

        {/* If timesheets, map timesheets and display details */}
        {timesheets != undefined &&
          timesheets.length > 0 &&
          timesheets.map(ts => (
            <div key={ts.id} className="timesheet-card">
              <Link to={{ pathname: `/timesheet/${ts.id}` }}>
                <span>
                  <img
                    className="link-icon"
                    alt="timesheet"
                    src={timesheetIcon}
                  />
                  <strong>Week: </strong>
                  {ts.week}
                </span>
              </Link>
              <button
                className="main-icon-btn"
                onClick={() => handleDelete(ts.id)}
              >
                &#x292B;
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimesheetsList;
