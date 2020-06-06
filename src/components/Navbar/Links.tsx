import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Auth } from '../../fixtures/types';
import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { signOut } from '../../store/actions';

export interface Props {
  profile: any;
  auth: Auth;
  signOut: () => void;
}

class Links extends React.Component<Props> {
  private get createProjectLink() {
    const { profile } = this.props;

    return profile.accountType === ACCOUNT_TYPE.VIP ? (
      <NavLink to="/project/new" className="header item">
        Create New Project
      </NavLink>
    ) : null;
  }
  private get renderLinks() {
    const { auth } = this.props;

    return auth.uid ? (
      <React.Fragment>
        {this.createProjectLink}
        <NavLink to="/task/new" className="header item">
          Create New Task
        </NavLink>
        <a onClick={() => this.props.signOut()} className="header item">
          Logout
        </a>
        <NavLink to="/profile" className="header item">
          <img src={`https://api.adorable.io/avatars/${auth.uid}.png`} className="ui mini circular image" />
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
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, { signOut })(Links);
