import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth } from '../../../fixtures/types';
import { createProject } from '../../../store/actions';

export interface Props {
  auth: Auth;
  history: any;
  createProject: (project: any) => void;
}

class ProjectCreate extends React.Component<Props> {
  state = {
    projectName: '',
    description: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onConfirmClick = () => {
    if (this.state.projectName.trim() !== '') {
      this.props.createProject(this.state);
      this.setState({ projectName: '' });
    }

    this.props.history.push('/');
  };

  private get content() {
    return (
      <form className="ui form">
        <div className="field">
          <label>Project Name</label>
          <input
            type="text"
            id="projectName"
            placeholder="Project Name"
            value={this.state.projectName}
            onChange={this.onInputChange}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onInputChange}
          />
        </div>
      </form>
    );
  }

  private onCancelClick = () => this.props.history.push('/');

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Create Project</div>
          <div className="content">{this.content}</div>
          <div className="actions">
            <button className="ui positive button" onClick={this.onConfirmClick}>
              Create
            </button>
            <button className="ui button" onClick={this.onCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, { createProject })(ProjectCreate);
