import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({
  locale: state.i18n.locale
}))
export default class Customer extends Component {
  static propTypes = {
    locale: PropTypes.string,
    children: PropTypes.object.isRequired,
  };


  render() {
    const styles = require('./Customer.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.customer}>
        {this.props.children}
      </div>
    );
  }
}
