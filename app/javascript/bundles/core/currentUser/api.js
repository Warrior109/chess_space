import { graphQLRequest } from 'lib/utils';
import { logOut, signIn, checkUserEmailUniqueness, signUpUser } from './queries';

const api = {
  logOut: () => graphQLRequest({
    query: logOut,
    variables: { input: {} }
  }),
  signIn: ({ email, password }) => graphQLRequest({
    query: signIn,
    variables: { input: {} },
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
