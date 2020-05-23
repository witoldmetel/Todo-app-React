import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Links extends React.Component {
  private get renderLinks() {
    // todo: Add later proper state
    return true ? (
      <React.Fragment>
        <NavLink to="/z" className="header item">
          Create New Task
        </NavLink>
        <NavLink to="/x" className="header item">
          Logout
        </NavLink>
        <NavLink to="/x" className="header item">
          <img src="https://api.adorable.io/avatars/profile.png" className="ui mini circular image" />
        </NavLink>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavLink to="/x" className="header item">
          Signup
        </NavLink>
        <NavLink to="/s" className="header item">
          Login
        </NavLink>
      </React.Fragment>
    );
  }

  public render() {
    return <div className="right menu">{this.renderLinks}</div>;
  }
}
