import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadCountries} from 'redux/modules/others';
import {register} from 'redux/modules/auth';
import {LinkContainer} from 'react-router-bootstrap';
import {hideCart} from 'redux/modules/cart';
import {placeorder} from 'redux/modules/placeorder';
import ShoppingCartItemCheckout from './../../components/ShoppingCart/ShoppingCartItemCheckout';
import {push} from 'react-router-redux';
import {Elements, StripeProvider, CardElement} from 'react-stripe-elements';
import {DotLoader} from 'react-spinners';

const I18n = require('react-redux-i18n').I18n;

@connect(state => ({
  locale: state.i18n.locale,
  loadingCountry: state.others.loadingCountry,
  loadedCountry: state.others.loadedCountry,
  dataCountries: state.others.dataCountries,
  checkouting: state.checkout.checkouting,
  checkouted: state.checkout.checkouted,
  errorCheckout: state.checkout.errorCheckout,
  user: state.auth.user,
  registerError: state.auth.registerError,
  countItem: state.cart.countItem,
  dataItem: state.cart.dataItem
}), {loadCountries, register, hideCart, pushState: push, placeorder})

export default class Checkout extends Component {
  static propTypes = {
    locale: PropTypes.string,
    loadingCountry: PropTypes.boolean,
    loadedCountry: PropTypes.boolean,
    checkouted: PropTypes.boolean,
    checkouting: PropTypes.boolean,
    errorCheckout: PropTypes.object,
    dataCountries: PropTypes.object,
    location: PropTypes.object,
    user: PropTypes.object,
    stripe: PropTypes.object,
    dataItem: PropTypes.object,
    countItem: PropTypes.number,
    registerError: PropTypes.object,
    loadCountries: PropTypes.func,
    pushState: PropTypes.func,
    register: PropTypes.func,
    hideCart: PropTypes.func,
    placeorder: PropTypes.func,
  };

  state = {
    firstName: '',
    errorFistName: false,
    lastName: '',
    errorLastName: false,
    email: '',
    errorEmail: false,
    phone: '',
    errorPhone: false,
    address: '',
    errorAddress: false,
    address2: '',
    city: '',
    errorCity: false,
    zipcode: '',
    errorZipCode: false,
    country: '',
    errorCountry: false,
    state: '',
    password: '',
    errorPassword: false,
    confirmPassword: '',
    errorConfirmPassword: false,
    optin: 1,
    accept: 0,
    errorAccept: false,
    newAddress: false,
    addressSelect: 0,
    addressBilingSelect: 0,
    newAddressBilling: false,


    firstNameBilling: '',
    errorFistNameBilling: false,
    lastNameBilling: '',
    errorLastNameBilling: false,
    addressBilling: '',
    errorAddressBilling: false,
    address2Billing: '',
    cityBilling: '',
    errorCityBilling: false,
    zipcodeBilling: '',
    errorZipCodeBilling: false,
    countryBilling: '',
    errorCountryBilling: false,
    errorCard: false,
    errorCardMsg: '',
    stateBilling: '',
    cardNumber: '',
    month: '',
    year: '',
    cvc: '',
    showOverView: false,
    stripe: null,
    elements: null,
    card: null
  }

  componentWillMount() {
    this.props.hideCart();
    this.props.loadCountries(this.props.locale);
    if (this.props.countItem > 0 && (typeof this.props.user === 'undefined' || (typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.user === 'undefined') || (typeof this.props.user !== 'undefined' && this.props.user === null))) {
      this.props.pushState('/' + this.props.locale + '/customer/login/?redirect=checkout');
    }
    if (this.props.countItem === 0) {
      this.props.pushState('/' + this.props.locale);
    }

    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_JbSvyq8JBz5ZwpbLciLDGeES')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_JbSvyq8JBz5ZwpbLciLDGeES')});
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.props.loadCountries(nextProps.locale);
    }
    if (this.props.countItem > 0 && nextProps.countItem === 0) {
      this.props.pushState('/' + this.props.locale);
    }
    if (this.props.checkouted === false && nextProps.checkouted) {
      this.props.pushState('/' + this.props.locale + '/thanks');
    }
  }

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  change = (keyState, event) => {
    // -- retrieve old state => make copy
    const oldState = Object.assign({}, this.state);
    // -- put value of input in state
    // oldState[keyState] = event.target.value;
    // -- update state
    if (keyState === 'lastName') {
      oldState.lastName = event.target.value;
      oldState.errorLastName = event.target.value.trim().length <= 1;
    }
    if (keyState === 'firstName') {
      oldState.firstName = event.target.value;
      oldState.errorFistName = event.target.value.trim().length <= 1;
    }
    if (keyState === 'phone') {
      oldState.phone = event.target.value;
      oldState.errorPhone = event.target.value.trim().length <= 1;
    }
    if (keyState === 'address') {
      oldState.address = event.target.value;
      oldState.errorAddress = event.target.value.trim().length <= 1;
    }
    if (keyState === 'city') {
      oldState.city = event.target.value;
      oldState.errorCity = event.target.value.trim().length <= 1;
    }
    if (keyState === 'zipcode') {
      oldState.zipcode = event.target.value;
      oldState.errorZipCode = event.target.value.trim().length <= 1;
    }
    if (keyState === 'country') {
      oldState.country = event.target.value;
      oldState.errorCountry = event.target.value.trim().length <= 1;
    }
    if (keyState === 'password') {
      oldState.password = event.target.value.trim();
      oldState.errorPassword = event.target.value.trim().length <= 3;
    }
    if (keyState === 'confirmPassword') {
      oldState.confirmPassword = event.target.value.trim();
      oldState.errorConfirmPassword = event.target.value.trim().length <= 3 || event.target.value.trim() !== this.state.password;
    }
    if (keyState === 'address2') {
      oldState.address2 = event.target.value;
    }
    if (keyState === 'state') {
      oldState.state = event.target.value;
    }
    if (keyState === 'email') {
      oldState.errorEmail = !this.isEmailAddress(event.target.value);
      oldState.email = event.target.value.trim();
    }
    this.setState(oldState);
    // this.validateForm();
  };
  changeBilling = (keyState, event) => {
    // -- retrieve old state => make copy
    const oldState = Object.assign({}, this.state);
    // -- put value of input in state
    // oldState[keyState] = event.target.value;
    // -- update state
    if (keyState === 'lastNameBilling') {
      oldState.lastNameBilling = event.target.value;
      oldState.errorLastNameBilling = event.target.value.trim().length <= 1;
    }
    if (keyState === 'firstNameBilling') {
      oldState.firstNameBilling = event.target.value;
      oldState.errorFistNameBilling = event.target.value.trim().length <= 1;
    }
    if (keyState === 'addressBilling') {
      oldState.addressBilling = event.target.value;
      oldState.errorAddressBilling = event.target.value.trim().length <= 1;
    }
    if (keyState === 'cityBilling') {
      oldState.cityBilling = event.target.value;
      oldState.errorCityBilling = event.target.value.trim().length <= 1;
    }
    if (keyState === 'zipcodeBilling') {
      oldState.zipcodeBilling = event.target.value;
      oldState.errorZipCodeBilling = event.target.value.trim().length <= 1;
    }
    if (keyState === 'countryBilling') {
      oldState.countryBilling = event.target.value;
      oldState.errorCountryBilling = event.target.value.trim().length <= 1;
    }
    if (keyState === 'address2Billing') {
      oldState.address2Billing = event.target.value;
    }
    if (keyState === 'stateBilling') {
      oldState.stateBilling = event.target.value;
    }
    if (keyState === 'cardNumber') {
      oldState.cardNumber = event.target.value;
    }
    if (keyState === 'month') {
      oldState.month = event.target.value;
    }
    if (keyState === 'year') {
      oldState.year = event.target.value;
    }
    if (keyState === 'cvc') {
      oldState.cvc = event.target.value;
    }
    this.setState(oldState);
    // this.validateForm();
  };

  isEmailAddress(str) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean
  }

  validateForm = () => {
    const oldState = Object.assign({}, this.state);
    if (this.state.newAddress) {
      oldState.errorLastName = oldState.lastName.trim().length <= 1;
      oldState.errorFistName = oldState.firstName.trim().length <= 1;
      oldState.errorAddress = oldState.address.trim().length <= 1;
      oldState.errorCity = oldState.city.trim().length <= 1;
      oldState.errorZipCode = oldState.zipcode.trim().length <= 1;
      oldState.errorCountry = oldState.country.trim().length <= 1;
    }
    if (this.state.newAddressBilling) {
      oldState.errorLastNameBilling = oldState.lastNameBilling.trim().length <= 1;
      oldState.errorFistNameBilling = oldState.firstNameBilling.trim().length <= 1;
      oldState.errorAddressBilling = oldState.addressBilling.trim().length <= 1;
      oldState.errorCityBilling = oldState.cityBilling.trim().length <= 1;
      oldState.errorZipCodeBilling = oldState.zipcodeBilling.trim().length <= 1;
      oldState.errorCountryBilling = oldState.countryBilling.trim().length <= 1;
    }
    oldState.errorAccept = oldState.accept === 0;
    oldState.errorCard = (oldState.cardNumber.trim().length === 0 || oldState.cvc.trim().length === 0 || oldState.year.trim().length === 0 || oldState.month.trim().length === 0);
    this.setState(oldState);
  }

  save = () => {
    this.validateForm();
    if (this.state.stripe) {
      this.state.stripe
        .createToken(this.state.card)
        .then(payload => {
          if (payload.error) {
            this.setState({
              errorCard: true,
              errorCardMsg: payload.error.message,
            });
          } else {
            const oldState = Object.assign({}, this.state);
            if (this.state.newAddress) {
              oldState.errorLastName = oldState.lastName.trim().length <= 1;
              oldState.errorFistName = oldState.firstName.trim().length <= 1;
              oldState.errorAddress = oldState.address.trim().length <= 1;
              oldState.errorCity = oldState.city.trim().length <= 1;
              oldState.errorZipCode = oldState.zipcode.trim().length <= 1;
              oldState.errorCountry = oldState.country.trim().length <= 1;
            }
            if (this.state.newAddressBilling) {
              oldState.errorLastNameBilling = oldState.lastNameBilling.trim().length <= 1;
              oldState.errorFistNameBilling = oldState.firstNameBilling.trim().length <= 1;
              oldState.errorAddressBilling = oldState.addressBilling.trim().length <= 1;
              oldState.errorCityBilling = oldState.cityBilling.trim().length <= 1;
              oldState.errorZipCodeBilling = oldState.zipcodeBilling.trim().length <= 1;
              oldState.errorCountryBilling = oldState.countryBilling.trim().length <= 1;
            }
            oldState.errorAccept = oldState.accept === 0;
            let isNewAddressOk = true;
            if (this.state.newAddress) {
              if (!oldState.errorLastName && !oldState.errorFistName && !oldState.errorCity && !oldState.errorAddress && !oldState.errorZipCode && !oldState.errorCountry) {
                isNewAddressOk = true;
              } else {
                isNewAddressOk = false;
              }
            }
            let isNewAddressBillingOk = true;
            if (this.state.newAddressBilling) {
              if ((!oldState.errorLastNameBilling && !oldState.errorFistNameBilling && !oldState.errorCityBilling && !oldState.errorAddressBilling && !oldState.errorZipCodeBilling && !oldState.errorCountryBilling)) {
                isNewAddressBillingOk = true;
              } else {
                isNewAddressBillingOk = false;
              }
            }

            if (isNewAddressOk && isNewAddressBillingOk && oldState.accept === 1) {
              if (typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null) {
                let dataShippingAddress = {};
                let dataBillingAddress = {};
                if (this.props.user.user.addresses && this.props.user.user.addresses.length > 0 && this.state.addressSelect !== null && typeof this.props.user.user.addresses[this.state.addressSelect] !== 'undefined' && !this.state.newAddress) {
                  dataShippingAddress = this.props.user.user.addresses[this.state.addressSelect];
                  dataShippingAddress.isNew = false;
                } else {
                  dataShippingAddress = {
                    last_name: oldState.lastName,
                    first_name: oldState.firstName,
                    address: oldState.address,
                    address_2: oldState.address2,
                    zipcode: oldState.zipcode,
                    country: oldState.country,
                    province: oldState.state,
                    city: oldState.city,
                    isNew: this.state.newAddress
                  };
                }
                if (this.props.user.user.addresses && this.props.user.user.addresses.length > 0 && this.state.addressSelect !== null && typeof this.props.user.user.addresses[this.state.addressBilingSelect] !== 'undefined' && !this.state.newAddressBilling) {
                  dataBillingAddress = this.props.user.user.addresses[this.state.addressBilingSelect];
                  dataBillingAddress.isNew = false;
                } else {
                  dataBillingAddress = {
                    last_name: oldState.lastNameBilling,
                    first_name: oldState.firstNameBilling,
                    address: oldState.addressBilling,
                    address_2: oldState.address2Billing,
                    zipcode: oldState.zipcodeBilling,
                    country: oldState.countryBilling,
                    province: oldState.stateBilling,
                    city: oldState.cityBilling,
                    isNew: this.state.newAddressBilling
                  };
                }
                let finalPrice = 0;
                const items = [];
                for (const ind in this.props.dataItem) {
                  if (this.props.dataItem[ind]) {
                    finalPrice += this.props.dataItem[ind].quantity * this.props.dataItem[ind].price;
                    items.push({
                      quantity: this.props.dataItem[ind].quantity,
                      price: this.props.dataItem[ind].price,
                      id_product: this.props.dataItem[ind].id,
                    });
                  }
                }
                const final = {
                  shipping: dataShippingAddress,
                  billing: dataBillingAddress,
                  card: {
                    token: payload.token.id
                  },
                  cart: {
                    number_item: this.props.countItem,
                    total_price: finalPrice,
                    foreign_shipping: (dataShippingAddress.country !== null && dataShippingAddress.country.trim() === 'France') ? false : true,
                    items: items
                  },
                  locale: this.props.locale,
                  id_customer: this.props.user.user.id
                };
                this.props.placeorder(final, this.props.user.token);
              }
            }
          }
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
    // this.props.register(dataToSend);
  }
  handleChange = () => {
    this.setState({
      errorCard: false,
      errorCardMsg: '',
    });
  };
  handleReady = (object) => {
    this.setState({card: object});
  };

  render() {
    const styles = require('./Checkout.scss');
    // require the logo image both from client and server
    let finalPrice = 0;
    let items = 0;
    let shippingFee = (this.state.country === '' || this.state.country.trim() === 'France') ? 5 : 10;
    for (const ind in this.props.dataItem) {
      if (this.props.dataItem[ind]) {
        finalPrice += this.props.dataItem[ind].quantity * this.props.dataItem[ind].price;
        items += this.props.dataItem[ind].quantity;
      }
    }
    if (this.state.newAddress === false && typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null &&
      this.props.user.user.addresses && this.props.user.user.addresses.length > 0 && this.state.addressSelect !== null && typeof this.props.user.user.addresses[this.state.addressSelect] !== 'undefined') {
      const country = this.props.user.user.addresses[this.state.addressSelect].country;
      shippingFee = (country === '' || country.trim() === 'France') ? 5 : 10;
    }
    console.log(this.props.errorCheckout);
    return (<StripeProvider stripe={this.state.stripe}>
        <div className={styles.checkout}>
          {this.props.checkouting && <div className={styles.overlayPay}>
            <div className={styles.overlayPayCell}>
              <div style={{margin: '0 auto', display: 'block', width: '66px', textAlign: 'center'}}>
                <DotLoader
                  color={'#c66d55'}/></div>
              <h5 className={styles.overlayPayText}>{I18n.t('checkout.traitement')}<br/>{I18n.t('checkout.traitement2')}
              </h5>
            </div>
          </div>}
          <Helmet title={I18n.t('checkout.title')}/>

          <section className={styles.sectionIntroCollections}>
            <div className={styles.containerBlock}>
              <div className={'container-fluid'}>
                <div className={' row'}>
                  <div className="col-xs-12">
                    {typeof this.props.errorCheckout !== 'undefined' && this.props.errorCheckout !== null &&
                    <h4 className={styles.h4error}>{I18n.t('checkout.errorPayement')}</h4>}
                  </div>
                  <div className="clear clearfix"></div>
                  <div
                    className={styles.colImgSquare + ' col-sm-12 col-md-12'}
                    ref={'scoller'}>
                    <div className="clear clearfix"></div>
                    <div className="row">
                      <div className="col-xs-12 hidden-md hidden-lg hidden-xl">
                        <a onClick={() => this.setState({showOverView: !this.state.showOverView})}
                           className={styles.btnShowOverview}>{I18n.t('checkout.overView')} ({finalPrice + shippingFee} €) {this.state.showOverView ?
                          (<i className="fa fa-chevron-up"></i>) : (<i className="fa fa-chevron-down"></i>)}
                          <div className="clear clearfix"></div>
                        </a>
                        <div className="clear clearfix"></div>
                        {this.state.showOverView && <div>
                          <div className={'col-xs-12'}>
                            <div className={styles.minicartWrapper}>
                              <div className="clear clearfix"></div>
                              {this.props.countItem > 0 && <ul id="cart-sidebar" className={styles.miniProductsList}>
                                {Object.keys(this.props.dataItem).map(function fct(item, index) {
                                  return (<ShoppingCartItemCheckout key={index} data={this.props.dataItem[item]}/>);
                                }, this)}
                              </ul>}
                            </div>
                            {this.props.countItem > 0 &&
                            <div className={styles.totalsContainer}>
                              <div className={styles.blockContent}>
                                <p className={styles.subtotal}>
                                  {items} {I18n.t('shoppingCart.product') + (this.props.countItem > 1 ? 's' : '')} <span
                                  className={styles.price}>{finalPrice} €</span>
                                  <div className="clear clearfix"></div>
                                </p>
                                <p className={styles.subtotal}>
                                  {I18n.t('checkout.shippingFee')} <span
                                  className={styles.price}>{shippingFee} €</span>
                                  <div className="clear clearfix"></div>
                                </p>
                                <p className={styles.total}>
                                  <span className={styles.label}>Total (TVA inc.)</span>
                                  <span className={styles.price2}>{finalPrice + shippingFee} €</span>
                                  <div className="clear clearfix"></div>
                                </p>
                                <div className="clear clearfix"></div>
                              </div>
                              <div className="clear clearfix"></div>
                            </div>}
                          </div>
                          <div className="clear clearfix"></div>
                        </div>}
                      </div>
                      <div className="clear clearfix"></div>
                      <div className="col-md-8">
                        <div className="row">
                          <div className={styles.sectionCheckout + ' col-xs-12'}>
                            <h2 className={styles.sectionCheckoutTitle}><span
                              className={styles.sectionCheckoutTitleNumber}>1</span> {I18n.t('checkout.shipping')}</h2>
                            <div className="clear clearfix"></div>
                            {typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null &&
                            this.props.user.user.addresses && this.props.user.user.profile && this.props.user.user.addresses.length > 0 &&
                            <div className={styles.selectAddress}>
                              <p className={styles.sectionIntroPhrase}>{I18n.t('checkout.selectShipping')}</p>
                              <div className="clear clearfix"></div>
                              {typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null &&
                              this.props.user.user.addresses && this.props.user.user.addresses.length > 0 && this.props.user.user.addresses.map(function fct(address, index) {
                                return (<div className={styles.address}
                                             key={index}>
                                  <div
                                    onClick={() => this.setState({addressSelect: index, newAddress: false})}
                                    className={styles.roundItem + ' ' + ((this.state.addressSelect === index && !this.state.newAddress) ? styles.roundItemChecked : '')}></div>
                                  {address.first_name + ' ' + address.last_name + ', ' + address.address + ((address.address_2 !== null && address.address_2 !== '') ? (', ' + address.address_2) : '') + ', ' + address.city + ' ' + address.zipcode + ', ' + ((address.province !== null && address.province !== '') ? (', ' + address.province + ' ') : ' ') + address.country}
                                  <div className="clear clearfix"></div>
                                </div>);
                              }, this)}
                            </div>}
                            <div className="clear clearfix"></div>
                            <div className={styles.address}>
                              <div onClick={() => {
                                this.setState({newAddress: true});
                                this.props.loadCountries(this.props.locale);
                              }}
                                   className={styles.roundItem + ' ' + ((this.state.newAddress) ? styles.roundItemChecked : '')}></div>
                              {I18n.t('checkout.newAddress')}</div>
                            <div className="clear clearfix"></div>
                            {this.state.newAddress && <div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.firstName')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorFistName) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.change.bind(this, 'firstName')}
                                  />
                                  {(this.state.errorFistName) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.lastName')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorLastName) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.change.bind(this, 'lastName')}
                                  />
                                  {(this.state.errorLastName) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="clear clearfix"></div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.streetAddress')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorAddress) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.change.bind(this, 'address')}
                                  />
                                  {(this.state.errorAddress) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="clear clearfix"></div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.streetAddress')} 2</label>
                                  <input type="text" className={styles.inputForm + ' form-control'}
                                         onChange={this.change.bind(this, 'address2')}
                                  />
                                </div>
                              </div>
                              <div className="clear clearfix"></div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.city')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorCity) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.change.bind(this, 'city')}
                                  />
                                  {(this.state.errorCity) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.zipcode')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorZipCode) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.change.bind(this, 'zipcode')}
                                  />
                                  {(this.state.errorZipCode) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="clear clearfix"></div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.country')} <span
                                    className={styles.redStars}>*</span></label>
                                  {this.props.loadedCountry &&
                                  <select
                                    value={this.state.country}
                                    className={styles.inputForm + ' ' + ((this.state.errorCountry) ? styles.inputErrorForm : '') + ' form-control'}
                                    onChange={this.change.bind(this, 'country')}>
                                    <option></option>
                                    {this.props.dataCountries && this.props.dataCountries.data && this.props.dataCountries.data.map(function fct(country, ind) {
                                      return (<option key={ind} value={country.name}>{country.name}</option>);
                                    })}
                                  </select>}
                                  {(this.state.errorCountry) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.state')}</label>
                                  <input type="text"
                                         onChange={this.change.bind(this, 'state')}
                                         className={styles.inputForm + ' form-control'}
                                  />
                                </div>
                              </div>
                              <div className="clear clearfix"></div>
                            </div>}
                          </div>
                          <div className="clear clearfix"></div>
                          <div className={styles.sectionCheckout + ' col-xs-12'}>
                            <h2 className={styles.sectionCheckoutTitle}><span
                              className={styles.sectionCheckoutTitleNumber}>2</span> {I18n.t('checkout.billing')}</h2>
                            <div className="clear clearfix"></div>
                            {typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null &&
                            this.props.user.user.addresses && this.props.user.user.profile && this.props.user.user.addresses.length > 0 &&
                            <div className={styles.selectAddress}>
                              <p className={styles.sectionIntroPhrase}>{I18n.t('checkout.selectBiling')}</p>
                              <div className="clear clearfix"></div>
                              {typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null &&
                              this.props.user.user.addresses && this.props.user.user.addresses.length > 0 && this.props.user.user.addresses.map(function fct(address, index) {
                                return (<div className={styles.address}
                                             key={index}>
                                  <div
                                    onClick={() => this.setState({
                                      addressBilingSelect: index,
                                      newAddressBilling: false
                                    })}
                                    className={styles.roundItem + ' ' + ((this.state.addressBilingSelect === index && !this.state.newAddressBilling) ? styles.roundItemChecked : '')}></div>
                                  {address.first_name + ' ' + address.last_name + ', ' + address.address + ((address.address_2 !== null && address.address_2 !== '') ? (', ' + address.address_2) : '') + ', ' + address.city + ' ' + address.zipcode + ', ' + ((address.province !== null && address.province !== '') ? (', ' + address.province + ' ') : ' ') + address.country}
                                  <div className="clear clearfix"></div>
                                </div>);
                              }, this)}
                            </div>}
                            <div className="clear clearfix"></div>
                            <div className={styles.address}>
                              <div onClick={() => {
                                this.setState({newAddressBilling: true});
                                this.props.loadCountries(this.props.locale);
                              }}
                                   className={styles.roundItem + ' ' + ((this.state.newAddressBilling) ? styles.roundItemChecked : '')}></div>
                              {I18n.t('checkout.newAddress')}</div>
                            <div className="clear clearfix"></div>
                            {this.state.newAddressBilling && <div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.firstName')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorFistNameBilling) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.changeBilling.bind(this, 'firstNameBilling')}
                                  />
                                  {(this.state.errorFistNameBilling) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.lastName')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorLastNameBilling) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.changeBilling.bind(this, 'lastNameBilling')}
                                  />
                                  {(this.state.errorLastName) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="clear clearfix"></div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.streetAddress')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorAddressBilling) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.changeBilling.bind(this, 'addressBilling')}
                                  />
                                  {(this.state.errorAddressBilling) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="clear clearfix"></div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.streetAddress')} 2</label>
                                  <input type="text" className={styles.inputForm + ' form-control'}
                                         onChange={this.changeBilling.bind(this, 'address2Billing')}
                                  />
                                </div>
                              </div>
                              <div className="clear clearfix"></div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.city')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorCityBilling) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.changeBilling.bind(this, 'cityBilling')}
                                  />
                                  {(this.state.errorCityBilling) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.zipcode')} <span
                                    className={styles.redStars}>*</span></label>
                                  <input type="text"
                                         className={styles.inputForm + ' ' + ((this.state.errorZipCodeBilling) ? styles.inputErrorForm : '') + ' form-control'}
                                         onChange={this.changeBilling.bind(this, 'zipcodeBilling')}
                                  />
                                  {(this.state.errorZipCodeBilling) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="clear clearfix"></div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.country')} <span
                                    className={styles.redStars}>*</span></label>
                                  {this.props.loadedCountry &&
                                  <select
                                    value={this.state.countryBilling}
                                    className={styles.inputForm + ' ' + ((this.state.errorCountryBilling) ? styles.inputErrorForm : '') + ' form-control'}
                                    onChange={this.changeBilling.bind(this, 'countryBilling')}>
                                    <option></option>
                                    {this.props.dataCountries && this.props.dataCountries.data && this.props.dataCountries.data.map(function fct(country, ind) {
                                      return (<option key={ind} value={country.name}>{country.name}</option>);
                                    })}
                                  </select>}
                                  {(this.state.errorCountryBilling) &&
                                  <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className={styles.labelForm}>{I18n.t('customer.state')}</label>
                                  <input type="text"
                                         onChange={this.changeBilling.bind(this, 'stateBilling')}
                                         className={styles.inputForm + ' form-control'}
                                  />
                                </div>
                              </div>
                              <div className="clear clearfix"></div>
                            </div>}
                          </div>
                          <div className="clear clearfix"></div>
                          <div className={styles.sectionCheckout + ' col-xs-12 '}>
                            <h2 className={styles.sectionCheckoutTitle}><span
                              className={styles.sectionCheckoutTitleNumber}>3</span> {I18n.t('checkout.paiement')}</h2>
                            <div className="clear clearfix"></div>
                            <div className="row">
                              <div className="col-xs-12">
                                <Elements>
                                  {typeof window !== 'undefined' &&
                                  <CardElement onChange={this.handleChange} onReady={this.handleReady}/>}
                                </Elements>
                                {(this.state.errorCard) &&
                                <small className={styles.errMsg}>{(this.state.errorCardMsg)}</small>}
                              </div>
                            </div>
                          </div>
                          <div className="clear clearfix"></div>
                          <div className="clear clearfix"></div>
                          <div className="col-md-6">
                            <div className="checkbox">
                              <label className={styles.labelFormCheck}><input type="checkbox"
                                                                              checked={this.state.accept === 1}
                                                                              onChange={() => this.setState({accept: this.state.accept === 1 ? 0 : 1})}
                                                                              className={styles.checkboxForm}/>{I18n.t('customer.accept') + ' '}<LinkContainer
                                to={'/'}><a>{I18n.t('footer.cgv')}</a></LinkContainer>
                              </label>
                            </div>
                            {(this.state.errorAccept) &&
                            <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                          </div>
                          <div className="clear clearfix"></div>
                          {typeof this.props.errorCheckout !== 'undefined' && this.props.errorCheckout !== null &&
                          <div className="col-xs-12">
                            <h4 className={styles.h4error}>{I18n.t('checkout.errorPayement')}</h4>
                          </div>}
                          <div className="clear clearfix"></div>
                          <div className="col-md-6 col-md-push-3">
                            <a className={styles.submitForm} onClick={() => this.save()}>{I18n.t('checkout.go')}</a>
                          </div>
                          <div className="clear clearfix"></div>
                        </div>
                      </div>
                      <div className={'col-md-4 hidden-sm hidden-xs '}>
                        <div className={styles.minicartWrapper}>
                          <div className={styles.title}>
                            <a className={styles.cartLink}>{I18n.t('checkout.overView')}</a>
                          </div>
                          <div className="clear clearfix"></div>
                          {this.props.countItem > 0 && <ul id="cart-sidebar" className={styles.miniProductsList}>
                            {Object.keys(this.props.dataItem).map(function fct(item, index) {
                              return (<ShoppingCartItemCheckout key={index} data={this.props.dataItem[item]}/>);
                            }, this)}
                          </ul>}
                        </div>
                        {this.props.countItem > 0 &&
                        <div className={styles.totalsContainer}>
                          <div className={styles.blockContent}>
                            <p className={styles.subtotal}>
                              {items} {I18n.t('shoppingCart.product') + (this.props.countItem > 1 ? 's' : '')} <span
                              className={styles.price}>{finalPrice} €</span>
                              <div className="clear clearfix"></div>
                            </p>
                            <p className={styles.subtotal}>
                              {I18n.t('checkout.shippingFee')} <span
                              className={styles.price}>{shippingFee} €</span>
                              <div className="clear clearfix"></div>
                            </p>
                            <p className={styles.total}>
                              <span className={styles.label}>Total (TVA inc.)</span>
                              <span className={styles.price2}>{finalPrice + shippingFee} €</span>
                              <div className="clear clearfix"></div>
                            </p>
                            <div className="clear clearfix"></div>
                          </div>
                          <div className="clear clearfix"></div>
                        </div>}
                      </div>
                      <div className="clear clearfix"></div>
                    </div>
                  </div>
                  <div className="clear clearfix"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </StripeProvider>
    )
      ;
  }
}
