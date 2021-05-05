import React, { Component } from "react";
import { Router, Switch, Route,Link } from "react-router-dom";
import history from '../../client/Route/history';
import Login from '../../client/Containers/Login';
import Dashboard from '../Containers/DashBoard/Dashboard';
import Appointment from '../../client/Containers/Appointment';
import Sidebar from '../../client/Components/Sidebar';
export default class Routes extends Component {
    render() {
        return (
          <>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/appointment" component={Appointment}/>
                </Switch>
            </Router>
          </>
        )
    }
}