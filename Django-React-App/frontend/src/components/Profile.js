/* User Profile */

import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/auth";

const Profile = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const userData = useSelector(state => state.userProfile.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(currentUser.id));
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <div className="inner-cont sm">
        <div className="auth-form">
          <h1 className="title">Account Details</h1>
          {userData != undefined && (
            <>
              <div className="form-group">
                <h4>
                  Username: &ensp;
                  {userData.data.username}
                </h4>
              </div>
              <div className="form-group">
                <h4>
                  Email: &ensp;
                  {userData.data.email}
                </h4>
              </div>
              <div className="form-group">
                <h4>
                  First Name: &ensp;
                  {userData.data.first_name}
                </h4>
              </div>
              <div className="form-group">
                <h4>
                  Last Name: &ensp;
                  {userData.data.last_name}
                </h4>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
