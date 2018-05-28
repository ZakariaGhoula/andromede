import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadCountries} from 'redux/modules/others';
import {register} from 'redux/modules/auth';
import {LinkContainer} from 'react-router-bootstrap';

import {hideCart} from 'redux/modules/cart';
import {push} from 'react-router-redux';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale,
  loadingCountry: state.others.loadingCountry,
  loadedCountry: state.others.loadedCountry,
  dataCountries: state.others.dataCountries,
  user: state.auth.user,
  registerError: state.auth.registerError,
}), {loadCountries, register, hideCart, pushState: push})
export default class Signup extends Component {
  static propTypes = {
    locale: PropTypes.string,
    loadingCountry: PropTypes.boolean,
    loadedCountry: PropTypes.boolean,
    dataCountries: PropTypes.object,
    location: PropTypes.object,
    user: PropTypes.object,
    registerError: PropTypes.object,
    loadCountries: PropTypes.func,
    register: PropTypes.func,
    hideCart: PropTypes.func,
    pushState: PropTypes.func,
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
  }

  componentWillMount() {
    this.props.hideCart();
    this.props.loadCountries(this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      this.props.loadCountries(nextProps.locale);
    }

    if (!this.props.user && nextProps.user) {
      if ((typeof this.props.location.query !== 'undefined' && this.props.location.query !== null && typeof this.props.location.query.redirect !== 'undefined' && this.props.location.query.redirect !== '')) {
        this.props.pushState('/' + this.props.locale + '/' + this.props.location.query.redirect);
      } else {
        this.props.pushState('/' + this.props.locale + '/customer/info');
      }
    }
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

  isEmailAddress(str) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean
  }

  validateForm = () => {
    const oldState = Object.assign({}, this.state);
    oldState.errorLastName = oldState.lastName.trim().length <= 1;
    oldState.errorFistName = oldState.firstName.trim().length <= 1;
    oldState.errorPhone = oldState.phone.trim().length <= 1;
    oldState.errorAddress = oldState.address.trim().length <= 1;
    oldState.errorCity = oldState.city.trim().length <= 1;
    oldState.errorZipCode = oldState.zipcode.trim().length <= 1;
    oldState.errorCountry = oldState.country.trim().length <= 1;
    oldState.errorPassword = oldState.password.trim().length <= 3;
    oldState.errorConfirmPassword = oldState.confirmPassword.trim().length <= 3 || oldState.confirmPassword.trim() !== this.state.password;
    oldState.errorEmail = !this.isEmailAddress(oldState.email.trim());
    oldState.errorAccept = oldState.accept === 0;
    this.setState(oldState);
  }

  save = () => {
    this.validateForm();
    const oldState = Object.assign({}, this.state);

    oldState.errorLastName = oldState.lastName.trim().length <= 1;
    oldState.errorFistName = oldState.firstName.trim().length <= 1;
    oldState.errorPhone = oldState.phone.trim().length <= 1;
    oldState.errorAddress = oldState.address.trim().length <= 1;
    oldState.errorCity = oldState.city.trim().length <= 1;
    oldState.errorZipCode = oldState.zipcode.trim().length <= 1;
    oldState.errorCountry = oldState.country.trim().length <= 1;
    oldState.errorPassword = oldState.password.trim().length <= 3;
    oldState.errorConfirmPassword = oldState.confirmPassword.trim().length <= 3 || oldState.confirmPassword.trim() !== this.state.password;
    oldState.errorEmail = !this.isEmailAddress(oldState.email.trim());
    if ((!oldState.errorLastName && !oldState.errorFistName && !oldState.errorPhone && !oldState.errorCity && !oldState.errorAddress && !oldState.errorZipCode && !oldState.errorCountry && !oldState.errorPassword && !oldState.errorConfirmPassword && !oldState.errorEmail && oldState.accept === 1)) {
      const dataToSend = {
        email: oldState.email,
        lastName: oldState.lastName,
        firstName: oldState.firstName,
        phone: oldState.phone,
        address: oldState.address,
        address2: oldState.address2,
        zipcode: oldState.zipcode,
        country: oldState.country,
        province: oldState.state,
        password: oldState.password,
        optin: oldState.optin,
        city: oldState.city
      };
      this.props.register(dataToSend);
    }
  }

  render() {
    const styles = require('./Signup.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.signup}>
        <Helmet title={I18n.t('customer.signup.title')}/>

        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-12'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>{I18n.t('customer.signup.title')}
                    <hr/>
                  </h1>
                  <div className="clear clearfix"></div>
                  <div className="row">
                    {typeof this.props.registerError !== 'undefined' && this.props.registerError !== null && this.props.registerError.exist &&
                    <div className="col-md-12">
                      <h4 className={styles.h4error}>{I18n.t('customer.existEmail')}</h4>
                    </div>}
                    <div className="clear clearfix"></div>
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className={styles.labelForm}>{I18n.t('customer.email')} <span
                          className={styles.redStars}>*</span></label>
                        <input type="email"
                               className={styles.inputForm + ' ' + ((this.state.errorEmail) ? styles.inputErrorForm : '') + ' form-control'}
                               onChange={this.change.bind(this, 'email')}
                        />
                        {(this.state.errorEmail) &&
                        <small className={styles.errMsg}>{I18n.t('customer.emailError')}</small>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className={styles.labelForm}>{I18n.t('customer.mobileNumber')} <span
                          className={styles.redStars}>*</span></label>
                        <input type="text"
                               className={styles.inputForm + ' ' + ((this.state.errorPhone) ? styles.inputErrorForm : '') + ' form-control'}
                               onChange={this.change.bind(this, 'phone')}
                        />
                        {(this.state.errorPhone) &&
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className={styles.labelForm}>{I18n.t('customer.password')} <span
                          className={styles.redStars}>*</span></label>
                        <input type="password"
                               className={styles.inputForm + ' ' + ((this.state.errorPassword) ? styles.inputErrorForm : '') + ' form-control'}
                               onChange={this.change.bind(this, 'password')}
                        />
                        {(this.state.errorPassword) &&
                        <small className={styles.errMsg}>{I18n.t('customer.passwordError')}</small>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className={styles.labelForm}>{I18n.t('customer.confirmPass')} <span
                          className={styles.redStars}>*</span></label>
                        <input type="password"
                               className={styles.inputForm + ' ' + ((this.state.errorConfirmPassword) ? styles.inputErrorForm : '') + ' form-control'}
                               onChange={this.change.bind(this, 'confirmPassword')}
                        />
                        {(this.state.errorConfirmPassword) &&
                        <small className={styles.errMsg}>{I18n.t('customer.confirmPasswordError')}</small>}
                      </div>
                    </div>
                    <div className="clear clearfix"></div>
                    <div className="col-md-6">
                      <div className="checkbox">
                        <label className={styles.labelFormCheck}><input type="checkbox" checked={this.state.optin === 1}
                                                                        onChange={() => this.setState({optin: this.state.optin === 1 ? 0 : 1})}
                                                                        className={styles.checkboxForm}/>{I18n.t('customer.newsletter')}
                        </label>
                      </div>
                    </div>
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
                    <div className="col-md-6 col-md-push-6">
                      <a className={styles.submitForm} onClick={() => this.save()}>{I18n.t('customer.register')}</a>
                    </div>
                    <div className="clear clearfix"></div>
                    <div className="col-md-6">
                      <p className={styles.fieldsRequest}>* {I18n.t('customer.fieldsRequest')}</p>
                    </div>
                    <div className="clear clearfix"></div>
                    <div
                      className="col-xs-12 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3 col-xl-4 col-xs-push-4 align-center">
                      <p className={styles.alreadyAccount}>{I18n.t('customer.accountYet')} <LinkContainer
                        to={'/' + this.props.locale + '/customer/login' + ((typeof this.props.location.query !== 'undefined' && this.props.location.query !== null && typeof this.props.location.query.redirect !== 'undefined' && this.props.location.query.redirect !== '') ? '?redirect=' + this.props.location.query.redirect : '')}><a>{I18n.t('customer.connect')}</a></LinkContainer>
                      </p>
                    </div>
                  </div>
                  <div className="clear clearfix"></div>
                </div>
                <div className="clear clearfix"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


/*

   <div className={styles.singleOrangeColor + ' col-sm-4 col-md-4  col-lg-4'}>
                  <div className={styles.blockRight}>
                    <LinkContainer to={'/' + this.props.locale + '/customer/login'}
                                   className={styles.titleBlack}><a>{I18n.t('customer.loginTitle')}</a></LinkContainer>
                    <div className="clear clearfix"></div>
                    <LinkContainer to={'/' + this.props.locale + '/customer/signup'}
                                   className={styles.titleBlack}><a>{I18n.t('customer.signup.title')}
                      <div className="clear clearfix"></div>
                      <hr/>
                      <div className="clear clearfix"></div>
                    </a></LinkContainer>
                    <div className="clear clearfix"></div>
                  </div>
                </div>
 */
