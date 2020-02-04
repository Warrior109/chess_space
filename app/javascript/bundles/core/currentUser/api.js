import { graphQLRequest } from 'lib/utils';
import { logOutUser, signInUser, checkUserEmailUniqueness } from './queries';

const api = {
  logOut: () => graphQLRequest({
    query: logOutUser,
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
  })
};

export default api;
