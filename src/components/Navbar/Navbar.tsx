import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../public/assets/logo.png';
import Links from './Links';

export default class Navbar extends React.Component {
  public render() {
    return (
      <header className="ui menu">
        <nav className="ui container">
          <Link to="/" className="header item">
            <img className="logo" src={logo} />
            Task List App
          </Link>
          <Links />
        </nav>
      </header>
    );
  }
}
