import React, { Component } from 'react';
import Login from '../../src/client/Containers/Login';
import ReactDOM from "react-dom";
import Routes from '../client/Route/routes'
import Sidebar from '../client/Components/Sidebar'

export default class App extends Component {

  render() {
    return (
      //<Sidebar/>
      <Routes/>
    );
  }
}
