import { graphQLRequest } from 'lib/utils';
import {
  logOut,
  signIn,
  checkUserEmailUniqueness,
  signUpUser,
  userUpdate,
  userSecureUpdate,
  currentUserDelete
} from './queries';

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
  }),
  userUpdate: (params) => graphQLRequest({
    query: userUpdate,
    variables: { input: params }
  }),
  userSecureUpdate: (params) => graphQLRequest({
    query: userSecureUpdate,
    variables: { input: params }
  }),
  updateCurrentUserAvatar: ({ originalAvatar, thumbnailAvatar }) => graphQLRequest({
    query: userUpdate,
    type: 'multipart',
    data: {
      variables_keys: 'input/originalAvatar;input/thumbnailAvatar',
      'input/originalAvatar': originalAvatar,
      'input/thumbnailAvatar': thumbnailAvatar
    }
  }),
  currentUserDelete: ({ password }) => graphQLRequest({
    query: currentUserDelete,
    variables: { input: { password } }
  })
};

export default api;
