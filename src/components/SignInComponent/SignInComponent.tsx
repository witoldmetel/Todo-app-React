import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';

import { Credentials, Auth } from '../../fixtures/types';
import { signIn } from '../../store/actions';
import { Modal, Button } from '../index';

export interface Props {
  auth: Auth;
  authError: string;
  history: History;
  signIn: (credentials: Credentials, calback) => void;
}

class SignInComponent extends React.Component<Props> {
  state = {
    email: '',
    password: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private get errorMessage() {
    return this.props.authError ? <div className="ui red message">{this.props.authError}</div> : null;
  }

  private get content() {
    return (
      <div className="ui form content">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" onChange={this.onInputChange} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" onChange={this.onInputChange} />
        </div>
        {this.errorMessage}
      </div>
    );
  }

  private handleSubmit = () => {
    this.props.signIn(this.state, this.handleCancel);
  };

  private handleCancel = () => {
    this.props.history.push('/');
  };

  private get actionButtons() {
    return (
      <React.Fragment>
        <Button label="Login" className="positive" onClick={this.handleSubmit} />
        <Button label="Cancel" onClick={this.handleCancel} />
      </React.Fragment>
    );
  }

  public render() {
    return (
      <Modal header="Sign In" content={this.content} actionButtons={this.actionButtons} history={this.props.history} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

export default connect(mapStateToProps, { signIn })(SignInComponent);
