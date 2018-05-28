import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadCountries} from 'redux/modules/others';
import {register} from 'redux/modules/auth';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {updatePwd, retrieveOrders, resetUpdate} from 'redux/modules/auth';
import {hideCart} from 'redux/modules/cart';
import {push} from 'react-router-redux';
import Sidebar from '../Sidebar';
import moment from 'moment';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale,
  loadingCountry: state.others.loadingCountry,
  loadedCountry: state.others.loadedCountry,
  dataCountries: state.others.dataCountries,
  user: state.auth.user,
  orders_loaded: state.auth.orders_loaded,

  updateIn: state.auth.updateIn,
  orders: state.auth.orders,
  updated: state.auth.updated,
  updateError: state.auth.updateError,
  registerError: state.auth.registerError,
}), {
  loadCountries,
  register,
  hideCart,
  resetUpdate,
  updatePwd,
  retrieveOrders,
  showLoading,
  hideLoading,
  pushState: push
})
export default class List extends Component {
  static propTypes = {
    locale: PropTypes.string,
    loadingCountry: PropTypes.boolean,
    loadedCountry: PropTypes.boolean,
    orders_loaded: PropTypes.boolean,
    updated: PropTypes.boolean,
    updateIn: PropTypes.boolean,
    dataCountries: PropTypes.object,
    orders: PropTypes.object,
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
    retrieveOrders: PropTypes.func,
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
    if (typeof this.props.user !== 'undefined' && typeof this.props.user.user !== 'undefined' && this.props.user.user !== null && typeof this.props.user.token !== 'undefined') {
      this.props.retrieveOrders(this.props.user.token);
      this.props.showLoading();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orders !== this.props.orders) {
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
        <Helmet title={I18n.t('customerSidebar.list')}/>

        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div className="col-xs-12 col-sm-4">
                  <Sidebar index={4}/>
                </div>
                <div
                  className={styles.colImgSquare + ' col-sm-8 col-md-8'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>{I18n.t('customerSidebar.list')}
                    <hr/>
                  </h1>
                  <div className="clear clearfix"></div>
                  <div className="row">
                    {typeof this.props.orders_loaded !== 'undefined' && this.props.orders_loaded !== null && this.props.orders_loaded && this.props.orders.invoices && this.props.orders.invoices.length === 0 &&
                    <div className="col-md-12">
                      <h4 className={styles.h4error}>{I18n.t('customer.orderEmpty')}</h4>
                    </div>}
                    {typeof this.props.updateError !== 'undefined' && this.props.updateError !== null && this.props.updateError.error &&
                    <div className="col-md-12">
                      <h4 className={styles.h4error}>{I18n.t('customer.noUpdated')}</h4>
                    </div>}
                    <div className="clear clearfix"></div>
                    {typeof this.props.orders_loaded !== 'undefined' && this.props.orders_loaded !== null && this.props.orders_loaded && this.props.orders.invoices && this.props.orders.invoices.length > 0 &&
                    <div className="col-md-12">
                      <table className={'table table-striped ' + styles.tableInvoice}>
                        <thead>
                        <tr>
                          <th>Ref.</th>
                          <th>Date</th>
                          <th>{I18n.t('resa.ttcPrice')}</th>
                          <th>{I18n.t('customer.invoice')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.orders.invoices.map(function fct(data, index) {
                          return (<tr key={index}>
                            <td>{'STR-AP-' + moment(data.date_payment).format('Y') + '-' + data.id_billing}</td>
                            <td>{(this.props.locale === 'en') ? moment(data.date_payment).format('MM/DD/YYYY') : moment(data.date_payment).format('DD/MM/YYYY')}</td>
                            <td>{(data.foreign_shipping === 1) ? parseFloat(data.total_price, 10) + 10 : parseFloat(data.total_price, 10) + 5}€</td>
                            <td><a
                              target="_blank"
                              href={'/invoices/STR-AP-' + moment(data.date_payment).format('Y') + '-' + data.id_billing + '.pdf'}
                              download={'STR-AP-' + moment(data.date_payment).format('Y') + '-' + data.id_billing + '.pdf'}><i
                              className={'fa fa-download'}/></a></td>
                          </tr>);
                        }, this)}
                        </tbody>
                      </table>
                    </div>}
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
