import React from 'react';
import moment from 'moment';

import './NotificationsContainer.scss';

interface Props {
  authId: string;
  notifications: any;
}

export class NotificationsContainer extends React.Component<Props> {
  private getUserName = (username: string, userId: string) => (userId !== this.props.authId ? username : 'You');
  private formatTime = (time: any) => moment(time.toDate()).fromNow();

  private get notifications() {
    return this.props.notifications
      ? this.props.notifications.map((item) => {
          return (
            <li key={item.id} className="notification-item">
              <span className="notification-item__content">
                <strong>{this.getUserName(item.user, item.authorId)}</strong> {item.content}
              </span>
              <br />
              <span className="notification-item__time">{this.formatTime(item.time)}</span>
            </li>
          );
        })
      : null;
  }

  public render() {
    return (
      <div className="user-panel">
        <h3 className="title">Notifications</h3>
        <ul className="notification-container">{this.notifications}</ul>
      </div>
    );
  }
}
