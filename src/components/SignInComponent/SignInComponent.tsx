import React from 'react';
import { connect } from 'react-redux';

import { Credentials } from '../../fixtures/types';
import { signIn } from '../../store/actions';

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

  private onLoginClick = () => {
    this.props.signIn(this.state);

    this.props.history.push('/');
  };

  private onCancelClick = () => this.props.history.push('/');

  private get errorMessage() {
    return this.props.authError ? <div className="ui red message">{this.props.authError}</div> : null;
  }

  private get content() {
    return (
      <form className="ui form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" onChange={this.onInputChange} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" onChange={this.onInputChange} />
        </div>
        {this.errorMessage}
      </form>
    );
  }

  public render() {
    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Sign Up</div>
          <div className="content">{this.content}</div>
          <div className="actions">
            <button className="ui positive button" onClick={this.onLoginClick}>
              Login
            </button>
            <button className="ui button" onClick={this.onCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

export default connect(mapStateToProps, { signIn })(SignInComponent);
