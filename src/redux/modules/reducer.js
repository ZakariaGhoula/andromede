import {combineReducers} from 'redux';
import multireducer from 'multireducer';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {pagination} from 'violet-paginator';
import {i18nReducer} from 'react-redux-i18n';
import auth from './auth';
import counter from './counter';
import cart from './cart';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import others from './others';
import content from './content';
import test from './placeorder';
import {loadingBarReducer} from 'react-redux-loading-bar';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  cart,
  checkout: test,
  others,
  form,
  content,
  loadingBar: loadingBarReducer,
  i18n: i18nReducer,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  pagination,
  widgets
});
