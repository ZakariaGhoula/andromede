import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadCountries} from 'redux/modules/others';
import {register} from 'redux/modules/auth';
import {clearCart} from 'redux/modules/cart';
import {clearCheckout} from 'redux/modules/placeorder';
import {push} from 'react-router-redux';

const I18n = require('react-redux-i18n').I18n;

@connect(state => ({
  locale: state.i18n.locale,
  loadingCountry: state.others.loadingCountry,
  loadedCountry: state.others.loadedCountry,
  dataCountries: state.others.dataCountries,
  user: state.auth.user,
  checkouted: state.checkout.checkouted,
  dataCheckout: state.checkout.dataCheckout,
  registerError: state.auth.registerError,
  countItem: state.cart.countItem,
  dataItem: state.cart.dataItem
}), {loadCountries, register, clearCart, clearCheckout, pushState: push})

export default class Thanks extends Component {
  static propTypes = {
    locale: PropTypes.string,
    loadingCountry: PropTypes.boolean,
    loadedCountry: PropTypes.boolean,
    checkouted: PropTypes.boolean,
    dataCountries: PropTypes.object,
    location: PropTypes.object,
    user: PropTypes.object,

    stripe: PropTypes.object,
    dataItem: PropTypes.object,
    countItem: PropTypes.number,
    registerError: PropTypes.object,
    dataCheckout: PropTypes.object,
    loadCountries: PropTypes.func,
    pushState: PropTypes.func,
    register: PropTypes.func,
    clearCart: PropTypes.func,
    clearCheckout: PropTypes.func,
  };

  componentWillMount() {
    if (!this.props.checkouted || this.props.dataCheckout === null) {
      this.props.pushState('/' + this.props.locale);
    } else {
      this.props.clearCart();
    }
  }

  componentWillUnmount() {
    this.props.clearCheckout();
  }

  render() {
    const styles = require('./Checkout.scss');
    return (
      <div className={styles.checkout}>
        <Helmet title={I18n.t('checkout.thanks')}/>

        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-10 col-md-push-1'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>{I18n.t('checkout.thanks')}
                    <hr/>
                  </h1>
                  <p className={styles.textThanks}>{I18n.t('checkout.thanks1')}</p>
                  {this.props.dataCheckout.reference && <p
                    className={styles.textThanks}>{I18n.t('checkout.thanksRef')}<b>{this.props.dataCheckout.reference}</b>
                  </p>}
                  <p className={styles.textThanks}>{I18n.t('checkout.thanks2')}</p>
                  <p className={styles.textThanks}>{I18n.t('checkout.thanks3')}<br/>{I18n.t('checkout.thanks4')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>);
  }
}
