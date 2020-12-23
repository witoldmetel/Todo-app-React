import { isEmailValid, isPasswordValid, isUsernameValid, isSingUpFormValid } from './validation';

describe('Email', () => {
  it('is invalid', () => {
    const emailValidation = isEmailValid('firebase');

    expect(emailValidation).toBeFalsy();
  });

  it('is valid', () => {
    const emailValidation = isEmailValid('firebase@gmail.com');

    expect(emailValidation).toBeTruthy();
  });
});

describe('Password', () => {
  it('is invalid', () => {
    const passwordValidation = isPasswordValid('firebase');

    expect(passwordValidation).toBeFalsy();
  });

  it('is valid', () => {
    const passwordValidation = isPasswordValid('Firebase123.');

    expect(passwordValidation).toBeTruthy();
  });
});

describe('UserName', () => {
  it('is invalid', () => {
    const userNameValidation = isUsernameValid('firebase.!');

    expect(userNameValidation).toBeFalsy();
  });

  it('is valid', () => {
    const userNameValidation = isUsernameValid('Firebase123');

    expect(userNameValidation).toBeTruthy();
  });
});
