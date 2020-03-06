import { all } from 'redux-saga/effects';
import { currentUserSagas } from './currentUser';
import { chatSagas } from './chat';
import 'babel-polyfill';

export default function* sagas() {
  yield all([
    ...currentUserSagas,
    ...chatSagas
  ]);
}
