import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadCountries} from 'redux/modules/others';
import {updateDataPerso, resetUpdate} from 'redux/modules/auth';

import {hideCart} from 'redux/modules/cart';
import {push} from 'react-router-redux';
import Sidebar from '../Sidebar';

import {showLoading, hideLoading} from 'react-redux-loading-bar';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale,
  loadingCountry: state.others.loadingCountry,
  loadedCountry: state.others.loadedCountry,
  dataCountries: state.others.dataCountries,
  user: state.auth.user,
  updateIn: state.auth.updateIn,
  updated: state.auth.updated,
  updateError: state.auth.updateError,
  registerError: state.auth.registerError,
}), {loadCountries, updateDataPerso, showLoading, resetUpdate, hideLoading, hideCart, pushState: push})
export default class Info extends Component {
  static propTypes = {
    locale: PropTypes.string,
    loadingCountry: PropTypes.boolean,
    loadedCountry: PropTypes.boolean,
    updated: PropTypes.boolean,
    updateIn: PropTypes.boolean,
    dataCountries: PropTypes.object,
    location: PropTypes.object,
    user: PropTypes.object,
    registerError: PropTypes.object,
    updateError: PropTypes.object,
    loadCountries: PropTypes.func,
    updateDataPerso: PropTypes.func,
    hideCart: PropTypes.func,
    pushState: PropTypes.func,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
    resetUpdate: PropTypes.func,
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
    this.props.resetUpdate();
    if (typeof this.props.user !== 'undefined' && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null && typeof this.props.user.user.profile !== 'undefined') {
      this.setState({
        firstName: this.props.user.user.profile.firstName,
        lastName: this.props.user.user.profile.lastName,
        email: this.props.user.user.email,
        phone: this.props.user.user.profile.phone,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && nextProps.user && nextProps.user !== this.props.user) {
      this.props.hideLoading();
    }
    if (typeof nextProps.user === 'undefined' || (typeof nextProps.user !== 'undefined' && nextProps.user !== null && typeof nextProps.user.user === 'undefined') || (typeof nextProps.user !== 'undefined' && nextProps.user === null)) {
      nextProps.pushState('/' + nextProps.locale + '/customer/login');
    }
    if (typeof nextProps.user !== 'undefined' && typeof nextProps.user.user !== 'undefined' && nextProps.user.user !== null && typeof nextProps.user.user.profile !== 'undefined') {
      this.setState({
        firstName: nextProps.user.user.profile.firstName,
        lastName: nextProps.user.user.profile.lastName,
        email: nextProps.user.user.email,
        phone: nextProps.user.user.profile.phone,
      });
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
    oldState.errorEmail = !this.isEmailAddress(oldState.email.trim());
    if ((!oldState.errorLastName && !oldState.errorFistName && !oldState.errorPhone && !oldState.errorEmail) && this.props.user.token) {
      const dataToSend = {
        id_user: this.props.user.user.id,
        email: oldState.email,
        lastName: oldState.lastName,
        firstName: oldState.firstName,
        phone: oldState.phone
      };
      this.props.showLoading();
      this.props.updateDataPerso(dataToSend, this.props.user.token);
    }
  }

  render() {
    const styles = require('./Info.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.signup}>
        <Helmet title={I18n.t('customerSidebar.data')}/>

        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div className="col-xs-12 col-sm-4">
                  <Sidebar index={1}/>
                </div>
                <div
                  className={styles.colImgSquare + ' col-sm-8 col-md-8'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>{I18n.t('customerSidebar.data')}
                    <hr/>
                  </h1>
                  <div className="clear clearfix"></div>
                  <div className="row">
                    {typeof this.props.updated !== 'undefined' && this.props.updated !== null && this.props.updated &&
                    <div className="col-md-12">
                      <h4 className={styles.h4Success}>{I18n.t('customer.updated')}</h4>
                    </div>} {typeof this.props.updateError !== 'undefined' && this.props.updateError !== null && this.props.updateError.error &&
                  <div className="col-md-12">
                    <h4 className={styles.h4error}>{I18n.t('customer.noUpdated')}</h4>
                  </div>}
                    <div className="clear clearfix"></div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className={styles.labelForm}>{I18n.t('customer.firstName')} <span
                          className={styles.redStars}>*</span></label>
                        <input type="text"
                               defaultValue={this.state.firstName}
                               value={this.state.firstName}
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
                               defaultValue={this.state.lastName}
                               value={this.state.lastName}
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
                               defaultValue={this.state.email}
                               value={this.state.email}
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
                               defaultValue={this.state.phone}
                               value={this.state.phone}
                               className={styles.inputForm + ' ' + ((this.state.errorPhone) ? styles.inputErrorForm : '') + ' form-control'}
                               onChange={this.change.bind(this, 'phone')}
                        />
                        {(this.state.errorPhone) &&
                        <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                      </div>
                    </div>
                    <div className="clear clearfix"></div>
                    <div className="col-md-6 col-md-push-6">
                      <a className={styles.submitForm} onClick={() => this.save()}>{I18n.t('customer.save')}</a>
                    </div>
                    <div className="clear clearfix"></div>
                    <div className="col-md-6">
                      <p className={styles.fieldsRequest}>* {I18n.t('customer.fieldsRequest')}</p>
                    </div>
                    <div className="clear clearfix"></div>
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
