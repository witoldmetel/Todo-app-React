import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth, NewUser } from '../../fixtures/types';
import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { signUp } from '../../store/actions';
import { Modal } from '../index';

export interface Props {
  auth: Auth;
  authError: string;
  history: any;
  signUp: (newUser: NewUser) => void;
}

class SignUpComponent extends React.Component<Props> {
  state = {
    email: '',
    password: '',
    username: '',
    accountType: ACCOUNT_TYPE.REGULAR,
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ accountType: e.target.id });
  };

  private get errorMessage() {
    return this.props.authError ? <div className="ui red message">{this.props.authError}</div> : null;
  }

  private get content() {
    return (
      <div className="ui form content">
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
        <div className="inline fields">
          <label>Account Type:</label>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                id={ACCOUNT_TYPE.REGULAR}
                type="radio"
                name="account"
                checked={this.state.accountType === ACCOUNT_TYPE.REGULAR}
                onChange={this.onCheckboxChange}
              />
              <label>Regular</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                id={ACCOUNT_TYPE.VIP}
                type="radio"
                name="account"
                checked={this.state.accountType === ACCOUNT_TYPE.VIP}
                onChange={this.onCheckboxChange}
              />
              <label>VIP</label>
            </div>
          </div>
        </div>
        {this.errorMessage}
      </div>
    );
  }

  private handleSubmit = (e) => {
    e.preventDefault();

    this.props.signUp(this.state);

    this.props.history.push('/');
  };

  private handleCancel = () => this.props.history.push('/');

  private get actionButtons() {
    return (
      <React.Fragment>
        <button className="ui positive button" onClick={this.handleSubmit}>
          Register
        </button>
        <button className="ui button" onClick={this.handleCancel}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  public render() {
    const { auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return <Modal header="Register" content={this.content} actionButtons={this.actionButtons} />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

export default connect(mapStateToProps, { signUp })(SignUpComponent);
