import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { Auth, Project, NewUser, User } from '../../fixtures/types';
import { ProjectList, ParticleComponent, Form, Field } from '../index';

import './Dashboard.scss';

export interface Props {
  auth: Auth;
  profile: NewUser;
  projects: Project[];
}

class Dashboard extends React.Component<Props> {
  private get infoSection() {
    return (
      <section className="info-section">
        <h1 className="title">
          Make Your Own <span className="subtitle">Workflow</span>
        </h1>
        <p className="content">
          Welcome on Fire Jira. Track and manage projects in real time. Register and check it now!
        </p>
        <button disabled>Register</button>
      </section>
    );
  }

  private get aboutSection() {
    return (
      <section className="about-section">
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

  private get functionalitySection() {
    return (
      <section className="functionality-section">
        <div className="top-card">
          <h2 className="title">Another funtionality</h2>
          <p className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, ex. Facere, magni? Iure est rem saepe
            ullam, deserunt pariatur, obcaecati, ea doloremque delectus quia laudantium nam suscipit nobis quidem
            dolore!
          </p>
        </div>
        <div className="pictures">
          <div className="picture-container">
            <img
              alt="..."
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              className="picture"
            />
            <h5 className="title">Mr Rogers</h5>
            <p className="description">Neighborhood Watchman</p>
          </div>
          <div className="picture-container">
            <img
              alt="..."
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              className="picture"
            />
            <h5 className="title">Mr Rogers</h5>
            <p className="description">Neighborhood Watchman</p>
          </div>
          <div className="picture-container">
            <img
              alt="..."
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              className="picture"
            />
            <h5 className="title">Mr Rogers</h5>
            <p className="description">Neighborhood Watchman</p>
          </div>
        </div>
      </section>
    );
  }

  private get contactSection() {
    return (
      <section className="contact-section">
        <div className="top-card">
          <h2 className="title">Contact Us</h2>
          <p className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit atque aut provident eaque corporis,
            veritatis laborum aliquam? Id voluptate earum, soluta eius iusto distinctio dolor voluptatibus optio eum,
            illo reiciendis?
          </p>
        </div>
        <div className="contact-form">
          <div className="contact-info">
            <h4 className="title">Want to work with us?</h4>
            <p className="content">Complete this form and we will get back to you in 24 hours.</p>
          </div>
          <Form initialValues={{}} onSubmit={() => console.log('submit')}>
            <Field id="name" label="Name" placeholder="Name" onChange={(e) => console.log(e.target.value)} />
            <Field id="email" label="Email" placeholder="Email" onChange={(e) => console.log(e.target.value)} />
            <label htmlFor="message">Message</label>
            <textarea
              className="text-area"
              id="message"
              placeholder="Type a message..."
              onChange={(e) => console.log(e.target.value)}
            />
            <div className="contact-form-button">
              <button disabled>Send Message</button>
            </div>
          </Form>
        </div>
      </section>
    );
  }

  private get footer() {
    return (
      <footer className="footer">
        <div className="content">
          <h4 className="title">Follow me on social media</h4>
          <h5 className="subtitle">Find me on any of these platforms, I respond 1-2 business days :)</h5>
          <div className="buttons">
            <li className="item">
              <i className="fire icon" />
            </li>
            <li className="item">
              <i className="fire icon" />
            </li>
            <li className="item">
              <i className="fire icon" />
            </li>
          </div>
        </div>
        <div className="ui inverted divider" />
        <div className="copyright-label">Copyright © witoldmetel</div>
      </footer>
    );
  }

  private get landingPage() {
    return (
      <div className="dashboard">
        <div className="particles-section">
          <ParticleComponent />
        </div>
        {this.infoSection}
        {this.aboutSection}
        {this.functionalitySection}
        {this.contactSection}
        {this.footer}
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
