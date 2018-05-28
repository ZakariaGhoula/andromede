import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ShoppingCartItem from './ShoppingCartItem';
import {showCart, hideCart} from 'redux/modules/cart';

import {LinkContainer} from 'react-router-bootstrap';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale,
  countItem: state.cart.countItem,
  dataItem: state.cart.dataItem
}), {showCart, hideCart})
export default class ShoppingCart extends Component {
  static propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    dataItem: PropTypes.object,
    countItem: PropTypes.number,
    hideCart: PropTypes.func,
    showCart: PropTypes.func,
  }

  render() {
    let finalPrice = 0;
    let items = 0;
    for (const ind in this.props.dataItem) {
      if (this.props.dataItem[ind]) {
        finalPrice += this.props.dataItem[ind].quantity * this.props.dataItem[ind].price;
        items += this.props.dataItem[ind].quantity;
      }
    }
    const styles = require('./shoppingcart.scss');
    const closeImg = require('./img/multiply.svg');
    return (<div className={styles.shoppingcart}>
      <div className={styles.minicartWrapper}>
        <a className={styles.close + ' ' + styles.skipLinkClose} title="Fermer"
           onClick={() => this.props.hideCart()}><img src={closeImg}/></a>
        {this.props.countItem > 0 && <div className={styles.title}>
          <a className={styles.cartLink}>{I18n.t('shoppingCart.cart')} ({this.props.countItem})</a>
        </div>}
        {this.props.countItem === 0 && <div className={styles.noFound}>{I18n.t('shoppingCart.noProduct')}</div>}
        {this.props.countItem > 0 && <ul id="cart-sidebar" className={styles.miniProductsList}>
          {Object.keys(this.props.dataItem).map(function fct(item, index) {
            return (<ShoppingCartItem key={index} data={this.props.dataItem[item]}/>);
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
          <p className={styles.total}>
            <span className={styles.label}>Total (TVA inc.)</span>
            <span className={styles.price2}>{finalPrice} €</span>
            <div className="clear clearfix"></div>
          </p>
          <div className="clear clearfix"></div>
        </div>
        <div className="clear clearfix"></div>
      </div>}
      {this.props.countItem > 0 &&
      <ul className={styles.checkoutTypes}>
        <li><LinkContainer className={styles.checkoutBtn} to={'/' + this.props.locale + '/checkout'}><a
          title="Payement"> {I18n.t('shoppingCart.checkoutBtn')} | {finalPrice} € </a></LinkContainer></li>
      </ul>}
    </div>);
  }
}
