import { createSelector } from 'reselect';

const getChat = state => state.chat.object;
const getChatId = createSelector([getChat], (chat) => chat && chat.id);
const getChats = state => state.chat.list;
const getChatItemId = (state, props) => props.chat.id;
export const selectors = {
  getChat,
  getChatId,
  getChatCompanion: createSelector([getChat], (chat) => chat && chat.companion),
  getChats,
  getCursors: state => state.chat.cursors,
  getHasMorePages: state => state.chat.hasMorePages,
  makeIsActiveChat: () => createSelector(
    [getChatId, getChatItemId], (currentChatId, chatItemId) => currentChatId === chatItemId
  )
};
