import { createSelector } from 'reselect';

import { selectors as currentUserSelectors } from 'core/currentUser';

const getMessagesList = state => state.message.list;

export const selectors = {
  getMessages: createSelector(
    [getMessagesList, currentUserSelectors.getCurrentUser],
    (messages, currentUser) => messages.map((message) => ({
      ...message, isMine: message.sender.id === currentUser.id
    }))
  )
};
