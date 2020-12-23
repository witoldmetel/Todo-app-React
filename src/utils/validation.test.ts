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

describe('SignUp Form', () => {
  it('is empty', () => {
    const formData = { email: '', password: '', username: '' };
    const signUpValidation = isSingUpFormValid(formData);

    const result = { errorMessage: 'Fill empty fields' };

    expect(signUpValidation.isValid).toBeFalsy();
    expect(signUpValidation.errorMessage).toEqual(result.errorMessage);
  });

  it('has incorrect email', () => {
    const formData = { email: 'firebase', password: 'Firebase123.', username: 'FirebaseAdmin' };
    const signUpValidation = isSingUpFormValid(formData);

    const result = { errorMessage: 'Incorrect email' };

    expect(signUpValidation.isValid).toBeFalsy();
    expect(signUpValidation.errorMessage).toEqual(result.errorMessage);
  });

  it('has incorrect password', () => {
    const formData = { email: 'firebase@gmail.com', password: 'firebase', username: 'FirebaseAdmin' };
    const signUpValidation = isSingUpFormValid(formData);

    const result = {
      errorMessage:
        'Your password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    };

    expect(signUpValidation.isValid).toBeFalsy();
    expect(signUpValidation.errorMessage).toEqual(result.errorMessage);
  });

  it('has incorrect user name', () => {
    const formData = { email: 'firebase@gmail.com', password: 'Firebase123.', username: 'FirebaseAdmin!!!' };
    const signUpValidation = isSingUpFormValid(formData);

    const result = { errorMessage: 'Invalid username' };

    expect(signUpValidation.isValid).toBeFalsy();
    expect(signUpValidation.errorMessage).toEqual(result.errorMessage);
  });

  it('is valid', () => {
    const formData = { email: 'firebase@gmail.com', password: 'Firebase123.', username: 'FirebaseAdmin' };
    const signUpValidation = isSingUpFormValid(formData);

    const result = { errorMessage: '' };

    expect(signUpValidation.isValid).toBeTruthy();
    expect(signUpValidation.errorMessage).toEqual(result.errorMessage);
  });
});
