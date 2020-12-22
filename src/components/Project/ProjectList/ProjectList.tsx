import React from 'react';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import { getProjects } from '../../../store/actions';
import { ACCOUNT_TYPE } from '../../../fixtures/constants';
import { Project, NewUser, User } from '../../../fixtures/types';
import { ProjectItem } from '../index';

import './ProjectList.scss';

export interface Props {
  authId: string;
  profile: NewUser;
  projects: Project[];
  getProjects: (projects?: Project[]) => void;
}

class ProjectList extends React.Component<Props> {
  /**
   * definite assignment assertion
   * https://www.stevefenton.co.uk/2018/01/typescript-definite-assignment-assertions/
   */
  private containerRef!: React.RefObject<HTMLDivElement>;

  public componentDidMount() {
    this.containerRef = React.createRef<HTMLDivElement>();

    this.props.getProjects();
  }

  private get projects() {
    return this.props.projects.filter((project) =>
      (project.members as User[]).some((member) => member.id === this.props.authId)
    );
  }

  private get emptyContent() {
    return this.props.profile.accountType === ACCOUNT_TYPE.REGULAR
      ? 'Project list is empty. You are not assign to any project'
      : 'Project list is empty. Create new project';
  }

  private get renderList() {
    return !this.projects.length
      ? this.emptyContent
      : this.projects.map((project: Project, index: number) => {
          return <ProjectItem key={index} project={project} />;
        });
  }

  private handleScroll = () => {
    const { scrollTop, offsetHeight, scrollHeight } = this.containerRef.current ?? {
      scrollTop: 0,
      offsetHeight: 0,
      scrollHeight: 0
    };

    if (scrollTop + offsetHeight >= scrollHeight) {
      this.props.getProjects(this.props.projects);
    }
  };

  public render() {
    if (!isLoaded(this.props?.projects)) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading page...</div>
        </div>
      );
    }

    return (
      <div className="projects-container" ref={this.containerRef} onScroll={this.handleScroll}>
        {this.renderList}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    projects: state.projects.projects
  };
};

export default connect(mapStateToProps, { getProjects })(ProjectList);
