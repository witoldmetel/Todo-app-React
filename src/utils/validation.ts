export const isEmailValid = (email: string) => {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regExp.test(email.toLowerCase());
};

export const isPasswordValid = (password: string) => {
  const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  return regExp.test(password);
};

export const isUsernameValid = (username: string) => {
  const regExp = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  return regExp.test(username);
};

export const isSingUpFormValid = ({ email, password, username }) => {
  if (!email.length || !password.length || !username.length) {
    return {
      isValid: false,
      errorMessage: 'Fill empty fields',
    };
  }

  if (!isEmailValid(email)) {
    return {
      isValid: false,
      errorMessage: 'Incorrect email',
    };
  }

  if (!isPasswordValid(password)) {
    return {
      isValid: false,
      errorMessage:
        'Your password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    };
  }

  if (!isUsernameValid(username)) {
    return {
      isValid: false,
      errorMessage: 'Invalid username',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};
