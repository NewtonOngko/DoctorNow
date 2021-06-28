import React, { Component } from "react";
import { Router, Switch, Route,Link,  useParams,useRouteMatch } from "react-router-dom";
import { Redirect } from "react-router";

import Users from '../Containers/Users/Users';
import UsersMain from '../Containers/Users/Main';
import AddUsers from '../Containers/Users/MainAdd';
import EditUsers from '../Containers/Users/EditUser';

import Appointment from '../Containers/Appointment/Appointment';
import AppointmentMain from '../Containers/Appointment/Main';
import AddAppointment from '../Containers/Appointment/MainAdd';
import EditAppointment from '../Containers/Appointment/EditAppointment';

import history from '../../client/Route/history';
import Login from '../../client/Containers/Login';
import Dashboard from '../Containers/DashBoard/Dashboard';
import Doctors from '../Containers/Doctors/Doctors';


import Hospital from '../Containers/Hospital/Hospital';
import Consultation from '../Containers/Consultation/Consultation';
import Reports from '../Containers/Reports/Reports';
import Sidebar from '../../client/Components/Sidebar';

export default class Routers extends Component {
    render() {
        //let { match, url } = useRouteMatch();
        return (
          <>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route
                      path={"/appointment"}
                      render={({ match: { path } }) => (
                        <Appointment>
                          <Switch>
                            <Route
                              exact
                              path={path + "/"}
                              component={AppointmentMain}
                            />
                            <Route path={`${path}/add`} component={AddAppointment} />
                            <Route path={`${path}/edit`} component={EditAppointment} />
                            <Redirect exact from={path + "/"} to={path} />
                          </Switch>
                        </Appointment>
                      )}
                    />
                    <Route
                      path={"/users"}
                      render={({ match: { path } }) => (
                        <Users>
                          <Switch>
                            <Route
                              exact
                              path={path + "/"}
                              component={UsersMain}
                            />
                            <Route path={`${path}/add`} component={AddUsers} />
                            <Route path={`${path}/edit`} component={EditUsers} />
                            <Redirect exact from={path + "/"} to={path} />
                          </Switch>
                        </Users>
                      )}
                    />
                    <Route path="/doctors" component={Doctors}/>
                    <Route path="/hospital" component={Hospital}/>
                    <Route path="/consultation" component={Consultation}/>
                    <Route path="/report" component={Reports}/>
                </Switch>
            </Router>
          </>
        )
    }
}