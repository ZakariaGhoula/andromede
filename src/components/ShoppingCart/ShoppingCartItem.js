import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {addToCart, removeFromCart, removeItemFromCart} from 'redux/modules/cart';

@connect(state => ({locale: state.i18n.locale, countItem: state.cart.countItem}), {
  addToCart,
  removeFromCart,
  removeItemFromCart
})
export default class ShoppingCartItem extends Component {
  static propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    data: PropTypes.object,
    removeFromCart: PropTypes.func,
    removeItemFromCart: PropTypes.func,
    addToCart: PropTypes.func,
  }
  addBox = () => {
    this.props.addToCart({
      id: this.props.data.data.id,
      quantity: 1,
      data: this.props.data.data,
      media: this.props.data.media,
      price: this.props.data.price
    });
  }
  removeBox = () => {
    this.props.removeFromCart({
      id: this.props.data.data.id,
      quantity: 1,
      data: this.props.data.data,
      media: this.props.data.media,
      price: this.props.data.price
    });
  }

  deleteItem = () => {
    this.props.removeItemFromCart({
      id: this.props.data.data.id,
    });
  }

  render() {
    const styles = require('./shoppingcart.scss');
    const garbageImg = require('./img/garbage.svg');
    return (<li className={styles.cartItem}>
      {this.props.data.data && this.props.data.media &&
      <div className={styles.cartItemImages}>
        <LinkContainer className={styles.productImage}
                       to={'/' + this.props.locale + '/product/' + this.props.data.data.url}><a><img
          src={'/' + this.props.data.media.path}
          alt={this.props.data.media.alt} className="img-responsive"/></a></LinkContainer>
      </div>
      }
      {this.props.data.data && <div className={styles.productDetails}>
        <p className={styles.productName}><LinkContainer
          to={'/' + this.props.locale + '/product/' + this.props.data.data.url}><a>{this.props.data.data.title}</a></LinkContainer>
        </p>
        <div className={styles.removeItem}>
          <a onClick={() => this.deleteItem()}>
            <img src={garbageImg} alt="Supprimer"/>
          </a>
        </div>
        <div className={styles.productWrapper}>
          <table className={styles.infoWrapper}>
            <tbody>
            <tr>
              <td className={styles.itemDetailsQuantity}>
                <div className={styles.qtyWrapper + ' ' + styles.qtyButtonsWrapper}>
                  <div className={styles.qtyButtons} onClick={() => this.removeBox()}><span>-</span></div>
                  <p
                    className={styles.inputTextQty}>{(parseInt(this.props.data.quantity, 10) < 10 ? '0' : '') + this.props.data.quantity}</p>
                  <div className={styles.qtyButtons} onClick={() => this.addBox()}><span>+</span></div>
                  <div className="clear clearfix"></div>
                </div>
              </td>
              <td className={styles.itemDetails}>{this.props.data.price} €</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>}
      <div className="clear clearfix"></div>
    </li>);
  }
}
