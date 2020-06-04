import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth } from '../../fixtures/types';
import { signUp } from '../../store/actions';

export interface Props {
  auth: Auth;
  authError: string;
  history: any;
  signUp: (newUser: any) => void;
}

class SignUpComponent extends React.Component<Props> {
  state = {
    email: '',
    password: '',
    username: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onSubmitClick = (e) => {
    e.preventDefault();

    this.props.signUp(this.state);
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
          <input type="email" id="email" placeholder="joe@schmoe.com" onChange={this.onInputChange} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" onChange={this.onInputChange} />
        </div>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="joe schmoe" onChange={this.onInputChange} />
        </div>
        {this.errorMessage}
      </form>
    );
  }

  public render() {
    const { auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Sign Up</div>
          <div className="content">{this.content}</div>
          <div className="actions">
            <button className="ui positive button" onClick={this.onSubmitClick}>
              Submit
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
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

export default connect(mapStateToProps, { signUp })(SignUpComponent);
