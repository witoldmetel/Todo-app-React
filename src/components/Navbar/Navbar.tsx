import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Links from './Links';
import { Auth } from '../../fixtures/types';

import './Navbar.scss';

export interface Props {
  auth: Auth;
}

class Navbar extends Component<Props> {
  private get className() {
    return classnames('ui menu', {
      main: !this.props.auth.uid
    });
  }

  public render() {
    console.log(this.props);
    return (
      <header className={this.className}>
        <nav className="ui container">
          <Link to="/" className="header item">
            <span className="logo" />
            <p className="brand-name">Fire Jira</p>
          </Link>
          <Links {...this.props} />
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
