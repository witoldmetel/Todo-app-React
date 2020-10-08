import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { Auth, Project, NewUser, User } from '../../fixtures/types';
import { ProjectList, ParticleComponent } from '../index';

import './Dashboard.scss';

export interface Props {
  auth: Auth;
  profile: NewUser;
  projects: Project[];
}

class Dashboard extends React.Component<Props> {
  private get infoContainer() {
    return (
      <section className="info-container">
        <h1 className="title">
          Make Your Own <span className="sub-title">Workflow</span>
        </h1>
        <p className="content">
          Welcome on Fire Jira. Track and manage projects in real time. Register and check it now!
        </p>
        <button disabled>Register</button>
      </section>
    );
  }

  private get aboutContainer() {
    return (
      <section className="about-container">
        <div className="left-column">
          <img
            className="picture"
            src="https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          />
        </div>
        <div className="right-column">
          <small className="small-title">About application</small>
          <h3 className="title">Core functionality</h3>
          <p className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rerum quae provident, ad praesentium
            ipsam eaque dolore consequatur quos veniam cum. Rem delectus, adipisci sunt similique consequuntur
            voluptatem dignissimos corrupti.
          </p>
          <ul className="list">
            <li className="item">
              <i className="fire icon" />
              <h4 className="item-name">item 1</h4>
            </li>
            <li className="item">
              <i className="fire icon" />
              <h4 className="item-name">item 2</h4>
            </li>
            <li className="item">
              <i className="fire icon" />
              <h4 className="item-name">item 3</h4>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  private get landingPage() {
    return (
      <div className="dashboard">
        <div className="particles-container">
          <ParticleComponent />
        </div>
        {this.infoContainer}
        {this.aboutContainer}
      </div>
    );
  }

  private get emptyContent() {
    return this.props.profile.accountType === ACCOUNT_TYPE.REGULAR
      ? 'Project list is empty. You are not assign to any project'
      : 'Project list is empty. Create new project';
  }

  private get isUserHasProject() {
    const { auth, projects } = this.props;

    return projects.some((project) => (project.members as User[]).some((member) => member.id === auth.uid));
  }

  public render() {
    const { auth } = this.props;

    if (auth.uid) {
      if (!isLoaded(this.props?.projects)) {
        return (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading page...</div>
          </div>
        );
      }

      if (this.isUserHasProject) {
        return (
          <React.Fragment>
            <h1>Projects List</h1>
            <div className="dashboard">
              <ProjectList authId={auth.uid} />
            </div>
          </React.Fragment>
        );
      } else {
        return <div className="dashboard">{this.emptyContent}</div>;
      }
    } else {
      return this.landingPage;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.firestore.ordered.projects
  };
};

export default compose(firestoreConnect([{ collection: 'projects' }]), connect(mapStateToProps))(Dashboard);
