import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadCountries} from 'redux/modules/others';
import {login} from 'redux/modules/auth';

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
  loginError: state.auth.loginError,
}), {loadCountries, login, hideCart, pushState: push})
export default class Login extends Component {
  static propTypes = {
    locale: PropTypes.string,
    loadingCountry: PropTypes.boolean,
    loadedCountry: PropTypes.boolean,
    dataCountries: PropTypes.object,
    location: PropTypes.object,
    user: PropTypes.object,
    loginError: PropTypes.object,
    loadCountries: PropTypes.func,
    hideCart: PropTypes.func,
    pushState: PropTypes.func,
    login: PropTypes.func,
  };

  state = {
    email: '',
    errorEmail: false,
    password: '',
    errorPassword: false,
  }

  componentWillMount() {
    this.props.hideCart();
  }

  componentWillReceiveProps(nextProps) {
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
    if (keyState === 'password') {
      oldState.password = event.target.value.trim();
      oldState.errorPassword = event.target.value.trim().length <= 3;
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
    oldState.errorPassword = oldState.password.trim().length <= 3;
    oldState.errorEmail = !this.isEmailAddress(oldState.email.trim());
    this.setState(oldState);
  }

  save = () => {
    this.validateForm();
    const oldState = Object.assign({}, this.state);

    oldState.errorPassword = oldState.password.trim().length <= 3;
    oldState.errorEmail = !this.isEmailAddress(oldState.email.trim());
    if ((!oldState.errorPassword && !oldState.errorEmail)) {
      const dataToSend = {
        email: oldState.email,
        password: oldState.password
      };
      this.props.login(dataToSend);
    }
  }

  render() {
    const styles = require('./Login.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.signup}>
        <Helmet title={I18n.t('customer.loginTitle')}/>

        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-12'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>{I18n.t('customer.loginTitle')}
                    <hr/>
                  </h1>
                  <div className="clear clearfix"></div>
                  <div className="row">
                    {typeof this.props.loginError !== 'undefined' && this.props.loginError !== null && this.props.loginError.exist && this.props.loginError.wrongPassword &&
                    <div className="col-md-12">
                      <h4 className={styles.h4error}>{I18n.t('customer.errorPassword')}</h4>
                    </div>} {typeof this.props.loginError !== 'undefined' && this.props.loginError !== null && !this.props.loginError.exist &&
                  <div className="col-md-12">
                    <h4 className={styles.h4error}>{I18n.t('customer.errorNoUser')}</h4>
                  </div>}
                    <div className="clear clearfix"></div>
                    <div className="col-md-6 col-md-push-3">
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
                    <div className="clear clearfix"></div>
                    <div className="col-md-6 col-md-push-3">
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
                    <div className="clear clearfix"></div>
                    <div className="col-md-6 col-md-push-3">
                      <a className={styles.submitForm} onClick={() => this.save()}>{I18n.t('customer.loginTitle')}</a>
                    </div>
                    <div className="clear clearfix"></div>
                    <div className="col-md-6">
                      <p className={styles.fieldsRequest}>* {I18n.t('customer.fieldsRequest')}</p>
                    </div>
                    <div className="clear clearfix"></div>
                    <div
                      className="col-xs-12 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3 col-xl-4 col-xs-push-4 align-center">
                      <p className={styles.alreadyAccount}>{I18n.t('customer.registredYet')} <LinkContainer
                        to={'/' + this.props.locale + '/customer/signup' + ((typeof this.props.location.query !== 'undefined' && this.props.location.query !== null && typeof this.props.location.query.redirect !== 'undefined' && this.props.location.query.redirect !== '') ? '?redirect=' + this.props.location.query.redirect : '')}><a>{I18n.t('customer.subscribe')}</a></LinkContainer>
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
