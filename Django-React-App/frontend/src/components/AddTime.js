/* Add Time to Timesheet */

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDay, updateTimesheet } from "../redux/actions/hours";
import DatePicker from "react-datepicker";
import { required } from "../helpers/validation";
import {
  weekday,
  formatDate,
  roundTime,
  totalHours,
  currentWeek
} from "../helpers/datetime";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const AddTime = props => {
  const initialTimeState = {
    user: null,
    id: null,
    timesheet: null,
    date: null,
    day: "",
    start: "",
    end: "",
    meal: 0,
    total: null
  };

  const form = useRef();
  const checkBtn = useRef();
  const [datesAvail, setDatesAvail] = useState([]); // list of dates to exclude from date picker
  const [dateValidation, setDateVal] = useState(); // date validation
  const days = weekday;
  const [week, setWeek] = useState([]);
  const [loading, setLoading] = useState(false);
  const tsId = parseInt(props.match.params.id); // id from url params
  const [hours, setHours] = useState(initialTimeState); // Hours updated from form
  const [selectedDate, setSelectedDate] = useState();
  const [editDay, setEditDay] = useState(false);

  // State from Redux
  const { message } = useSelector(state => state.message);
  const timesheet = useSelector(state => state.timesheets.payload);
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timesheet != undefined) {
      // Get filled dates
      if (timesheet.days.length > 0) {
        timesheet.days.forEach(el => {
          setDatesAvail(arr => [...arr, new Date(el.date)]);
        });
        setWeek(currentWeek(new Date(timesheet.days[0].date)));
      }
    }
  }, []);

  // Check date selected
  const validateDate = () => {
    selectedDate == null
      ? setDateVal(
          <div className="alert alert-danger" role="alert">
            Please select a date
          </div>
        )
      : setDateVal("");
  };

  // set vars when form input changes
  const handleHoursChange = e => {
    const { name, value } = e.target;
    setHours({ ...hours, [name]: value });
  };

  // handle form submit
  const handleSubmit = e => {
    e.preventDefault(); // prevent reload
    setLoading(true); // disable submit button

    form.current.validateAll(); // validation
    validateDate(); // validate date - separate as different library
    if (checkBtn.current.context._errors.length === 0 && selectedDate) {
      // if new timesheet, update week with selected date
      if (!timesheet.week) {
        // call current Week function to calculate all dates of the week
        // Mon to Sunday based on the selected date
        let week = currentWeek(new Date(selectedDate));
        // pass required details and dispatch update Timesheet
        // pass only first and last indexes from week array formated
        let data = {
          id: timesheet.id,
          user: currentUser.id,
          week:
            formatDate(week[0]).toString() +
            "-" +
            formatDate(week[6]).toString()
        };
        // dispatch update timesheet
        dispatch(updateTimesheet(timesheet.id, data));
      }
      submitHours(); // submit hours if no validation errors
    } else {
      setLoading(false);
    }
  };

  const submitHours = () => {
    // set hours data to post
    let data = {
      user: currentUser.id,
      timesheet: tsId,
      date: formatDate(selectedDate),
      day: days[selectedDate.getDay()],
      start: roundTime(hours.start),
      end: roundTime(hours.end),
      meal: hours.meal.toString(),
      total: totalHours(roundTime(hours.start), roundTime(hours.end))
    };

    dispatch(addDay(tsId, data)) // send data
      .then(() => {
        props.history.push(`/timesheet/${tsId}/`); // redirect
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <div className="container">
      <div className="inner-cont sm">
        <Form onSubmit={handleSubmit} ref={form} className="auth-form">
          <h1>Add Hours</h1>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <br />
            <div>
              {/* Date Picker - Set Min and Max from week array and filter out filled dates */}
              <DatePicker
                autoComplete="off"
                minDate={week.length > 0 ? week[0] : null}
                maxDate={week.length > 0 ? week[6] : null}
                id="date"
                required={true}
                selected={selectedDate}
                onChange={e => setSelectedDate(e)}
                excludeDates={datesAvail}
              />
              {dateValidation}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="start">Start</label>
            <Input
              type="time"
              step="900"
              autoComplete="off"
              className="form-control"
              id="start"
              required
              value={hours.start}
              name="start"
              onChange={handleHoursChange}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end">End</label>
            <Input
              autoComplete="off"
              type="time"
              step="900"
              className="form-control"
              id="end"
              required
              value={hours.end}
              name="end"
              onChange={handleHoursChange}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="meal">Meal</label>
            <Input
              autoComplete="off"
              type="number"
              className="form-control"
              id="meal"
              required
              step="0.01"
              min="0"
              value={hours.meal}
              name="meal"
              onChange={handleHoursChange}
            />
          </div>
          <div className="form-group auth">
            <button
              type="submit"
              onClick={handleSubmit}
              className="main-btn"
              disabled={loading}
            >
              Save
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default AddTime;
