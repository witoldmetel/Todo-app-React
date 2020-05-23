import React from 'react';
import { Link } from 'react-router-dom';

import Links from './Links';

class Navbar extends React.Component {
  public render() {
    return (
      <header className="ui menu">
        <nav className="ui container">
          <Link to="/" className="header item">
            <img className="logo" src={`https://api.adorable.io/avatars/${Math.random()}.png`} />
            Task List App
          </Link>
          <Links />
        </nav>
      </header>
    );
  }
}

export default Navbar;
