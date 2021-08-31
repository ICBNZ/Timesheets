/* Login */

import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../redux/actions/auth";
import { required } from "../helpers/validation";

const Login = props => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // get state
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  // Login Submit
  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);

    form.current.validateAll(); // validate
    if (checkBtn.current.context._errors.length === 0) {
      // dispatch login
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/"); // redirect
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container">
      <div className="inner-cont sm">
        <Form
          onSubmit={handleLogin}
          ref={form}
          autoComplete="off"
          className="auth-form"
        >
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group auth">
            <button className="main-btn" disabled={loading}>
              <span>Login</span>
            </button>
            <Link to="./register">Click here to Signup</Link>
          </div>

          {message && (
            <div className="form-group auth">
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

export default Login;
