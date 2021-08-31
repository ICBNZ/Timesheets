/* TimeList - Timesheet Detail View */

// React, Redux, React Router
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Actions
import {
  updateTimesheet,
  getTimesheet,
  deleteDay
} from "../redux/actions/hours";
// Form
import { order } from "../helpers/datetime";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

// Display List of Hours on Timesheet
export const TimeList = props => {
  const [timesheet, setTimesheet] = useState([]);
  const [editTimesheet, setEditT] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const tsId = props.match.params.id; // get id from url
  const form = useRef();
  const { user: currentUser } = useSelector(state => state.auth);
  const times = useSelector(state => state.timesheets.payload);
  const dispatch = useDispatch();

  // Get All Days
  const retrieveAllHours = async tsId => {
    await dispatch(getTimesheet(tsId))
      .then(() => {})
      .catch(e => {
        console.error(e);
      });
  };

  useEffect(() => {
    retrieveAllHours(tsId);
  }, [tsId]);

  // Delete
  const deleteHours = dayId => {
    // Confirm user wants to delete
    if (window.confirm("Are you sure you want to delete time?")) {
      // Dispatch delete day, passing in day id
      dispatch(deleteDay(dayId))
        .then(() => {
          setDeleted(true);
          retrieveAllHours(tsId); // update
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  // set vars when input changes
  const handleTimesheetChange = e => {
    const { name, value } = e.target;
    setTimesheet({ ...timesheet, [name]: value });
  };

  // Handle Timesheet Submit
  // Note: This is going to be altered to be checked / signed first
  // before being forwarded to nursing agency
  const handleSubmit = () => {
    setTimesheet({ ...timesheet, ["submitted"]: true });
    handleUpdateTimesheet();
  };

  // Submit timesheet updates
  const handleUpdateTimesheet = () => {
    setEditT(false); // turn off editing view
    const data = {
      id: tsId,
      user: currentUser.id,
      week: timesheet.week,
      client: timesheet.client,
      submitted: timesheet.submitted
    };

    dispatch(updateTimesheet(tsId, data)) // Dispatch Update
      .then(() => {
        retrieveAllHours(tsId);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <div className="container">
      <div className="inner-cont lg">
        {/* Display timesheet details */}
        {times != undefined && (
          <div className="table-container" role="table" aria-label="Hours">
            <Link to="/timesheet/" className="arrow">
              &#8592;
            </Link>

            <div className="header">
              <h1 className="main-title">
                Timesheet &nbsp;
                <span>{times.week}</span>
              </h1>

              {/* If timesheet not yet submitted display Add Hours Button */}
              {!times.submitted && (
                <Link to={{ pathname: `/timesheet/${tsId}/day/` }}>
                  <button className="main-btn">Add Hours</button>
                </Link>
              )}
            </div>

            {/* Timesheet Table Header */}
            <div className="flex-table header" role="rowgroup">
              <div className="flex-row first" role="columnheader">
                Date
              </div>
              <div className="flex-row" role="columnheader">
                Start
              </div>
              <div className="flex-row" role="columnheader">
                End
              </div>
              <div className="flex-row" role="columnheader">
                Meal
              </div>
              <div className="flex-row" role="columnheader">
                Total
              </div>
              <div className="flex-row" role="columnheader">
                Edit
              </div>
            </div>

            {/* Display Hours */}
            {times.days != undefined &&
              times.days
                .sort(order) // sort days, display Mon to Sun
                .reverse()
                .map((hours, index) => (
                  <div key={hours.id} className="flex-table" role="rowgroup">
                    <div className="flex-row first" role="cell">
                      <h5 className="card-title">{hours.day}</h5>
                      <p className="card-subtitle mb-2">{hours.date}</p>
                    </div>
                    <div className="flex-row" role="cell">
                      <p className="card-title">{hours.start}</p>
                    </div>
                    <div className="flex-row" role="cell">
                      <p className="card-title">{hours.end}</p>
                    </div>
                    <div className="flex-row" role="cell">
                      <p className="card-title">{hours.meal}</p>
                    </div>
                    <div className="flex-row" role="cell">
                      <p className="card-title">{hours.total} hrs</p>
                    </div>

                    <div className="flex-row" role="cell">
                      {!times.submitted && (
                        <>
                          {/* Delete Hour by ID */}
                          <button
                            className="main-icon-btn del"
                            onClick={() => deleteHours(hours.id)}
                          >
                            &#x292B;
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}

            <div className="ts-form">
              {/* Update Timesheet Client */}

              <h5>
                <strong>Client:</strong> &nbsp;
                {!editTimesheet && (
                  <span>
                    {times.client}
                    {!times.submitted && (
                      <button
                        onClick={() => setEditT(true)}
                        className="main-icon-btn"
                      >
                        &#x2710;
                      </button>
                    )}
                  </span>
                )}
              </h5>

              {editTimesheet && (
                <Form
                  onSubmit={handleUpdateTimesheet}
                  ref={form}
                  className="auth-form"
                >
                  <div className="form-group ts">
                    <Input
                      style={{
                        width: "200px"
                      }}
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="client"
                      required
                      value={timesheet.client}
                      name="client"
                      onChange={handleTimesheetChange}
                    />
                    <button
                      type="submit"
                      onClick={handleUpdateTimesheet}
                      className="main-btn sm"
                    >
                      &#x2713;
                    </button>
                  </div>
                </Form>
              )}

              {/* Submit Timesheet */}
              <div>
                {!times.submitted && (
                  <button
                    type="submit"
                    className="main-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
                {times.submitted && <h5>Submitted</h5>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeList;
