import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import { getProject, assignMembers } from '../../../store/actions';
import { Project, Auth, User } from '../../../fixtures/types';
import { RandomAvatar } from '../../index';

import './MembersModal.scss';

export interface Props {
  projectId: string;
  project: Project;
  users: User[];
  auth: Auth;
  history: any;
  getProject: (id: string) => void;
  assignMembers: (project: Project, projectId: string, members: string[]) => void;
}

class MembersModal extends React.Component<Props> {
  state = {
    members: [],
  };

  public componentDidMount() {
    this.props.getProject(this.props.projectId);
  }

  private onConfirmClick = () => {
    const { assignMembers, project, projectId, history } = this.props;

    assignMembers(project, projectId, this.state.members);
    history.goBack();
  };

  private onCancelClick = () => this.props.history.goBack();

  private getUserIds = (selectedUsers, options) => {
    const members: User[] = [];

    for (const selectedUser of selectedUsers) {
      const member = options.find((option) => option.value === selectedUser);
      const id = member.id;
      const username = member.value;

      members.push({ id, username });
    }

    this.setState({ members });
  };

  private onChange = (e, data) => {
    const selectedValue = data.value;
    const options = data.options;

    this.getUserIds(selectedValue, options);
  };

  private get filteredMembers() {
    const {
      users,
      project: { members },
    } = this.props;

    const filteredUsers = [];

    users &&
      users.filter((user) => {
        if (!members.find((member: User) => member.id === user.id)) {
          (filteredUsers as User[]).push(user);
        }
      });

    return filteredUsers.length ? filteredUsers : [];
  }

  private get memberOptions() {
    const { users } = this.props;

    return users
      ? (this.filteredMembers as User[]).map((user) => {
          return {
            key: user.id,
            id: user.id,
            value: user.username,
            image: { avatar: true, src: `https://api.adorable.io/avatars/${user.id}.png` },
            text: user.username,
          };
        })
      : [];
  }

  private get memberAvatar() {
    return this.props.project.members.map((member) => (
      <div key={member.id} className="ui icon button member" data-tooltip={member.username}>
        <RandomAvatar className="ui avatar image" randomFace={member.id} />
      </div>
    ));
  }

  private get content() {
    return (
      <div className="ui dimmer modals visible active members-modal">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Members</div>
          <div className="content">
            <div className="ui form">
              <div className="field">
                <label>Owner</label>
                <div className="author-avatar">
                  <RandomAvatar className="ui avatar image" randomFace={this.props.project.authorId} />
                  <b>{this.props.project.author}</b>
                </div>
              </div>
              <div className="field">
                <label>Members</label>
                {this.memberAvatar}
              </div>
              <div className="field">
                <label>Add Member</label>
                <Dropdown
                  placeholder="Add members"
                  fluid
                  multiple
                  search
                  selection
                  options={this.memberOptions}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
          <div className="actions">
            <button className="ui positive button" type="submit" onClick={this.onConfirmClick}>
              Ok
            </button>
            <button className="ui button" onClick={this.onCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  public render() {
    const { auth, project } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return !project ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading project details</div>
      </div>
    ) : (
      this.content
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[projectId] : null;

  return {
    projectId,
    project,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect([{ collection: 'users' }]),
  connect(mapStateToProps, { getProject, assignMembers }),
)(MembersModal);
