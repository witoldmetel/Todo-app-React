import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../../store/actions';

export interface Props {
  signOut: () => void;
}

class Links extends React.Component<Props> {
  private get renderLinks() {
    // todo: Add later proper state
    return false ? (
      <React.Fragment>
        <NavLink to="/task/new" className="header item">
          Create New Task
        </NavLink>
        <a onClick={() => this.props.signOut()} className="header item">
          Logout
        </a>
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
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, { signOut })(Links);
