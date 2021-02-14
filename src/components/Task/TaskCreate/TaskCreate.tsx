import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Task, Auth } from '../../../fixtures/types';
import { MODAL_SIZE } from '../../../fixtures/constants';
import { createTask } from '../../../store/actions';
import { Modal, Button, Form, Field } from '../../index';

export interface Props {
  match: {
    params: {
      id: string;
    };
  };
  auth: Auth;
  history: History;

  createTask: (task: Task, projectId: string, callback: () => void) => void;
}

export interface State {
  title: string;
  description: string;
  errorMessage: string;
  [key: string]: unknown;
}

class TaskCreate extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    errorMessage: ''
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private get content() {
    return (
      <Form
        initialValues={[this.state.title, this.state.description]}
        errorMessage={this.state.errorMessage}
        onSubmit={this.handleSubmit}
      >
        <Field id="title" label="Title" placeholder="task title" type="text" onChange={this.onInputChange} />
        <Field
          id="description"
          label="Description"
          placeholder="description"
          type="text"
          onChange={this.onInputChange}
        />
      </Form>
    );
  }

  private handleSubmit = () => {
    if (this.state.title.trim().length && this.state.description.trim().length) {
      this.props.createTask(this.state, this.props.match.params.id, this.handleCancel);
    } else {
      this.setState({ errorMessage: 'Task fields are empty' });
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
        header="Create Task"
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

export default connect(mapStateToProps, { createTask })(TaskCreate);
