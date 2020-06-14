import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth, Project } from '../../../fixtures/types';
import { createProject } from '../../../store/actions';
import { Modal } from '../../index';

export interface Props {
  auth: Auth;
  history: any;
  createProject: (project: Project, callback) => void;
}

export interface State {
  projectName: string;
  description: string;
  errorMessage: string;
}

class ProjectCreate extends React.Component<Props, State> {
  state = {
    projectName: '',
    description: '',
    errorMessage: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value } as any);
  };

  private get errorMessage() {
    return this.state.errorMessage ? <div className="ui red message">{this.state.errorMessage}</div> : null;
  }

  private get content() {
    return (
      <div className="ui form content">
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
        {this.errorMessage}
      </div>
    );
  }

  private handleSubmit = () => {
    if (this.state.projectName.trim().length) {
      this.props.createProject(this.state, this.handleCancel);
    } else {
      this.setState({ errorMessage: 'Project name is empty' });
    }
  };

  private handleCancel = () => this.props.history.goBack();

  private get actionButtons() {
    return (
      <React.Fragment>
        <button className="ui positive button" onClick={this.handleSubmit}>
          Create
        </button>
        <button className="ui button" onClick={this.handleCancel}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return <Modal header="Create Project" content={this.content} actionButtons={this.actionButtons} />;
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, { createProject })(ProjectCreate);
