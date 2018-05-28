import React, {Component, PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({
  locale: state.i18n.locale
}))

export default class Footer extends Component {
  static propTypes = {
    locale: PropTypes.string,
    countItem: PropTypes.number,
    setLocale: PropTypes.func,
    dispatch: PropTypes.func
  }
  state = {
    show: true,
    positionScroll: 0
  }

  render() {
    const styles = require('./footer.scss');
    return (
      <div className={styles.mainFooter}>
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-sm-4  col-lg-3">
              <h4>Andromède et Persée</h4>
              <hr/>
              <div className="clear clearfix"></div>
              <ul>
                <li><LinkContainer to={'/' + this.props.locale + '/livraison'}><a>{I18n.t('footer.deliveryPolicy')}</a></LinkContainer></li>
                <li><LinkContainer to={'/' + this.props.locale + '/donnees-personnelles'}><a>Protection des données personnelles</a></LinkContainer></li>
              </ul>
              <div className="clear clearfix"></div>
            </div>
            <div className="col-xs-6  col-sm-4 col-lg-3">
              <h4>{I18n.t('footer.findUs')}</h4>
              <hr/>
              <div className="clear clearfix"></div>
              <ul>
                <li><LinkContainer to={'/fr/boutique'}><a>{I18n.t('footer.shop')}</a></LinkContainer></li>
              </ul>
              <div className="clear clearfix"></div>
            </div>
            <div className="clear clearfix visible-xs-block hidden-sm-up"></div>
            <div className="col-sm-4  col-lg-3">
              <h4>{I18n.t('footer.pro')}</h4>
              <hr/>
              <div className="clear clearfix"></div>
              <ul>
                <li><p>{I18n.t('footer.questionPro')}</p></li>
                <li><p>{I18n.t('footer.contactUsPro')}</p></li>
                <li><a href="mailto:contact@andromedeetpersee.com">contact@andromedeetpersee.com</a></li>
              </ul>
            </div>
            <div className="col-sm-4  col-lg-3">
              <h4>{I18n.t('footer.social')}</h4>
              <hr/>
              <div className="clear clearfix"></div>
              <ul>
                <li><a href="https://www.facebook.com/Andromedeetpersee/" target="_blank">Facebook</a></li>
                <li><a href="https://www.instagram.com/andromede.persee/?hl=fr" target="_blank">Instagram</a></li>
                <li><a>Google Plus</a></li>
              </ul>
            </div>
            <div className="clear clearfix"></div>
          </div>
          <div className={styles.copyrightDiv + ' row'}>
            <div className="col-md-6">
              <p>{I18n.t('footer.copyright')}</p>
            </div>
            <div className={styles.copyrightDownRight + ' col-md-6'}>
              <LinkContainer
                to={'/' + this.props.locale + '/mentions-legales'}><a>{I18n.t('footer.legal')}</a></LinkContainer>
              <LinkContainer to={'/fr/conditions-generales-de-vente'}><a>{I18n.t('footer.cgv')}</a></LinkContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
