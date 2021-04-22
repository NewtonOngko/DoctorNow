import React, { Component } from 'react';
import '../../client/Styles/app.css';
import ReactImage from '../../client/Assets/react.png';
import '../../client/Styles/Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {brand: "Ford"};
  }
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    );
  }
}
