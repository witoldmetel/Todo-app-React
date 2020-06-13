import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth, Project } from '../../../fixtures/types';
import { createProject } from '../../../store/actions';
import { Modal } from '../../index';

export interface Props {
  auth: Auth;
  history: any;
  createProject: (project: Project) => void;
}

class ProjectCreate extends React.Component<Props> {
  state = {
    projectName: '',
    description: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.projectName.trim() !== '') {
      this.props.createProject(this.state);
      this.setState({ projectName: '' });
    }

    this.props.history.push('/');
  };

  private get content() {
    return (
      <div className="content">
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
      </div>
    );
  }

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
