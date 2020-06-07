import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

import { Task, Auth } from '../../../fixtures/types';
import { getTask, updateTask } from '../../../store/actions';
import { RandomAvatar } from '../../index';

export interface Props {
  projectId: string;
  id: string;
  task: Task;
  auth: Auth;
  history: any;
  getTask: (id: string, projectId: string) => void;
  updateTask: (task: Task, id: string, projectId: string) => void;
}

class TaskEdit extends React.Component<Props> {
  state = {
    title: this.props.task?.title || '',
    description: this.props.task?.description || '',
  };

  public componentDidMount() {
    this.props.getTask(this.props.id, this.props.projectId);
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.task !== this.props.task && prevProps.task === null) {
      this.setState({
        title: this.props.task.title,
        description: this.props.task.description,
      });
    }
  }

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onConfirmClick = () => {
    if (this.state.title.trim() !== '' && this.state.description.trim()) {
      this.props.updateTask(this.state, this.props.id, this.props.projectId);
      this.setState({ title: '', description: '' });
    }

    this.props.history.goBack();
  };

  private onCancelClick = () => this.props.history.goBack();

  private get content() {
    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Edit Task</div>
          <div className="content">
            <RandomAvatar randomFace={this.props.id} />
            <form className="ui form">
              <div className="field">
                <label>Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="task title"
                  value={this.state.title}
                  onChange={this.onInputChange}
                />
              </div>
              <div className="field">
                <label>Label</label>
                <input
                  type="text"
                  id="description"
                  placeholder="description"
                  value={this.state.description}
                  onChange={this.onInputChange}
                />
              </div>
            </form>
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
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return !this.props.task ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading task</div>
      </div>
    ) : (
      this.content
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectPathname = ownProps.location.pathname;
  //@todo: Refactoring this
  const projectId = projectPathname.substring(0, projectPathname.lastIndexOf('/task')).replace('/project/', '');
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : null;

  return {
    projectId,
    task,
    id,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect((props: any) => {
    const projectPathname = props.location.pathname;
    //@todo: Refactoring this
    const projectId = projectPathname.substring(0, projectPathname.lastIndexOf('/task')).replace('/project/', '');

    return [
      {
        collection: 'projects',
        doc: projectId,
        subcollections: [{ collection: 'tasks' }],
        storeAs: 'tasks',
      },
    ];
  }),
  connect(mapStateToProps, { getTask, updateTask }),
)(TaskEdit);
