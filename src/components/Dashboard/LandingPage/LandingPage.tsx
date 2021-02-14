import React from 'react';
import { NavLink } from 'react-router-dom';
import { Transition } from 'semantic-ui-react';

import { ParticleComponent, Form, Field } from '../../index';
import background from '../../../assets/graphics/sky.webp';
import mainImage from '../../../assets/graphics/main.webp';
import crudImage from '../../../assets/graphics/crud.webp';
import inviteImage from '../../../assets/graphics/invite.webp';

import './LandingPage.scss';

export class LandingPage extends React.Component {
  state = { visible: false };

  public componentDidMount() {
    this.setState({ visible: true });
  }

  private get infoSection() {
    return (
      <Transition visible={this.state.visible} animation="scale" duration={500}>
        <section className="info-section">
          <h1 className="title">
            Make Your Own <span className="subtitle">Workflow</span>
          </h1>
          <p className="content">
            Welcome on <span className="subtitle">Fire Jira</span>. Track and manage projects in real time. Register and
            check it now!
          </p>
          <NavLink to="/signup" className="register item">
            Register
          </NavLink>
        </section>
      </Transition>
    );
  }

  private get aboutSection() {
    return (
      <section className="about-section">
        <div className="left-column">
          <img className="picture" alt="main view of app" src={mainImage} />
        </div>
        <div className="right-column">
          <small className="small-title">About application</small>
          <h3 className="title">Is it for me?</h3>
          <p className="content">
            When you have to shift through stacked email threads for design approvals, collaborating within the team
            becomes tough. Therefore, Kanban is meant to cut the amount of time spent on managing projects because any
            professional should spend their time doing their work and not managing.
          </p>
          <ul className="list">
            <li className="item">
              <i className="fire icon" />
              <h4 className="item-name">It helps visualize the actual workflow</h4>
            </li>
            <li className="item">
              <i className="fire icon" />
              <h4 className="item-name">It balances the work and workflow</h4>
            </li>
            <li className="item">
              <i className="fire icon" />
              <h4 className="item-name">It encourages leadership roles at all levels</h4>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  private get functionalitySection() {
    return (
      <section className="functionality-section">
        <div className="ramp-container" style={{ backgroundColor: '#0f1219' }} />
        <div className="top-card">
          <h2 className="title">Fire Jira Super Powers</h2>
          <p className="content">
            As a Fire Jira user, I can easily manage my tasks (adding, editing and removing). To track progress, you can
            use filters and check which tasks are done. We can easily find tasks using the search bar. Additionally, as
            a project creator, you can decide who will be part of your project as a team member.
          </p>
        </div>
        <div className="pictures">
          <div className="picture-container">
            <img className="picture" alt="manage view of tasks" src={crudImage} height="375" width="500" />
            <h5 className="title">Crate/Edit/Remove</h5>
            <p className="description">You can easily manage your tasks and projects</p>
          </div>
          <div className="picture-container">
            <img className="picture" alt="members modal" src={inviteImage} height="375" width="500" />
            <h5 className="title">Invite</h5>
            <p className="description">You can add new members to your project</p>
          </div>
        </div>
      </section>
    );
  }

  private get contactSection() {
    return (
      <section className="contact-section">
        <div className="ramp-container" style={{ backgroundColor: '#e2e8f0' }} />
        <div className="top-card">
          <h2 className="title">Contact Me</h2>
        </div>
        <div className="contact-form">
          <div className="contact-info">
            <h4 className="title">Have some questions?</h4>
            <p className="content">Complete this form and we will get back to you in 24 hours.</p>
          </div>
          <Form initialValues={{}} onSubmit={() => console.log('submit')}>
            <Field id="name" label="Name" placeholder="Name" onChange={(e) => console.log(e.target.value)} disabled />
            <Field
              id="email"
              label="Email"
              placeholder="Email"
              onChange={(e) => console.log(e.target.value)}
              disabled
            />
            <label htmlFor="message">Message</label>
            <textarea
              className="text-area"
              id="message"
              placeholder="Type a message..."
              onChange={(e) => console.log(e.target.value)}
              disabled
            />
            <div className="contact-form-button">
              <button className="disabled">Send Message</button>
            </div>
          </Form>
        </div>
      </section>
    );
  }

  private get footer() {
    return (
      <footer className="footer">
        <div className="ramp-container" style={{ backgroundColor: '#0f1219' }} />
        <div className="content">
          <h4 className="title">Follow me on social media</h4>
          <h5 className="subtitle">Find me on any of these platforms, I respond 1-2 business days :)</h5>
          <div className="buttons">
            <a
              href="https://github.com/witoldmetel"
              target="_blank"
              rel="noopener"
              className="item"
              aria-label="github icon with link to github profile"
            >
              <i className="github icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/witoldmetel"
              target="_blank"
              rel="noopener"
              className="item"
              aria-label="linkedin icon with link to linkedin profile"
            >
              <i className="linkedin icon" />
            </a>
            <span className="item disabled">
              <i className="twitter icon" />
            </span>
            <span className="item disabled">
              <i className="instagram icon" />
            </span>
          </div>
        </div>
        <div className="ui inverted divider" />
        <div className="copyright-label">Copyright © witoldmetel</div>
      </footer>
    );
  }

  public render() {
    return (
      <div className="dashboard">
        <div className="particles-section">
          <ParticleComponent />
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'right',
              backgroundSize: 'cover',
              position: 'absolute',
              opacity: 0.75,
              zIndex: 1,
              height: '100%',
              width: '100%',
              top: 0,
              left: 0
            }}
          />
        </div>
        {this.infoSection}
        {this.aboutSection}
        {this.functionalitySection}
        {this.contactSection}
        {this.footer}
      </div>
    );
  }
}
