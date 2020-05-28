import React from 'react';

export default class SignUpComponent extends React.Component {
  private get content() {
    return (
      <form className="ui form">
        <div className="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="field">
          <label>E-mail</label>
          <input type="email" placeholder="joe@schmoe.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
      </form>
    );
  }

  private onCancelClick = () => this.props.history.push('/');

  public render() {
    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Sign Up</div>
          <div className="content">{this.content}</div>
          <div className="actions">
            <button className="ui positive button">Submit</button>
            <button className="ui button" onClick={this.onCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
