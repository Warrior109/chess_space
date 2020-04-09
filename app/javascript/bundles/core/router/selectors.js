import {createSelector} from 'reselect';
import {matchPath} from 'react-router';

import {paths} from 'layouts/constants';

const getCurrentPathname = state => state.router.location.pathname;
export const selectors = {
  isOnChatPage: createSelector(
    [getCurrentPathname], (pathname) => !!matchPath(pathname, paths.CHAT)
  )
};
