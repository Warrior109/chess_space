import { MINIMUM_PASSWORD_LENGTH, MAXIMUM_PASSWORD_LENGTH, EMAIL_REGEXP } from './constants';

export const validations = {
  email: email => {
    if (!email) {
      return 'Required';
    } else if (!EMAIL_REGEXP.test(email)) {
      return 'Not valid';
    }
  },
  firstName: firstName => {
    if (!firstName) {
      return 'Required';
    }
  },
  lastName: lastName => {
    if (!lastName) {
      return 'Required';
    }
  },
  password: password => {
    if (!password) {
      return 'Required';
    } else if (password.length < MINIMUM_PASSWORD_LENGTH) {
      return `Password too short. Minimum ${MINIMUM_PASSWORD_LENGTH} characters.`;
    } else if (password.length > MAXIMUM_PASSWORD_LENGTH) {
      return `Password too long. Maximum ${MAXIMUM_PASSWORD_LENGTH} characters.`;
    }
  },
  passwordConfirmation: (passwordConfirmation, password) => {
    if (passwordConfirmation !== password) {
      return 'Passwords don\'t match';
    }
  }
};
