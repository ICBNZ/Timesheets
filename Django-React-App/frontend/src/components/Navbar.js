/* Navbar */

import React from "react";
import accountIcon from "../images/account.png";
import logo from "../images/logo-icon-white.png";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav>
        {currentUser ? (
          <>
            <NavLink to="/home" activeClassName="link--active">
              <img className="link-icon logo" alt="logo" src={logo} />
            </NavLink>
            <ul>
              <li>
                <NavLink to="/timesheet/" activeClassName="link--active">
                  Timesheets
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  onClick={logOut}
                  activeClassName="link--active"
                >
                  Logout
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/profile/${currentUser.id}`}
                  activeClassName="link--active"
                >
                  <img className="nav-icon" alt="logout" src={accountIcon} />
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <div>
            <NavLink to="/login">
              <img className="link-icon logo" alt="logo" src={logo} />
            </NavLink>
            <li>
              <NavLink to={"/register"}>Sign Up</NavLink>
            </li>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
