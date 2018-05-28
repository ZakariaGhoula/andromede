import React, {Component, PropTypes} from 'react';
import {createMarkup} from '../createHtml';
// import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

// const I18n = require('react-redux-i18n').I18n;

@connect(state => ({locale: state.i18n.locale}))
export default class IntroPage extends Component {
  static propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    const styles = require('./intropage.scss');
    return (<section className={styles.sectionIntro}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className={styles.title}>{this.props.title}
                <hr/>
              </h2>
            </div>
            <div className="clear clearfix"></div>
            <div className={styles.contentIntroText + ' col-md-8 col-md-push-2'}>
              <div dangerouslySetInnerHTML={createMarkup(this.props.content)}/>
            </div>
            <div className="clear clearfix"></div>
            <div className="clear clearfix"></div>
          </div>
        </div>
      </section>
    );
  }
}
/*
 <div className="col-xs-12">
              <LinkContainer to={'/'} className={styles.readMoreBtn}><a>{I18n.t('home.read_more')}</a></LinkContainer>
            </div>
 */
