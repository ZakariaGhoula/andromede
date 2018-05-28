import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {LinkContainer} from 'react-router-bootstrap';
import {logout} from 'redux/modules/auth';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale
}), {logout})
export default class Sidebar extends Component {
  static propTypes = {
    locale: PropTypes.string,
    logout: PropTypes.func,
    index: PropTypes.number
  };

  logoutAsk = () => {
    if (confirm(I18n.t('customer.confLogout'))) {
      this.props.logout();
    }
  }

  render() {
    const styles = require('./Customer.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.sidebar}>
        <h3>{I18n.t('customerSidebar.account')}</h3>
        <ul>
          <li><LinkContainer to={'/' + this.props.locale + '/customer/info'}
                             className={this.props.index === 1 ? styles.sidebarActive : ''}><a>{I18n.t('customerSidebar.data')}</a></LinkContainer>
          </li>
          <li><LinkContainer to={'/' + this.props.locale + '/customer/address'}
                             className={this.props.index === 2 ? styles.sidebarActive : ''}><a>{I18n.t('customerSidebar.address')}</a></LinkContainer></li>
          <li><LinkContainer to={'/' + this.props.locale + '/customer/password'}
                             className={this.props.index === 3 ? styles.sidebarActive : ''}><a>{I18n.t('customerSidebar.pwd')}</a></LinkContainer>
          </li>
        </ul>
        <h3>{I18n.t('customerSidebar.order')}</h3>
        <ul>
          <li><LinkContainer to={'/' + this.props.locale + '/customer/list-order'}
                             className={this.props.index === 4 ? styles.sidebarActive : ''}><a>{I18n.t('customerSidebar.list')}</a></LinkContainer>
          </li>
        </ul>
        <ul className={styles.sidebarLogout}>
          <li><a onClick={() => this.logoutAsk()}>{I18n.t('customerSidebar.logout')}</a></li>
        </ul>
      </div>
    );
  }
}
