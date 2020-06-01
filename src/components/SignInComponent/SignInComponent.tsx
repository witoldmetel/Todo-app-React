import React from 'react';
import { connect } from 'react-redux';

import { SignIn } from '../../store/actions';

export interface Props {
  history: any;
  signIn: (credentials: any) => void;
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
    if (this.state.email.trim() !== '' && this.state.password.trim()) {
      this.props.signIn(this.state);
      this.setState({ email: '', password: '' });
    }

    this.props.history.push('/');
  };

  private onCancelClick = () => this.props.history.push('/');

  private get content() {
    return (
      <form className="ui form">
        <div className="field">
          <label>email</label>
          <input type="text" name="email" placeholder="Email" onChange={this.onInputChange} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={this.onInputChange} />
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credendials) => dispatch(SignIn),
  };
};

export default connect(null, mapDispatchToProps)(SignInComponent);
