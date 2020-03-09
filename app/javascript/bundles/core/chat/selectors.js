import { createSelector } from 'reselect';

const getChat = state => state.chat.object;
export const selectors = {
  getChat,
  getChatCompanion: createSelector([getChat], (chat) => chat && chat.companion)
};
