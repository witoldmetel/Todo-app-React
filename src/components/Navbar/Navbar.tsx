import React, { Component } from 'react';
import { Link, match } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Links from './Links';
import { Auth } from '../../fixtures/types';
import { DEFAULT } from '../../fixtures/routes';

import './Navbar.scss';

export interface Props {
  auth: Auth;
  history?: unknown;
  location?: unknown;
  match?: match;
}

class Navbar extends Component<Props> {
  private get className() {
    return classnames('ui menu', {
      main: !this.props.auth.uid
    });
  }

  public render() {
    return (
      <header className={this.className}>
        <nav className="ui container">
          <Link to={DEFAULT} className="header item">
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
