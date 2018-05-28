import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
// import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import config from '../../config';
import {setLocale} from 'react-redux-i18n';

import {showCart} from 'redux/modules/cart';

const I18n = require('react-redux-i18n').I18n;

@connect(state => ({
  locale: state.i18n.locale,
  user: state.auth.user, countItem: state.cart.countItem
}), {showCart, setLocale})
export default class Header extends Component {
  static propTypes = {
    locale: PropTypes.string,
    countItem: PropTypes.number,
    user: PropTypes.object,
    setLocale: PropTypes.func,
    showCart: PropTypes.func,
    dispatch: PropTypes.func
  }
  state = {
    show: true,
    positionScroll: 0
  }

  componentWillMount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.addEventListener('scroll', this.handleScroll.bind(this), {passive: true});
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window !== null) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll() {
    // do something like call `this.setState`
    // access window.scrollY etc
    if (typeof window !== 'undefined' && window !== null && typeof window.scrollY !== 'undefined') {
      // const actualShouldshow = this.state.show;
      const actualScroll = window.scrollY;
      if (actualScroll < this.state.positionScroll) {
        this.setState({show: true, positionScroll: window.scrollY});
        //  this.shouldShowNavBarResponsive = false;
      } else if (window.scrollY > 50 && actualScroll >= this.state.positionScroll) {
        this.setState({show: false, positionScroll: window.scrollY});
      }
    }
  }

  switchLanguage = (locale) => {
    this.props.setLocale(locale);
  }

  render() {
    const styles = require('./header.scss');
    const logo = require('./img/logo.png');
    const picto = require('./img/picto.png');
    return (
      <Navbar className={styles.mainHeader + ' ' + (this.state.show ? '' : styles.mainHeaderHide)} fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
              <div className={styles.pictoLogo}><img src={picto} title={config.app.title} alt={config.app.title}/></div>
              <h1 className={styles.mainLogo}><img src={logo} title={config.app.title} alt={config.app.title}/></h1>
              <div className="clear clearfix"></div>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <div className={styles.showMobile}>
          {typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.token !== 'undefined' && this.props.user.token !== '' && (
            <LinkContainer to={'/' + this.props.locale + '/customer/info'}
                           className={styles.itemNavA + ' ' + styles.hideMobile}>
              <NavItem eventKey={5}><i className={styles.userSocial}/></NavItem>
            </LinkContainer>)}
          <li className={styles.itemNavA + ' ' + styles.hideMobile}>
            <a onClick={() => this.props.showCart()} eventKey={1}
            ><span className={styles.countItem}>{this.props.countItem}</span>
              <i className={styles.shopCart}/>
            </a>
          </li>
        </div>
        <Navbar.Collapse eventKey={0}>
          <Nav navbar>
            <LinkContainer to={'/' + this.props.locale + '/' + ((this.props.locale === 'en') ? 'shop' : 'boutique')}
                           className={styles.itemNavA}>
              <NavItem eventKey={2}>{I18n.t('header.shop')}</NavItem>
            </LinkContainer>
          </Nav>
          <Nav navbar pullRight>
            {(typeof this.props.user !== 'undefined' && this.props.user === null || typeof this.props.user === 'undefined') && <LinkContainer
              to={'/' + this.props.locale + '/' + ((this.props.locale === 'en') ? 'customer/login' : 'customer/login')}
              className={styles.itemNavA}>
              <NavItem eventKey={2}>{I18n.t('header.login')}</NavItem>
            </LinkContainer>}
            {(typeof this.props.user !== 'undefined' && this.props.user === null || typeof this.props.user === 'undefined') &&
            <LinkContainer
              to={'/' + this.props.locale + '/' + ((this.props.locale === 'en') ? 'customer/signup' : 'customer/signup')}
              className={styles.itemNavA}>
              <NavItem eventKey={2}>{I18n.t('header.signup')}</NavItem>
            </LinkContainer>}
            {typeof this.props.user !== 'undefined' && this.props.user !== null && typeof this.props.user.token !== 'undefined' && this.props.user.token !== '' && (
              <LinkContainer to={'/' + this.props.locale + '/customer/info'}
                             className={styles.itemNavA + ' ' + styles.hideMobile}>
                <NavItem eventKey={5}><i className={styles.userSocial}/></NavItem>
              </LinkContainer>)}
            <li eventKey={1} className={styles.itemNavA + ' ' + styles.hideMobile}
            ><a onClick={() => this.props.showCart()} eventKey={1}><span
              className={styles.countItem}>{this.props.countItem}</span>
              <i className={styles.shopCart}/>
            </a>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
/*

            <NavDropdown eventKey="4" title={this.props.locale.charAt(0).toUpperCase() + this.props.locale.slice(1)}
                         id="nav-dropdown"
                         className={styles.itemNav + ' ' + styles.hideMobile}>
              <li><a role="menuitem" onClick={this.switchLanguage.bind(this, 'fr')}>Français</a></li>
              <li><a role="menuitem" onClick={this.switchLanguage.bind(this, 'en')}>English</a></li>
            </NavDropdown>
<NavDropdown eventKey="4" title={this.props.locale.charAt(0).toUpperCase() + this.props.locale.slice(1)}
                       id="nav-dropdown"
                       className={styles.itemNav}>
            <li><a style={{width: 98}} role="menuitem" onClick={this.switchLanguage.bind(this, 'fr')}>Français</a></li>
            <li><a style={{width: 98}} role="menuitem" onClick={this.switchLanguage.bind(this, 'en')}>English</a></li>
          </NavDropdown>
  <LinkContainer to="/pagination" className={styles.itemNavA}>
              <NavItem eventKey={4}>{I18n.t('header.house')}</NavItem>
            </LinkContainer>
 */
