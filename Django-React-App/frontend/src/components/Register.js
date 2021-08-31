/* Register User */

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth";
import {
  required,
  validateEmail,
  validateName,
  validatePassword
} from "../helpers/validation";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const Register = props => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState();
  const [first_name, setFirstname] = useState();
  const [last_name, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const handleRegister = e => {
    e.preventDefault();

    setSuccessful(false);
    form.current.validateAll(); // validate
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, first_name, last_name, email, password))
        .then(() => {
          setSuccessful(true);
          props.history.push("/login"); // redirect
        })
        .catch(err => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="container">
      <div className="inner-cont sm">
        <Form
          onSubmit={handleRegister}
          ref={form}
          className="auth-form"
          autoComplete="off"
        >
          {!successful && (
            <>
              <h1>Signup</h1>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  validations={[required, validateName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstname">First name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={first_name}
                  onChange={e => {
                    setFirstname(e.target.value);
                  }}
                  validations={[required, validateName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={last_name}
                  onChange={e => {
                    setLastname(e.target.value);
                  }}
                  validations={[required, validateName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  validations={[required, validateEmail]}
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
                  validations={[required, validatePassword]}
                />
              </div>

              <div className="form-group auth">
                <button className="main-btn">Sign Up</button>
                <Link to="./login">Click here to Login</Link>
              </div>
            </>
          )}
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

export default Register;
