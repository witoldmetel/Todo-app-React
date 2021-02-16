import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import { getProject, assignMembers, removeMember } from '../../../store/actions';
import { Project, Auth, User } from '../../../fixtures/types';
import { DEFAULT } from '../../../fixtures/routes';
import { MODAL_SIZE } from '../../../fixtures/constants';
import { RandomAvatar, Modal, Button } from '../../index';
import { getAvatarImage } from '../../../utils/helpers';

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

export interface State {
  members: User[];
}

class MembersModal extends React.Component<Props, State> {
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

  private get filteredMembers(): User[] {
    const {
      users,
      project: { members }
    } = this.props;

    const filteredUsers: User[] = [];

    users &&
      users.filter((user) => {
        if (!(members as User[]).find((member: User) => member.id === user.id)) {
          filteredUsers.push(user);
        }
      });

    return filteredUsers.length ? filteredUsers : [];
  }

  private get memberOptions() {
    const { users } = this.props;

    return users
      ? this.filteredMembers.map((user) => {
          return {
            key: user.id,
            id: user.id,
            value: user.username,
            image: { avatar: true, src: getAvatarImage(user.id) },
            text: user.username
          };
        })
      : [];
  }

  private removeMember = (id: string) => () => {
    const { auth, project, projectId, removeMember } = this.props;

    return auth.uid === project.authorId && id !== project.authorId ? removeMember(project, projectId, id) : null;
  };

  private get members() {
    return (this.props.project.members as User[]).map((member) => (
      <div
        key={member.id}
        className="ui icon button member"
        data-tooltip={member.username}
        onClick={this.removeMember(member.id)}
      >
        <RandomAvatar className="ui avatar image" randomFace={member.id} />
      </div>
    ));
  }

  private get dropdownField() {
    const { auth, project } = this.props;

    return auth.uid === project.authorId ? (
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
    ) : (
      <div className="ui field" data-tooltip="Available only for project owner">
        <label>Add Member</label>
        <Dropdown
          placeholder="Add members"
          disabled
          fluid
          multiple
          search
          selection
          options={this.memberOptions}
          onChange={this.onChange}
        />
      </div>
    );
  }

  private get content() {
    const { authorId, author } = this.props.project;

    return (
      <div className="ui form content">
        <div className="field">
          <label>Owner</label>
          <div className="author-avatar">
            <RandomAvatar className="ui avatar image" randomFace={authorId as string} />
            <b>{author}</b>
          </div>
        </div>
        <div className="field">
          <label>Members</label>
          {this.members}
        </div>
        {this.dropdownField}
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

    if (!auth.uid) return <Redirect to={DEFAULT} />;

    return !project ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading members</div>
      </div>
    ) : (
      <Modal
        header="Members"
        content={this.content}
        actionButtons={this.actionButtons}
        history={this.props.history}
        size={MODAL_SIZE.TINY}
      />
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
)(MembersModal) as React.ComponentType;
