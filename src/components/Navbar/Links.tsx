import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import { Auth, NewUser } from '../../fixtures/types';
import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { signOut } from '../../store/actions';

export interface Props {
  projectId: string;
  profile: NewUser;
  auth: Auth;
  signOut: () => void;
}

class Links extends React.Component<Props> {
  private get createProjectLink() {
    const { profile } = this.props;

    return profile.accountType === ACCOUNT_TYPE.VIP && !this.props.projectId ? (
      <NavLink to="/project/new" className="header item">
        Create New Project
      </NavLink>
    ) : null;
  }

  private get createTaskLink() {
    return this.props.projectId ? (
      <NavLink to={`/project/${this.props.projectId}/task/new`} className="header item">
        Create New Task
      </NavLink>
    ) : null;
  }

  private get renderLinks() {
    const { auth, signOut } = this.props;

    return auth.uid ? (
      <React.Fragment>
        {this.createProjectLink}
        {this.createTaskLink}
        <Dropdown
          item
          icon={<img src={`https://api.adorable.io/avatars/${auth.uid}.png`} className="ui mini circular image" />}
          simple
        >
          <Dropdown.Menu direction="left">
            <Dropdown.Item disabled>Settings</Dropdown.Item>
            <Dropdown.Item onClick={() => signOut()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavLink to="/signup" className="header item">
          Register
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

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projectId: ownProps.match.params.id
  };
};

export default connect(mapStateToProps, { signOut })(Links);
