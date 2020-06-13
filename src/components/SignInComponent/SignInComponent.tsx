import React from 'react';
import { connect } from 'react-redux';

import { Credentials } from '../../fixtures/types';
import { signIn } from '../../store/actions';
import { Modal } from '../index';

export interface Props {
  authError: string;
  history: any;
  signIn: (credentials: Credentials) => void;
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
    this.props.signIn(this.state);

    this.props.history.push('/');
  };

  private handleCancel = () => this.props.history.push('/');

  private get actionButtons() {
    return (
      <React.Fragment>
        <button className="ui positive button" onClick={this.handleSubmit}>
          Login
        </button>
        <button className="ui button" onClick={this.handleCancel}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  public render() {
    return <Modal header="Sign In" content={this.content} actionButtons={this.actionButtons} />;
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

export default connect(mapStateToProps, { signIn })(SignInComponent);
