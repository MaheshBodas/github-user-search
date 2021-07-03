import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import flow from 'lodash/fp/flow';
import debounce from 'lodash/fp/debounce';
import isNull from 'lodash/fp/isNull';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/Root';

const CACHE_KEY = 'github-user-cache';

const logger = createLogger({
  collapsed: true,
});

function saveState(state: Object) {
  try {
    const serialized = JSON.stringify(state);
    sessionStorage.setItem(CACHE_KEY, serialized);
  } catch (e) {
    console.warn('There was an problem saving the state');
  }
}

function loadState() {
  try {
    const serialized = sessionStorage.getItem(CACHE_KEY);
    if (isNull(serialized)) {return undefined;}
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
}

export default function configureStore() {
  const cachedState = loadState();
  const store = createStore(
    rootReducer,
    cachedState,
    flow(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(
        logger,
        thunkMiddleware
      )
    ),
  );
  
  store.subscribe(debounce(2000, () => {
    const {cache, entities} = store.getState();
    saveState({cache, entities});
  }));

  return store;
}
