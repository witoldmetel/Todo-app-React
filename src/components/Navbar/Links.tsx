import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Popup } from 'semantic-ui-react';

import { Auth, NewUser } from '../../fixtures/types';
import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { PROJECT_NEW, SIGNIN } from '../../fixtures/routes';
import { signOut } from '../../store/actions';
import { getAvatarImage } from '../../utils/helpers';

export interface Props {
  projectId: string;
  profile: NewUser;
  auth: Auth;

  signOut: () => void;
}

class Links extends React.Component<Props> {
  private get createProjectLink() {
    const { profile } = this.props;

    if (this.props.projectId) {
      return null;
    }

    return profile.accountType === ACCOUNT_TYPE.VIP ? (
      <NavLink to={PROJECT_NEW} className="header item">
        Create New Project
      </NavLink>
    ) : (
      <Popup
        trigger={
          <NavLink to={PROJECT_NEW} className="header item disabled" onClick={(e) => e.preventDefault()}>
            <i className="shopping cart icon" />
            Create New Project
          </NavLink>
        }
        content="Available only for VIP accounts"
        position="bottom center"
      />
    );
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
        <Dropdown item icon={<img src={getAvatarImage(auth.uid)} className="ui mini circular image" />} simple>
          <Dropdown.Menu direction="left">
            <Dropdown.Item disabled>Settings</Dropdown.Item>
            <Dropdown.Item onClick={() => signOut()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>
    ) : (
      <NavLink to={SIGNIN} className="header item">
        Login
      </NavLink>
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
