import React from 'react';

import './UserPanel.scss';

export default class UserPanel extends React.Component {
  public render() {
    // @todo: Feature flag: Implement after firebase functions
    return false ? <div className="user-panel">Notifications</div> : null;
  }
}
