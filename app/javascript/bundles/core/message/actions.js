import { types } from './constants';

export const actions = {
  createMessage: ({ text, callback, errorCallback }) => ({
    type: types.CREATE_MESSAGE, payload: { text }, callback, errorCallback
  })
};
