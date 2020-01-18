import { combineReducers } from 'redux';
import { currentUserReducer } from './currentUser';

import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

const appReducer = history => {
  const reducers = {
    toastr: toastrReducer,
    form: formReducer,
    currentUser: currentUserReducer
  };

  if (history) {
    return combineReducers({ ...reducers, router: connectRouter(history) });
  }
  return combineReducers(reducers);

};

export default appReducer;
