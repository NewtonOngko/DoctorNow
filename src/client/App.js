import React, { Component } from 'react';
import Login from '../../src/client/Containers/Login';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Routers from './Route/routers'
import Sidebar from '../client/Components/Sidebar'

export default class App extends Component {

  render() {
    return (
      //<Sidebar/>
      <Routers/>
      // <div>
      //   <Router>
          
      //   </Router>
      // </div>
    );
  }
}
