import React, { Component } from 'react';

export default class SignUpComponent extends Component {
  public render() {
    return (
      <form className="ui form">
        <div className="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="field">
          <label>E-mail</label>
          <input type="email" placeholder="joe@schmoe.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
