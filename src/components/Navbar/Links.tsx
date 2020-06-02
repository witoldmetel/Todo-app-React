import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../../store/actions';

export interface Props {
  auth: any;
  signOut: () => void;
}

class Links extends React.Component<Props> {
  private get renderLinks() {
    const { auth } = this.props;

    return auth.uid ? (
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
          Login
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
