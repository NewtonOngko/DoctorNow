import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from '../../client/Route/history';
import Login from '../../client/Containers/Login';
import Dashboard from '../../client/Containers/Dashboard';
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    {/* <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} /> */}
                </Switch>
            </Router>
        )
    }
}