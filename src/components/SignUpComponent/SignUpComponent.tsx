import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth, NewUser } from '../../fixtures/types';
import { ACCOUNT_TYPE, MODAL_SIZE } from '../../fixtures/constants';
import { signUp } from '../../store/actions';
import { isSingUpFormValid } from '../../utils/validation';
import { Modal, Button, Form, Field } from '../index';

export interface Props {
  auth: Auth;
  history: History;

  signUp: (newUser: NewUser, callback) => void;
}

export interface State {
  email: string;
  password: string;
  username: string;
  accountType: ACCOUNT_TYPE;
  errorMessage: string;
  [key: string]: string;
}

class SignUpComponent extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    username: '',
    accountType: ACCOUNT_TYPE.REGULAR,
    errorMessage: ''
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value } as State);
  };

  private onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ accountType: e.target.id as ACCOUNT_TYPE });
  };

  private get content() {
    return (
      <Form
        initialValues={[this.state.email, this.state.password, this.state.username]}
        errorMessage={this.state.errorMessage}
        onSubmit={this.handleSubmit}
      >
        <Field id="email" label="Email" placeholder="joe@schmoe.com" type="email" onChange={this.onInputChange} />
        <Field id="password" label="Password" placeholder="Password" type="password" onChange={this.onInputChange} />
        <Field id="username" label="Username" placeholder="Joe Schmoe" type="text" onChange={this.onInputChange} />
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
      </Form>
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

export default connect(mapStateToProps, { signUp })(SignUpComponent);
