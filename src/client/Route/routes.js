import React, { Component } from "react";
import { Router, Switch, Route,Link } from "react-router-dom";
import history from '../../client/Route/history';
import Login from '../../client/Containers/Login';
import Dashboard from '../Containers/DashBoard/Dashboard';
import Appointment from '../Containers/Appointment/Appointment';
import Doctors from '../Containers/Doctors/Doctors';
import Users from '../Containers/Users/Users';
import Hospital from '../Containers/Hospital/Hospital';
import Consultation from '../Containers/Consultation/Consultation';
import Reports from '../Containers/Reports/Reports';

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
                    <Route path="/doctors" component={Doctors}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/hospital" component={Hospital}/>
                    <Route path="/consultation" component={Consultation}/>
                    <Route path="/report" component={Reports}/>
                </Switch>
            </Router>
          </>
        )
    }
}