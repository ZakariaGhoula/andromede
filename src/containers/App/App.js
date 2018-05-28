import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Header, Footer, ShoppingCart} from './../../components';
// import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info';
// import {isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth';
import {InfoBar} from 'components';
import {push} from 'react-router-redux';
import config from '../../config';
// import {asyncConnect} from 'redux-async-connect';
import LoadingBar from 'react-redux-loading-bar';
import {hideCart} from 'redux/modules/cart';

const I18n = require('react-redux-i18n').I18n;
import {Cookies, CookiesProvider, CookieBannerUniversal} from 'react-cookie-banner';
/*
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
*/
@connect(
  state => ({
    user: state.auth.user,
    locale: state.i18n.locale, isOpen: state.cart.isOpen
  }),
  {pushState: push, hideCart})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isOpen: PropTypes.boolean,
    locale: PropTypes.string,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    hideCart: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    stripe: null
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      console.log(nextProps);
      // login
      //  this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  /*
    handleLogout = (event) => {
      event.preventDefault();
      this.props.logout();
    };
  */
  render() {
    const styles = require('./App.scss');
    const cookies = new Cookies(/* Your cookie header, on browsers defaults to document.cookie */);
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <LoadingBar className="loadingBar"/>
        {this.props.isOpen && <ShoppingCart/>}
        {this.props.isOpen &&
        <div className={styles.overlayShoppingCart} onClick={() => this.props.hideCart()}></div>}
        <Header/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <Footer/>
        <InfoBar/>
        <CookiesProvider cookies={cookies}>
          <CookieBannerUniversal message={I18n.t('footer.msgCookies')}
                                 link={{
                                   msg: I18n.t('footer.msgMoreCookies'),
                                   url: '/' + this.props.locale + '/cookies'
                                 }}
                                 onAccept={() => {
                                 }}
                                 dismissOnScroll={false}
                                 cookie={'andromedetperseecookiesaccept'}
                                 buttonMessage={I18n.t('footer.btnCloseCookies')}/>
        </CookiesProvider>
      </div>
    );
  }
}
