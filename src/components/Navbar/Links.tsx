import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Links extends React.Component {
  private get renderLinks() {
    // todo: Add later proper state
    return false ? (
      <React.Fragment>
        <NavLink to="/task/new" className="header item">
          Create New Task
        </NavLink>
        <NavLink to="/logout" className="header item">
          Logout
        </NavLink>
        <NavLink to="/profile" className="header item">
          <img src="https://api.adorable.io/avatars/profile.png" className="ui mini circular image" />
        </NavLink>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavLink to="/signup" className="header item">
          Signup
        </NavLink>
        <NavLink to="/signin" className="header item">
          Signin
        </NavLink>
      </React.Fragment>
    );
  }

  public render() {
    return <div className="right menu">{this.renderLinks}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps -> state', state);
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Links);
