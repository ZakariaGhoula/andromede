import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import {translationsObject} from '../translations/translations';
import {loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';
import {autoRehydrate, persistStore} from 'redux-persist';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const {persistState} = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./modules/reducer');
  const persistConfig = {
    blacklist: ['routing', 'i18n']
  };


  if (data) {
    data.pagination = Immutable.fromJS(data.pagination);
  }
  const store = finalCreateStore(reducer, data);
  syncTranslationWithStore(store);
  let locale = 'fr';
  if (__CLIENT__ && typeof navigator !== 'undefined') {
    const locale2 = navigator.language || navigator.userLanguage;
    locale = locale2.indexOf('fr') !== -1 ? 'fr' : 'fr';
  }
  store.dispatch(setLocale(locale));
  store.dispatch(loadTranslations(translationsObject));

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }
  persistStore(store, persistConfig);

  return store;
}
