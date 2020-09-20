import React from 'react';
import { Link } from 'react-router-dom';

import './UnknownPage.scss';

export class UnknownPage extends React.Component {
  render() {
    return (
      <div className="unknown-page">
        <div className="container">
          <div className="logo-container">
            <p>4</p>
            <span className="logo" />
            <p>4</p>
          </div>
          <p>Nice try! That was one in a million.</p>
          <p>
            Let&#39;s get you <Link to="/">back</Link>
          </p>
        </div>
      </div>
    );
  }
}
