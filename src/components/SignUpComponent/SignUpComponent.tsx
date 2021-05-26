import React, { ChangeEvent, useState } from 'react';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Auth, NewUser, Credentials } from '../../fixtures/types';
import { ACCOUNT_TYPE, MODAL_SIZE } from '../../fixtures/constants';
import { DEFAULT } from '../../fixtures/routes';
import { signUp, signIn } from '../../store/actions';
import { isSingUpFormValid } from '../../utils/validation';
import { Modal, Button, Form, Field } from '../index';

import './SignUpComponent.scss';

const SignUpComponent = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.REGULAR);
  const [errorMessage, setErrorMessage] = useState('');

  const onInputEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onInputPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onInputUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountType(e.target.value as ACCOUNT_TYPE);
  };

  const getAccountTypeFields = () => {
    return [ACCOUNT_TYPE.REGULAR, ACCOUNT_TYPE.VIP].map((type) => (
      <Field
        key={type}
        fieldClassName="register-account-type"
        label={type}
        type="radio"
        name="account"
        value={type}
        checked={accountType === type}
        onChange={onCheckboxChange}
      />
    ));
  };

  const getFormValidation = () => isSingUpFormValid({ email, password, username });

  const handleCancel = () => {
    history.push('/');
  };

  const handleSubmit = () => {
    if (getFormValidation().isValid) {
      // this.props.signUp({ email, password, username, accountType }, handleCancel);
    } else {
      setErrorMessage(getFormValidation().errorMessage);
    }
  };

  const signInToDemoPage = () => {
    // this.props.signIn({ email: 'joedoe@firejira.com', password: 'firejira' }, handleCancel);
  };

  const getContent = () => {
    return (
      <>
        <Form
          initialValues={[email, password, username, accountType]}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
        >
          <Field id="email" label="Email" placeholder="joe@schmoe.com" type="email" onChange={onInputEmailChange} />
          <Field
            id="password"
            label="Password"
            placeholder="Password"
            type="password"
            onChange={onInputPasswordChange}
          />
          <Field id="username" label="Username" placeholder="Joe Schmoe" type="text" onChange={onInputUsernameChange} />
          <div className="inline fields" role="group">
            <label>Account Type:</label>
            {getAccountTypeFields()}
          </div>
        </Form>
        <div className="register-note">
          Let&apos;s try <strong>Fire Jira</strong> without registering:
          <Button label="Demo Page" className="demo-button inverted orange" onClick={signInToDemoPage} />
        </div>
      </>
    );
  };

  const getActionButtons = () => {
    return (
      <>
        <Button label="Register" className="positive" onClick={handleSubmit} />
        <Button label="Cancel" onClick={handleCancel} />
      </>
    );
  };

  // const { auth } = this.props;

  // if (auth.uid) return <Redirect to={DEFAULT} />;

  return (
    <Modal
      className="register-form"
      header="Register"
      content={getContent()}
      actionButtons={getActionButtons()}
      history={history}
      size={MODAL_SIZE.TINY}
    />
  );
};

export default SignUpComponent;
