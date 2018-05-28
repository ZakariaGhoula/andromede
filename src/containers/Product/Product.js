import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {createMarkup} from '../../components/createHtml';
import {LinkContainer} from 'react-router-bootstrap';
import {loadProduct} from 'redux/modules/content';
import {addToCart, removeFromCart} from 'redux/modules/cart';
import {Selections} from './../../components';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import Slider from 'react-slick';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale,
  product: state.content.product,
  dataItem: state.cart.dataItem,
  loading: state.content.loading,
  loaded: state.content.loaded
}), {loadProduct, hideLoading, addToCart, removeFromCart, showLoading})
export default class Product extends Component {
  static propTypes = {
    locale: PropTypes.string,
    product: PropTypes.object,
    dataItem: PropTypes.object,
    params: PropTypes.object,
    loaded: PropTypes.boolean,
    loading: PropTypes.boolean,
    loadProduct: PropTypes.func,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
  };

  componentWillMount() {
    if (this.props.params && this.props.params.url) {
      this.props.loadProduct(this.props.locale, this.props.params.url);
      this.props.showLoading();
    }
  }

  componentWillReceiveProps(nextPros) {
    if (nextPros.loaded && !nextPros.loading) {
      this.props.hideLoading();
    }
    if (this.props.params && this.props.params.url && nextPros.params && nextPros.params.url && nextPros.params.url !== this.props.params.url) {
      this.props.loadProduct(this.props.locale, nextPros.params.url);
      this.props.showLoading();
    }
  }

  addBox = () => {
    if (this.props.loaded && typeof this.props.product !== 'undefined' && typeof this.props.product.data !== 'undefined' && typeof this.props.product.media !== 'undefined' && this.props.product.media.length > 0 && typeof this.props.product.config !== 'undefined' && typeof this.props.product.config.price !== 'undefined') {
      this.props.addToCart({
        id: this.props.product.data.id,
        quantity: 1,
        data: this.props.product.data,
        media: this.props.product.media[0],
        price: this.props.product.config.price
      });
    }
  }
  removeBox = () => {
    if (this.props.loaded && typeof this.props.product !== 'undefined' && typeof this.props.product.data !== 'undefined' && typeof this.props.product.media !== 'undefined' && this.props.product.media.length > 0 && typeof this.props.product.config !== 'undefined' && typeof this.props.product.config.price !== 'undefined') {
      this.props.removeFromCart({
        id: this.props.product.data.id,
        quantity: 1,
        data: this.props.product.data,
        media: this.props.product.media[0],
        price: this.props.product.config.price
      });
    }
  }

  render() {
    const styles = require('./Product.scss');
    const img = require('./img/collection1.jpg');
    // require the logo image both from client and server
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 1800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      draggable: true,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };
    return (
      <div className={styles.product}>
        {this.props.loaded && typeof this.props.product !== 'undefined' && typeof this.props.product.data !== 'undefined' &&
        <div>
          <Helmet title="Product"/>
          <section className={styles.sectionIntroCollections}>
            <div className={styles.containerBlock}>
              <div className={' container-fluid'}>
                <div className={' row'}>
                  <div className={styles.colImgSquare + ' col-sm-6'}>
                    <div className={styles.whiteImgSquare}>
                      {typeof this.props.product.media !== 'undefined' && this.props.product.media.length > 1 &&
                      <Slider {...settings}>
                        {this.props.product.media.map(function fct(media, index) {
                          return (<img src={'/' + media.path} key={index} alt={media.alt}/>);
                        }, this)}
                      </Slider>
                      }
                      {typeof this.props.product.media !== 'undefined' && this.props.product.media.length === 1 &&
                      <img src={'/' + this.props.product.media[0].path} key={0} alt={this.props.product.media[0].alt}/>
                      }
                    </div>

                    <div className="clear clearfix"></div>
                    <LinkContainer to={"/"} className={styles.backBtn}><a>{I18n.t('product.back')}</a></LinkContainer>
                    <div className="clear clearfix"></div>
                  </div>
                  <div className={styles.singleOrangeColor + ' col-sm-6'}>
                    <div className={styles.blockRight}>
                      <h3
                        className={styles.titleBlack}>Collection {typeof this.props.product.collection !== 'undefined' && this.props.product.collection.title}</h3>
                      <div className="clear clearfix"></div>
                      <h1 className={styles.titleMain}>{this.props.product.data.title}
                        <div className="clear clearfix"></div>
                        <hr/>
                        <div className="clear clearfix"></div>
                      </h1>
                      <div className="clear clearfix"></div>
                      <div className="col-md-7" style={{paddingLeft: 0}}>
                        <h5 className={styles.catH5}>{I18n.t('product.desc')}</h5>
                        <div dangerouslySetInnerHTML={createMarkup(this.props.product.data.description)}/>
                      </div>
                      <div className="col-md-5" style={{paddingLeft: 0}}>
                        <h5 className={styles.catH5 + ' ' + styles.catIngredient}>{I18n.t('product.ingredient')}</h5>
                        <div dangerouslySetInnerHTML={createMarkup(this.props.product.data.ingredient)}/>
                      </div>
                      <div className="clear clearfix" style={{marginBottom: 60}}></div>
                      <div className=" visible-xs-block visible-sm hidden-md" style={{paddingLeft: 0}}>
                        <h5 className={styles.catH5}>{I18n.t('product.advice')}</h5>
                        <div dangerouslySetInnerHTML={createMarkup(this.props.product.data.advice)}/>
                      </div>
                      <div className="col-md-7" style={{paddingLeft: 0}}>
                        {typeof this.props.product.config !== 'undefined' && typeof this.props.product.config.price !== 'undefined' &&
                        <span
                          className={styles.price + ' ' + styles.catIngredient}>{this.props.product.config.price}€</span>}
                        {typeof this.props.product.config !== 'undefined' && typeof this.props.product.config.quantity !== 'undefined' && this.props.product.config.quantity > 0 && ((typeof this.props.dataItem !== 'undefined' && typeof this.props.dataItem['product_' + this.props.product.data.id] === 'undefined') || typeof this.props.dataItem === 'undefined') &&
                        <a className={styles.readMoreBtn} onClick={() => this.addBox()}>{I18n.t('product.addBox')}</a>}
                        {typeof this.props.product.config !== 'undefined' && typeof this.props.product.config.quantity !== 'undefined' && this.props.product.config.quantity > 0
                        && typeof this.props.dataItem !== 'undefined' && typeof this.props.dataItem['product_' + this.props.product.data.id] !== 'undefined' && typeof this.props.dataItem['product_' + this.props.product.data.id].quantity > 0 !== 'undefined' &&
                        <a className={styles.readMoreBtnActive}
                        >
                          <div className={styles.btnLess} onClick={() => this.removeBox()}>-1</div>
                          <div
                            className={styles.btnInterior}>{((parseInt(this.props.dataItem['product_' + this.props.product.data.id].quantity, 10) < 10 ? '0' : '') + this.props.dataItem['product_' + this.props.product.data.id].quantity) + ' ' + I18n.t('product.inBox')}</div>
                          <div className={styles.btnLess} onClick={() => this.addBox()}>+1</div>
                        </a>}
                        <div className="clear clearfix"></div>
                      </div>
                      <div className="col-md-5 hidden-xs hidden-sm visible-md visible-lg visible-xl"
                           style={{paddingLeft: 0}}>
                        <h5 className={styles.catH5}>{I18n.t('product.advice')}</h5>
                        <div dangerouslySetInnerHTML={createMarkup(this.props.product.data.advice)}/>
                      </div>
                      <div className="clear clearfix"></div>

                      <div className="clear clearfix"></div>
                    </div>
                  </div>
                  <div className="clear clearfix"></div>
                </div>
              </div>
            </div>
          </section>
          <div className="clear clearfix"></div>
          {typeof this.props.product.suggestions !== 'undefined' && this.props.product.suggestions.length > 0 &&
          <Selections title={I18n.t('product.sameCollection')} data={this.props.product.suggestions}/>}
        </div>}
      </div>
    );
  }
}
/*
  <!--<LinkContainer to={"/"}
                                   className={styles.seeAllBtn}><a>{I18n.t('product.seeAll')}</a></LinkContainer>
 */
