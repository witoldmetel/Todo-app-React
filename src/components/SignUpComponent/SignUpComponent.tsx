import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import { Auth, NewUser, Credentials } from '../../fixtures/types';
import { ACCOUNT_TYPE, MODAL_SIZE } from '../../fixtures/constants';
import { signUp, signIn } from '../../store/actions';
import { isSingUpFormValid } from '../../utils/validation';
import { Modal, Button, Form, Field } from '../index';

import './SignUpComponent.scss';

export interface Props {
  auth: Auth;
  history: History;

  signUp: (newUser: NewUser, callback: () => void) => void;
  signIn: (credentials: Credentials, calback: (flag?: boolean) => void) => void;
}

export interface State {
  email: string;
  password: string;
  username: string;
  accountType: ACCOUNT_TYPE;
  errorMessage: string;
  [key: string]: unknown;
}

class SignUpComponent extends React.Component<Props, State> {
  state: State = {
    email: '',
    password: '',
    username: '',
    accountType: ACCOUNT_TYPE.REGULAR,
    errorMessage: ''
  };

  private static readonly ACCOUNT_TYPE = [ACCOUNT_TYPE.REGULAR, ACCOUNT_TYPE.VIP];

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ accountType: e.target.value as ACCOUNT_TYPE });
  };

  private get accountTypeFields() {
    return SignUpComponent.ACCOUNT_TYPE.map((accountType) => (
      <Field
        key={accountType}
        fieldClassName="register-account-type"
        label={accountType}
        type="radio"
        name="account"
        value={accountType}
        checked={this.state.accountType === accountType}
        onChange={this.onCheckboxChange}
      />
    ));
  }

  private get content() {
    return (
      <>
        <Form
          initialValues={[this.state.email, this.state.password, this.state.username, this.state.accountType]}
          errorMessage={this.state.errorMessage}
          onSubmit={this.handleSubmit}
        >
          <Field id="email" label="Email" placeholder="joe@schmoe.com" type="email" onChange={this.onInputChange} />
          <Field id="password" label="Password" placeholder="Password" type="password" onChange={this.onInputChange} />
          <Field id="username" label="Username" placeholder="Joe Schmoe" type="text" onChange={this.onInputChange} />
          <div className="inline fields" role="group">
            <label>Account Type:</label>
            {this.accountTypeFields}
          </div>
        </Form>
        <div className="register-note">
          Let&apos;s try <strong>Fire Jira</strong> without registering:
          <Button label="Demo Page" className="demo-button inverted orange" onClick={this.signInToDemoPage} />
        </div>
      </>
    );
  }

  private signInToDemoPage = () => {
    this.props.signIn({ email: 'joedoe@firejira.com', password: 'firejira' }, this.handleCancel);
  };

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
        errorMessage: this.formValidation.errorMessage
      });
    }
  };

  private handleCancel = () => this.props.history.push('/');

  private get actionButtons() {
    return (
      <React.Fragment>
        <Button label="Register" className="positive" onClick={this.handleSubmit} />
        <Button label="Cancel" onClick={this.handleCancel} />
      </React.Fragment>
    );
  }

  public render() {
    const { auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return (
      <Modal
        className="register-form"
        header="Register"
        content={this.content}
        actionButtons={this.actionButtons}
        history={this.props.history}
        size={MODAL_SIZE.TINY}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, { signUp, signIn })(SignUpComponent);
