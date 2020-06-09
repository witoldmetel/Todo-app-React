import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import { getProject, assignMembers } from '../../../store/actions';
import { Project, Auth } from '../../../fixtures/types';

export interface Props {
  projectId: string;
  project: Project;
  users: any;
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
    this.props.assignMembers(this.props.project, this.props.projectId, this.state.members);
    this.props.history.goBack();
  };

  private onCancelClick = () => this.props.history.goBack();

  private getUserIds = (selectedUsers, options) => {
    const members: string[] = [];

    for (const selectedUser of selectedUsers) {
      const member = options.find((option) => option.value === selectedUser);
      const memberId = member.id;
      const memberName = member.value;

      members.push({ memberId, memberName });
    }

    this.setState({ members });
  };

  private onChange = (e, data) => {
    const selectedValue = data.value;
    const options = data.options;

    this.getUserIds(selectedValue, options);
  };

  private get memberOptions() {
    return this.props.users
      ? this.props.users.map((user) => {
          return {
            key: user.id,
            id: user.id,
            value: user.username,
            image: { avatar: true, src: `https://api.adorable.io/avatars/${user.id}.png` },
            text: user.username,
          };
        })
      : null;
  }

  private get memberAvatar() {
    return this.props.project.members.map((member) => (
      <div className="right floated author" key={member.memberId}>
        <img className="ui avatar image" src={`https://api.adorable.io/avatars/${member.memberId}.png`} />
        {member.memberName}
      </div>
    ));
  }

  private get content() {
    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Members</div>
          <div className="content">
            <div className="ui form">
              <div className="field">
                <label>Owner</label>
                <div className="right floated author">
                  <img
                    className="ui avatar image"
                    src={`https://api.adorable.io/avatars/${this.props.project.authorId}.png`}
                  />
                  {this.props.project.author}
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
