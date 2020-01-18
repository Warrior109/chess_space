import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducers from './reducers';
import sagas from './sagas';

export const history = (typeof window !== 'undefined') && createBrowserHistory();

export default function configureStore(defaultProps = {}) {
  const sagaMiddleware = createSagaMiddleware();
  let middleware;
  if (typeof window !== 'undefined') {
    middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') middleware = compose(middleware, devToolsExtension());
  } else {
    middleware = applyMiddleware(sagaMiddleware);
  }

  const store = createStore(createReducers(history), defaultProps, middleware);
  sagaMiddleware.run(sagas);

  return store;
}
