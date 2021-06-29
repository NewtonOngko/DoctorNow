import React, { Component } from "react";
import { Router, Switch, Route,Link,  useParams,useRouteMatch } from "react-router-dom";
import { Redirect } from "react-router";

import Users from '../Containers/Users/Users';
import UsersMain from '../Containers/Users/Main';
import AddUsers from '../Containers/Users/MainAdd';
import EditUsers from '../Containers/Users/EditUser';

import Appointment from '../Containers/Appointment/Appointment';
import AppointmentMain from '../Containers/Appointment/Main';
import EditAppointment from '../Containers/Appointment/EditAppointment';

import Doctors from '../Containers/Doctors/Doctors';
import DoctorsMain from '../Containers/Doctors/Main';
import AddDoctors from '../Containers/Doctors/MainAdd';
import EditDoctors from '../Containers/Doctors/EditDoctor';

import Hospital from '../Containers/Hospital/Hospital';
import HospitalMain from '../Containers/Hospital/Main';
import AddHospital from '../Containers/Hospital/MainAdd';
import EditHospital from '../Containers/Hospital/EditHospital';

import history from '../../client/Route/history';
import Login from '../../client/Containers/Login';
import Dashboard from '../Containers/DashBoard/Dashboard';



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
                    <Route
                      path={"/doctors"}
                      render={({ match: { path } }) => (
                        <Doctors>
                          <Switch>
                            <Route
                              exact
                              path={path + "/"}
                              component={DoctorsMain}
                            />
                            <Route path={`${path}/add`} component={AddDoctors} />
                            <Route path={`${path}/edit`} component={EditDoctors} />
                            <Redirect exact from={path + "/"} to={path} />
                          </Switch>
                        </Doctors>
                      )}
                    />
                    <Route
                      path={"/hospital"}
                      render={({ match: { path } }) => (
                        <Hospital>
                          <Switch>
                            <Route
                              exact
                              path={path + "/"}
                              component={HospitalMain}
                            />
                            <Route path={`${path}/add`} component={AddHospital} />
                            <Route path={`${path}/edit`} component={EditHospital} />
                            <Redirect exact from={path + "/"} to={path} />
                          </Switch>
                        </Hospital>
                      )}
                    />
                    <Route path="/consultation" component={Consultation}/>
                    <Route path="/report" component={Reports}/>
                </Switch>
            </Router>
          </>
        )
    }
}