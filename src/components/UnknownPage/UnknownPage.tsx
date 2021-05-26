import React from 'react';
import { Link } from 'react-router-dom';

import { DEFAULT } from '../../fixtures/routes';

import './UnknownPage.scss';

const UnknownPage = () => {
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
          Let&#39;s go <Link to={DEFAULT}>back</Link>
        </p>
      </div>
    </div>
  );
};

export default UnknownPage;
