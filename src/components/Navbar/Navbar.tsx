import React from 'react';
import { Link } from 'react-router-dom';

import Links from './Links';

import './Navbar.scss';

export default class Navbar extends React.Component {
  private logo = require('../../../public/assets/logo.png');

  public render() {
    return (
      <header className="ui menu">
        <nav className="ui container">
          <Link to="/" className="header item">
            <img className="logo" src={this.logo} />
            <p>Fire Jira</p>
          </Link>
          <Links {...this.props} />
        </nav>
      </header>
    );
  }
}
