import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadCountries} from 'redux/modules/others';
import {register} from 'redux/modules/auth';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {updatePwd, resetUpdate} from 'redux/modules/auth';
import {hideCart} from 'redux/modules/cart';
import {push} from 'react-router-redux';
import Sidebar from '../Sidebar';

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
}), {loadCountries, register, hideCart, resetUpdate, updatePwd, showLoading, hideLoading, pushState: push})
export default class Pwd extends Component {
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
    updatePwd: PropTypes.func,
    hideCart: PropTypes.func,
    pushState: PropTypes.func,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
    resetUpdate: PropTypes.func,
  };

  state = {
    oldPassword: '',
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
    if (this.props.user && nextProps.user && nextProps.user !== this.props.user) {
      this.props.hideLoading();
    }
    if (this.props.user && nextProps.user && nextProps.user !== this.props.user) {
      this.props.hideLoading();
    }
    if (typeof nextProps.user === 'undefined' || (typeof nextProps.user !== 'undefined' && nextProps.user !== null && typeof nextProps.user.user === 'undefined') || (typeof nextProps.user !== 'undefined' && nextProps.user === null)) {
      nextProps.pushState('/' + nextProps.locale + '/customer/login');
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
    if (keyState === 'oldPassword') {
      oldState.oldPassword = event.target.value.trim();
      oldState.errorOldPassword = event.target.value.trim().length <= 3;
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
    oldState.errorOldPassword = oldState.oldPassword.trim().length <= 3;
    oldState.errorPassword = oldState.password.trim().length <= 3;
    oldState.errorConfirmPassword = oldState.confirmPassword.trim().length <= 3 || oldState.confirmPassword.trim() !== this.state.password;
    this.setState(oldState);
  }

  save = () => {
    this.validateForm();
    const oldState = Object.assign({}, this.state);

    oldState.errorOldPassword = oldState.oldPassword.trim().length <= 3;
    oldState.errorPassword = oldState.password.trim().length <= 3;
    oldState.errorConfirmPassword = oldState.confirmPassword.trim().length <= 3 || oldState.confirmPassword.trim() !== this.state.password;
    console.log(oldState);
    if ((!oldState.errorOldPassword && !oldState.errorPassword && !oldState.errorConfirmPassword) && this.props.user.token) {
      const dataToSend = {
        id_user: this.props.user.user.id,
        password: oldState.password,
        oldPassword: oldState.oldPassword
      };
      this.props.updatePwd(dataToSend, this.props.user.token);
      this.props.showLoading();
    }
  }

  render() {
    const styles = require('./Info.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.signup}>
        <Helmet title={I18n.t('customerSidebar.pwd')}/>

        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div className="col-xs-12 col-sm-4">
                  <Sidebar index={3}/>
                </div>
                <div
                  className={styles.colImgSquare + ' col-sm-8 col-md-8'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>{I18n.t('customerSidebar.pwd')}
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
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className={styles.labelForm}>{I18n.t('customer.oldPassword')} <span
                          className={styles.redStars}>*</span></label>
                        <input type="password"
                               className={styles.inputForm + ' ' + ((this.state.errorFistName) ? styles.inputErrorForm : '') + ' form-control'}
                               onChange={this.change.bind(this, 'oldPassword')}
                        />
                        {(this.state.errorOldPassword) &&
                        <small className={styles.errMsg}>{I18n.t('customer.fieldRequest')}</small>}
                      </div>
                    </div>

                    <div className="clear clearfix"></div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className={styles.labelForm}>{I18n.t('customer.newPassword')} <span
                          className={styles.redStars}>*</span></label>
                        <input type="password"
                               className={styles.inputForm + ' ' + ((this.state.errorPassword) ? styles.inputErrorForm : '') + ' form-control'}
                               onChange={this.change.bind(this, 'password')}
                        />
                        {(this.state.errorPassword) &&
                        <small className={styles.errMsg}>{I18n.t('customer.passwordError')}</small>}
                      </div>
                    </div>
                    <div className="clear clearfix"></div>
                    <div className="col-md-12">
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
