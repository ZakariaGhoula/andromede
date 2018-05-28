import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import {
  App,
  Chat,
  Home,
  Widgets,
  Cookies,
  Login,
  Signup,
  LoginSuccess,
  Survey,
  Shop,
  Customer,
  Product,
  Thanks,
  NotFound,
  UpdateAddress,
  Livraison,
  Checkout,
  List,
  Pagination,
  Pwd,
  Address,
  Mentionslegales,
  PersonnalData,
  Info,
  CGV
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {user}} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home}/>
      <Route path=":locale" component={Home}/>

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      {/* Routes */}
      <Route path="/:locale/cookies" component={Cookies}/>
      <Route path="/:locale/mentions-legales" component={Mentionslegales}/>
      <Route path="/:locale/donnees-personnelles" component={PersonnalData}/>
      <Route path="/:locale/conditions-generales-de-vente" component={CGV}/>
      <Route path="/:locale/livraison" component={Livraison}/>
      <Route path="login" component={Login}/>
      <Route path="pagination" component={Pagination}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>
      <Route path=":locale/product/:url" component={Product}/>
      <Route path="product/:url" component={Product}/>
      <Route path=":locale/boutique" component={Shop}/>
      <Route path=":locale/shop" component={Shop}/>
      <Route path=":locale/Checkout" component={Checkout}/>
      <Route path=":locale/Thanks" component={Thanks}/>
      <Route path="/:locale/customer" component={Customer}>
        <IndexRoute component={Signup}/>
        <Route component={Signup} path="signup"/>
        <Route component={Login} path="login"/>
        <Route component={Info} path="info"/>
        <Route component={Pwd} path="password"/>
        <Route component={List} path="list-order"/>
        <Route component={Address} path="address"/>
        <Route component={UpdateAddress} path="update-address/:id_address"/>
      </Route>
      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
