import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {createMarkup} from '../../components/createHtml';
import {LinkContainer} from 'react-router-bootstrap';
import {loadCollection} from 'redux/modules/content';
import WheelReact from 'wheel-react';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale,
  shop: state.content.shop,
  loadingShop: state.content.loadingShop,
  loadedShop: state.content.loadedShop
}), {loadCollection, hideLoading, showLoading})
export default class Shop extends Component {
  static propTypes = {
    locale: PropTypes.string,
    shop: PropTypes.object,
    params: PropTypes.object,
    loadedShop: PropTypes.boolean,
    loadingShop: PropTypes.boolean,
    loadCollection: PropTypes.func,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
  };


  constructor(props) {
    super(props);
    WheelReact.config({
      left: () => {
        console.log('wheel left detected.');
      },
      right: () => {
        console.log('wheel right detected.');
      },
      up: () => {
        if (this.props.loadedShop && this.props.shop.products && this.props.shop.products.length > 0) {
          this.setState({
            blockPage: (this.state.blockPage === this.props.shop.products.length - 1) ? this.state.blockPage : this.state.blockPage + 1
          });
        }
      },
      down: () => {
        if (this.props.loadedShop && this.props.shop.products && this.props.shop.products.length > 0) {
          this.setState({
            blockPage: (this.state.blockPage === 0) ? 0 : this.state.blockPage - 1
          });
        }
      }
    });
  }

  state = {
    showDescCollection: false,
    showDescProduct: true,
    blockPage: null,
    current: 0, horizontal: true, swipe: true, factor: 0.3, loop: true
  }

  componentWillMount() {
    this.props.loadCollection(this.props.locale, 1);
    this.props.showLoading();
  }


  componentWillReceiveProps(nextPros) {
    if (nextPros.loadedShop && !nextPros.loadingShop) {
      this.props.hideLoading();
      if (nextPros.shop.products && nextPros.shop.products.length > 0) {
        this.setState({blockPage: 0});
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window !== null) {
      WheelReact.clearTimeout();
    }
  }

  render() {
    const styles = require('./Shop.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.product}>
        <div>
          <Helmet title="La boutique"/>
          {this.props.loadedShop && this.props.shop.products && this.props.shop.products.length > 0 && this.props.shop.products.map(function fct(data, index) {
            if (this.state.blockPage !== null && index === this.state.blockPage) {
              return (<section className={styles.sectionIntroCollections} key={index} {...WheelReact.events}>
                <div className={styles.containerBlock}>
                  <div className={' container-fluid'}>
                    <div className={' row'}>
                      <div className={styles.singleOrangeColor + ' col-sm-5 col-md-6  col-lg-5'}>
                        <div className={styles.blockRight}>
                          <h4
                            className={styles.titleBlack}>Collection</h4>
                          <div className="clear clearfix"></div>
                          <h2
                            className={styles.titleMain}>{this.props.shop.collection && this.props.shop.collection.title}
                            <div className="clear clearfix"></div>
                            <hr/>
                            <div className="clear clearfix"></div>
                          </h2>
                          <div className="clear clearfix"></div>
                          <div className={styles.imgDescCollection}
                               onMouseEnter={() => this.setState({showDescCollection: true})}
                               onMouseLeave={() => this.setState({showDescCollection: false})}>
                            {this.props.shop.collection && this.props.shop.collection.media && this.props.shop.collection.media.length > 0 &&
                            <img src={'/' + this.props.shop.collection.media[0].path} alt=""/>
                            }
                            {this.props.shop.collection && this.props.shop.collection.content && this.state.showDescCollection &&
                            <div className={styles.descriptionText}>
                              <div dangerouslySetInnerHTML={createMarkup(this.props.shop.collection.content)}/>
                            </div>}
                            <div className={styles.descriptionTextMobile}>
                              <div dangerouslySetInnerHTML={createMarkup(this.props.shop.collection.content)}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.colImgSquare + ' col-sm-7 col-md-6 col-lg-7 hidden-xs'}
                        ref={'scoller'}>
                        {data.media && data.media.length > 0 && <div className={styles.blockProductImg}
                                                                     onMouseEnter={() => this.setState({showDescProduct: true})}
                                                                     onMouseLeave={() => this.setState({showDescProduct: false})}>
                          <img src={'/' + data.media[0].path} alt=""/>
                          {this.props.shop.collection && this.props.shop.collection.content && this.state.showDescProduct &&
                          <div className={styles.descriptionTextProduct}>
                            <div className={styles.descriptionTextProductTable}>
                              <div className={styles.descriptionTextProductTableCell}>
                                <h3>{data.title}</h3>
                                <div dangerouslySetInnerHTML={createMarkup(data.content)}/>
                                <LinkContainer className={styles.readMoreBtn}
                                               to={'/' + this.props.locale + '/product/' + data.url}><a>{I18n.t('home.details')}</a></LinkContainer>
                              </div>
                            </div>
                          </div>}
                        </div>}
                        <div className="clear clearfix"></div>
                        <div className="clear clearfix"></div>
                        <div className={styles.paginationItem}>
                          <div className={styles.paginationItemRelative}>
                            <span
                              className={styles.numberPagination}>{(parseInt(this.state.blockPage, 10) < 10 ? '0' : '') + parseInt(parseInt(this.state.blockPage, 10) + 1, 10)}</span>
                            <div className={styles.paginationBar}></div>
                            <ul>
                              {this.props.shop.products.map(function fct2(data2, index2) {
                                return (<li onClick={() => this.setState({blockPage: index2})}
                                            className={(index2 === this.state.blockPage) ? styles.liActivePage : styles.liPage}></li>);
                              }, this)}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="clear clearfix"></div>
                    </div>
                  </div>
                </div>
              </section>);
            }
          }, this)}
          <div className="clear clearfix"></div>
          {this.props.loadedShop && <div className={styles.productMobile}>
            {this.props.shop.products && this.props.shop.products.length > 0 && this.props.shop.products.map(function fct(data, index) {
              return (<div className={styles.colImgSquare + ' col-sm-7 col-md-6 col-lg-7'} key={index}><LinkContainer
                to={'/' + this.props.locale + '/product/' + data.url}><a>
                {data.media && data.media.length > 0 && <div className={styles.blockProductImg}>
                  <img src={'/' + data.media[0].path} alt=""/>
                </div>}
                <div className="clear clearfix"></div>
                <h4>{data.title}</h4>
                <div className="clear clearfix"></div>
                <p>{data.price}€</p>

                <div className="clear clearfix"></div>
              </a></LinkContainer></div>);
            }, this)}
          </div>}
          <div className="clear clearfix"></div>
        </div>
      </div>
    );
  }
}
