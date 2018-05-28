import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {MainCarrousel, IntroPage, IntroCollections, Selections} from './../../components';
import {loadHome} from 'redux/modules/content';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

const I18n = require('react-redux-i18n').I18n;
import {connect} from 'react-redux';

@connect(state => ({
  locale: state.i18n.locale,
  contentHome: state.content.contentHome,
  loadingHome: state.content.loadingHome,
  loadedHome: state.content.loadedHome
}), {loadHome, showLoading, hideLoading})
export default class Home extends Component {
  static propTypes = {
    locale: PropTypes.string,
    contentHome: PropTypes.object,
    params: PropTypes.object,
    loadedHome: PropTypes.boolean,
    loadingHome: PropTypes.boolean,
    loadHome: PropTypes.func,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
  };

  componentWillMount() {
    this.props.loadHome(this.props.locale);
    this.props.showLoading();
  }

  componentWillReceiveProps(nextPros) {
    if (nextPros.loadedHome && !nextPros.loadingHome) {
      this.props.hideLoading();
    }
  }

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title={(this.props.locale === 'en' ? 'Home' : 'La maison')}/>
        <MainCarrousel/>
        <IntroPage title={"La cérémonie du thé"}
                   content={'<p>La maison Andromède et Persée considère la cérémonie du thé\n' +
                   'comme un hors temps, durant lequel chaque feuille de thé se déploie\n' +
                   'précieusement, parfumant l’atmosphère et envoûtant les convives.\n' +
                   'Ce moment est riche d’émotions, de partage et de beauté.\n' +
                   'En somme, c’est un tableau d’art.</p>'}/>
        <div className="clear clearfix"></div>
        {typeof this.props.contentHome !== 'undefined' && this.props.contentHome !== null && typeof this.props.contentHome.collections !== 'undefined' && this.props.contentHome.collections.length > 0 &&
        <IntroCollections data={this.props.contentHome.collections}/>}
        <div className="clear clearfix"></div>
        {typeof this.props.contentHome !== 'undefined' && this.props.contentHome !== null && typeof this.props.contentHome.selections !== 'undefined' && this.props.contentHome.selections.length > 0 &&
        <Selections title={I18n.t('home.selections')} data={this.props.contentHome.selections}/>}
      </div>
    );
  }
}
