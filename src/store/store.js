import {
  createStore as _createStore,
  applyMiddleware
} from 'redux';
import baseReducers from '../reducers';
import Registry from './registry/registry';
import registryMiddleware from './registry/middleware';


export function createStore(initialState = {}) {
  const registry = new Registry(baseReducers);
  let finalCreateStore = applyMiddleware(registryMiddleware(registry));

  if(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    finalCreateStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      finalCreateStore);
  }

  const store = finalCreateStore(_createStore)(
    registry.initialReducers,
    initialState
  );

  registry.store = store;

  return store;
}
