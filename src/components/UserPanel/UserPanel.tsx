import React from 'react';
import moment from 'moment';

import './UserPanel.scss';

interface Props {
  notifications: any;
}

export default class UserPanel extends React.Component<Props> {
  public render() {
    return (
      <div className="user-panel">
        <ul className="notification-container">
          {this.props.notifications &&
            this.props.notifications.map((item) => {
              return (
                <li key={item.id}>
                  <span>{item.user}</span>
                  <span>{item.content}</span>
                  <span>{moment(item.time.toDate()).fromNow()}</span>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
