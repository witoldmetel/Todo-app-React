import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import { getProject, assignMembers, removeMember } from '../../../store/actions';
import { Project, Auth, User } from '../../../fixtures/types';
import { RandomAvatar, Modal, Button } from '../../index';

import './MembersModal.scss';

export interface Props {
  projectId: string;
  project: Project;
  users: User[];
  auth: Auth;
  history: History;
  getProject: (id: string) => void;
  assignMembers: (project: Project, projectId: string, members: string[]) => void;
  removeMember: (project: Project, projectId: string, memberId: string) => void;
}

class MembersModal extends React.Component<Props> {
  state = {
    members: []
  };

  public componentDidMount() {
    this.props.getProject(this.props.projectId);
  }

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
      project: { members }
    } = this.props;

    const filteredUsers = [];

    users &&
      users.filter((user) => {
        if (!(members as User[]).find((member: User) => member.id === user.id)) {
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
            text: user.username
          };
        })
      : [];
  }

  private removeMember = (id: string) => {
    const { project, projectId } = this.props;

    return id !== this.props.project.authorId ? this.props.removeMember(project, projectId, id) : null;
  };

  private get members() {
    return (this.props.project.members as User[]).map((member) => (
      <div
        key={member.id}
        className="ui icon button member"
        data-tooltip={member.username}
        onClick={() => this.removeMember(member.id)}
      >
        <RandomAvatar className="ui avatar image" randomFace={member.id} />
      </div>
    ));
  }

  private get content() {
    const { authorId, author } = this.props.project;

    return (
      <div className="ui form content">
        <div className="field">
          <label>Owner</label>
          <div className="author-avatar">
            <RandomAvatar className="ui avatar image" randomFace={authorId} />
            <b>{author}</b>
          </div>
        </div>
        <div className="field">
          <label>Members</label>
          {this.members}
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
    );
  }

  private handleSubmit = () => {
    const { assignMembers, project, projectId, history } = this.props;

    assignMembers(project, projectId, this.state.members);
    history.goBack();
  };

  private handleCancel = () => this.props.history.goBack();

  private get actionButtons() {
    return (
      <React.Fragment>
        <Button label="Ok" className="positive" onClick={this.handleSubmit} disabled={!this.state.members.length} />
        <Button label="Cancel" onClick={this.handleCancel} />
      </React.Fragment>
    );
  }

  public render() {
    const { auth, project } = this.props;

    if (!auth.uid) return <Redirect to="/" />;

    return !project ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading members</div>
      </div>
    ) : (
      <Modal header="Members" content={this.content} actionButtons={this.actionButtons} history={this.props.history} />
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
    auth: state.firebase.auth
  };
};

export default compose(
  firestoreConnect([{ collection: 'projects' }, { collection: 'users' }]),
  connect(mapStateToProps, { getProject, assignMembers, removeMember })
)(MembersModal);
