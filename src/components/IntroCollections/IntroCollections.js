import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {createMarkup} from '../createHtml';
import {LinkContainer} from 'react-router-bootstrap';

const I18n = require('react-redux-i18n').I18n;
@connect(state => ({locale: state.i18n.locale}))
export default class IntroCollections extends Component {
  static propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    data: PropTypes.object,
  }

  render() {
    const styles = require('./IntroCollections.scss');
    // const img = require('./img/collection1.jpg');
    console.log(this.props.data[0]);
    return (<section className={styles.sectionIntroCollections}>
        <div className={styles.containerBlock}>
          <div className={' container'}>
            <div className={' row'}>
              <div className={styles.colImgSquare + ' col-sm-6'}>
                <div className={styles.whiteImgSquare}>
                  {this.props.data[0].media[0] &&
                  <img src={'/' + this.props.data[0].media[0].path} alt={this.props.data[0].media[0].alt}/>}
                </div>
              </div>
              <div className={styles.singleOrangeColor + ' col-sm-6'}>
                <div className={styles.blockRight}>
                  <h3 className={styles.titleBlack}>{I18n.t('home.collections')}</h3>
                  <div className="clear clearfix"></div>
                  <h2 className={styles.titleMain}>{this.props.data[0].title}
                    <div className="clear clearfix"></div>
                    <hr/>
                    <div className="clear clearfix"></div>
                  </h2>
                  <div className="clear clearfix"></div>
                  <div className="col-md-7" style={{paddingLeft: 0}}>
                    <div dangerouslySetInnerHTML={createMarkup(this.props.data[0].content)}/>
                  </div>
                  <div className="clear clearfix"></div>
                  <LinkContainer to={'/' + this.props.locale + '/boutique'}
                                 className={styles.readMoreBtn}><a>{I18n.t('home.details')}</a></LinkContainer>
                  <div className="clear clearfix"></div>
                  <span
                    className={styles.number}>{(parseInt(this.props.data[0].id, 10) < 10 ? '0' : '') + this.props.data[0].id}</span>
                  <div className="clear clearfix"></div>
                </div>
              </div>
              <div className="clear clearfix"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
