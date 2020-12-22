import React from 'react';

import { formatTimeFromNow } from '../../utils/helpers';
import { Notification } from '../../fixtures/types';

import './NotificationsContainer.scss';

interface Props {
  authId: string;
  notifications: Notification[];
}

export class NotificationsContainer extends React.Component<Props> {
  private getUserName = (username: string, userId: string) => (userId !== this.props.authId ? username : 'You');

  private get notifications() {
    return this.props.notifications
      ? this.props.notifications.map((item) => {
          return (
            <li key={item.id} className="notification-item">
              <span className="notification-item__content">
                <strong>{this.getUserName(item.user, item.authorId)}</strong> {item.content}
              </span>
              <br />
              <span className="notification-item__time">{formatTimeFromNow(item.time)}</span>
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
