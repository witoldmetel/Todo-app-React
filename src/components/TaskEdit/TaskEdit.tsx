import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { editTask } from '../../actions';
import {RandomImg} from '../index'

export interface Props {
  id: string;
  title: string;
  status: boolean;
  editTask: () => void;
}

class TaskEdit extends React.Component<Props> {
  state = {
    editText: this.props.title,
    activeEdit: true,
  };

  private onFormSubmit = (title) => {
    this.props.editTask(title, this.props.task.id);
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editText: e.target.value });
  };

  private onCancelClick = () => {
    this.setState({
      editText: this.props.title,
    });

    this.props.history.push('/')
  };

  // private onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (this.state.editText === '') {
  //     this.props.deleteTask(this.props.id);
  //   } else {
  //     this.props.editTask(this.state.editText, this.props.id);
  //     this.setState({ activeEdit: false });
  //   }
  // };

  public render() {
    const id = this.props.match.params.id;
    console.log('TaskEdit -> render -> this.props', this.props);

    return (
      <form className="ui action input" onSubmit={this.onFormSubmit}>
        <div className="task-content">
          <RandomImg randomFace={this.props.id} />
          <input
            type="text"
            className="edit-task-description"
            placeholder={this.props.title}
            value={this.state.editText}
            onChange={this.onInputChange}
          />
        </div>
        <div className="edit-task-buttons">
          <button className="ui button inverted green" title="accept edit" type="submit">
            <i className="fas fa-check"></i>
          </button>
          <button className="ui button inverted red" title="cancel edit" onClick={this.onCancelClick}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { task: state.tasks.find(task => task.id === ownProps.match.params.id };
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      editTask: editTask,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
