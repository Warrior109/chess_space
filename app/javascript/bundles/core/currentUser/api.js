import { graphQLRequest } from 'lib/utils';
import { logOut, signInUser, checkUserEmailUniqueness, signUpUser } from './queries';

const api = {
  logOut: () => graphQLRequest({
    query: logOut,
    variables: { input: {} }
  }),
  signIn: ({ email, password }) => graphQLRequest({
    query: signInUser,
    variables: { input: { type: 'web' } },
    data: { user: { email, password } }
  }),
  checkUserEmailUniqueness: ({ email }) => graphQLRequest({
    query: checkUserEmailUniqueness,
    variables: { input: { email } }
  }),
  signUpUser: ({ firstName, lastName, email, password, passwordConfirmation }) => graphQLRequest({
    query: signUpUser,
    variables: { input: { firstName, lastName, email, password, passwordConfirmation } }
  })
};

export default api;
