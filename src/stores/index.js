import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from "redux-persist"

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    autoRehydrate(),
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    typeof window.devToolsExtension === 'function' ? window.devToolsExtension() : f => f
  ));
  persistStore(store);
  return store;
}
