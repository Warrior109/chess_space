import { createSelector } from 'reselect';

const getChat = state => state.chat.object;
export const selectors = {
  getChat,
  getChatId: createSelector([getChat], (chat) => chat && chat.id),
  getChatCompanion: createSelector([getChat], (chat) => chat && chat.companion)
};
