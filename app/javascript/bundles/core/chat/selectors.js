import { createSelector } from 'reselect';

import { selectors as currentUserSelectors } from 'core/currentUser';

const getChat = state => state.chat.object;
export const selectors = {
  getChat,
  getChatCompanion: createSelector([getChat], (chat) => chat && chat.companion),
  getChatMessages: createSelector(
    [getChat, currentUserSelectors.getCurrentUser],
    (chat, currentUser) => {
      if (!chat || !chat.messages) return [];

      return chat.messages.map((message) => ({
        ...message, isMine: message.sender.id === currentUser.id
      }));
    }
  )
};
