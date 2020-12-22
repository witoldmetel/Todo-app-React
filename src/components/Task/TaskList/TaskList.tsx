import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Pagination, PaginationProps } from 'semantic-ui-react';
import classnames from 'classnames';

import { getProject } from '../../../store/actions';
import { getTasksSelector } from '../../../store/selectors';
import { Task, Project, Auth, Notification } from '../../../fixtures/types';
import { FILTERS } from '../../../fixtures/constants';
import { TaskItem, FilterBar, SearchBar, NotificationsContainer } from '../../index';

import './TaskList.scss';

export interface Props {
  projectId: string;
  project: Project;
  allTasks: Task[];
  tasks: Task[];
  auth: Auth;
  notifications: Notification[];
  filters: FILTERS;
  searchValue: string;

  getProject: (id: string) => void;
}

class TaskList extends React.Component<Props> {
  private static FIRST_ITEM_INDEX = 0;
  private static LAST_ITEM_INDEX = 8;

  state = {
    activePage: 1,
    firstActiveItemIndex: TaskList.FIRST_ITEM_INDEX,
    lastActiveItemIndex: TaskList.LAST_ITEM_INDEX
  };

  public componentDidMount() {
    this.props.getProject(this.props.projectId);
  }

  public componentDidUpdate(prevProps: Props) {
    const { filters, searchValue } = this.props;

    if (filters !== prevProps.filters || (searchValue && searchValue !== prevProps.searchValue)) {
      this.setState({
        activePage: 1,
        firstActiveItemIndex: TaskList.FIRST_ITEM_INDEX,
        lastActiveItemIndex: TaskList.LAST_ITEM_INDEX
      });
    }
  }

  private get className() {
    return classnames('list', {
      empty: !this.props.tasks?.length
    });
  }

  private get emptyList() {
    return !this.props.allTasks.length ? (
      <React.Fragment>
        <h3 className="info">You have no task to do! Add first here:</h3>
        <Link className="add-icon" to={`/project/${this.props.projectId}/task/new`}>
          <i className="plus circle icon green" />
        </Link>
      </React.Fragment>
    ) : (
      <h3 className="info">Filtered list is empty</h3>
    );
  }

  private get renderList() {
    if (!this.props.tasks) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading tasks</div>
        </div>
      );
    }

    return !this.props.tasks.length
      ? this.emptyList
      : this.props.tasks
          .slice(this.state.firstActiveItemIndex, this.state.lastActiveItemIndex)
          .map((task: Task, index: number) => {
            return <TaskItem key={index} task={task} project={this.props.project} projectId={this.props.projectId} />;
          });
  }

  private get membersButton() {
    const { auth, project } = this.props;

    return auth.uid === project.authorId ? (
      <Link className="ui vertical animated button members" to={`/project/${this.props.projectId}/members`}>
        <div className="hidden content">Members</div>
        <div className="visible content">
          <i className="users icon" />
        </div>
      </Link>
    ) : null;
  }

  private handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement>, { activePage }: PaginationProps) => {
    this.setState({ activePage });
    this.setState({
      firstActiveItemIndex: (activePage as number) * TaskList.LAST_ITEM_INDEX - TaskList.LAST_ITEM_INDEX
    });
    this.setState({ lastActiveItemIndex: (activePage as number) * TaskList.LAST_ITEM_INDEX });
  };

  private get pagination() {
    if (this.props.tasks) {
      const totalPages = Math.ceil(this.props.tasks.length / TaskList.LAST_ITEM_INDEX);

      return totalPages > 1 ? (
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
        />
      ) : null;
    } else {
      return null;
    }
  }

  public render() {
    const { auth, notifications } = this.props;

    if (!auth.uid) return <Redirect to="/" />;

    return !this.props.project ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading project</div>
      </div>
    ) : (
      <React.Fragment>
        <h1>{this.props.project.projectName}</h1>
        <div className="dashboard">
          <div className="tasks-container">
            <div className="action-panel">
              {this.membersButton}
              <FilterBar />
              <SearchBar />
            </div>
            <ul className={this.className}>{this.renderList}</ul>
            {this.pagination}
          </div>
          <NotificationsContainer authId={auth.uid} notifications={notifications} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[projectId] : null;

  return {
    project,
    projectId,
    auth: state.firebase.auth,
    allTasks: state.firestore.ordered.tasks,
    tasks: getTasksSelector(state),
    notifications: state.firestore.ordered.notifications,
    filters: state.filters,
    searchValue: state.searchValue
  };
};

export default compose(
  firestoreConnect((props: any) => {
    return [
      {
        collection: 'projects',
        doc: props.match.params.id,
        subcollections: [{ collection: 'tasks' }],
        storeAs: 'tasks',
        orderBy: ['updatedAt', 'desc']
      },
      {
        collection: 'notifications',
        orderBy: ['time', 'desc'],
        limit: 10
      }
    ];
  }),
  connect(mapStateToProps, { getProject })
)(TaskList);
