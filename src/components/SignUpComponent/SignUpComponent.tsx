import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth, NewUser } from '../../fixtures/types';
import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { signUp } from '../../store/actions';
import { isSingUpFormValid } from '../../utils/validation';
import { Modal } from '../index';

export interface Props {
  auth: Auth;
  history: any;
  signUp: (newUser: NewUser, callback) => void;
}

export interface State {
  email: string;
  password: string;
  username: string;
  accountType: ACCOUNT_TYPE;
  errorMessage: string;
}

class SignUpComponent extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    username: '',
    accountType: ACCOUNT_TYPE.REGULAR,
    errorMessage: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value } as any);
  };

  private onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ accountType: e.target.id as ACCOUNT_TYPE });
  };

  private get errorMessage() {
    return this.state.errorMessage ? <div className="ui red message">{this.state.errorMessage}</div> : null;
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
          <input type="password" id="password" placeholder="password" onChange={this.onInputChange} />
        </div>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Joe Schmoe" onChange={this.onInputChange} />
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

  private get formValidation() {
    const { email, password, username } = this.state;

    return isSingUpFormValid({ email, password, username });
  }

  private handleSubmit = () => {
    const { email, password, username, accountType } = this.state;

    if (this.formValidation.isValid) {
      this.props.signUp({ email, password, username, accountType }, this.handleCancel);
    } else {
      this.setState({
        errorMessage: this.formValidation.errorMessage,
      });
    }
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

    return (
      <Modal header="Register" content={this.content} actionButtons={this.actionButtons} history={this.props.history} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, { signUp })(SignUpComponent);
