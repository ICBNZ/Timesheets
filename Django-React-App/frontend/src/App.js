import React, { useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { clearMessage } from "./redux/actions/message";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./sass/App.scss";
// Components
import TimeList from "./components/TimeList";
import AddTime from "./components/AddTime";
import TimesheetsList from "./components/TimesheetsList";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
// Helpers
import { history } from "./helpers/history";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <div className="main">
        <Navbar />
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path={["/timesheet"]} component={TimesheetsList} />
          <Route exact path={["/timesheet/:id"]} component={TimeList} />
          <Route exact path={["/timesheet/:id/day/"]} component={AddTime} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/:id" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
