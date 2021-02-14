import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth, Project } from '../../../fixtures/types';
import { MODAL_SIZE } from '../../../fixtures/constants';
import { createProject } from '../../../store/actions';
import { Modal, Button, Form, Field } from '../../index';

interface Props {
  auth: Auth;
  history: History;

  createProject: (project: Project, callback: () => void) => void;
}

interface State {
  projectName: string;
  description: string;
  errorMessage: string;
  [key: string]: unknown;
}

class ProjectCreate extends React.Component<Props, State> {
  state: State = {
    projectName: '',
    description: '',
    errorMessage: ''
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private get content() {
    return (
      <Form
        initialValues={[this.state.projectName, this.state.description]}
        errorMessage={this.state.errorMessage}
        onSubmit={this.handleSubmit}
      >
        <Field
          id="projectName"
          label="Project Name"
          placeholder="Project Name"
          type="text"
          onChange={this.onInputChange}
        />
        <Field
          id="description"
          label="Description"
          placeholder="Description"
          type="text"
          onChange={this.onInputChange}
        />
      </Form>
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
        <Button label="Create" className="positive" onClick={this.handleSubmit} />
        <Button label="Cancel" onClick={this.handleCancel} />
      </React.Fragment>
    );
  }

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/" />;

    return (
      <Modal
        header="Create Project"
        content={this.content}
        actionButtons={this.actionButtons}
        history={this.props.history}
        size={MODAL_SIZE.TINY}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, { createProject })(ProjectCreate);
