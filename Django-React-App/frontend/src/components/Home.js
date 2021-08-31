/* Home page */

import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import logo from "../images/logo.png";

const Home = () => {
  const { user: currentUser } = useSelector(state => state.auth);

  // If no user return to login
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <div className="inner-cont sm">
        <div className="header">
          <h1>Timesheets</h1>
        </div>

        {/* Link to Timesheet List and User Profile */}
        <Link to="/timesheet/" className="link-btn">
          View Timesheets
          <img className="link-icon" alt="time-icon" src={logo} />
        </Link>

        <Link to={`/profile/${currentUser.id}`} className="link-btn">
          Account Details
          <img className="link-icon" alt="time-icon" src={logo} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
