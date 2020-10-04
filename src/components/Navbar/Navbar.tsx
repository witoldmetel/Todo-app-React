import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Links from './Links';

import './Navbar.scss';

export default class Navbar extends Component {
  public render() {
    return (
      <header className="ui menu">
        <nav className="ui container">
          <Link to="/" className="header item">
            <span className="logo" />
            <p>Fire Jira</p>
          </Link>
          <Links {...this.props} />
        </nav>
      </header>
    );
  }
}
