import React, {Component, PropTypes} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

@connect(state => ({locale: state.i18n.locale}))
export default class Selections extends Component {
  static propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    data: PropTypes.object,
  }

  render() {
    const styles = require('./selections.scss');
    return (<section className={styles.sectionIntro}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className={styles.title}>{this.props.title}
                <hr/>
              </h2>
            </div>
            <div className="clear clearfix"></div>
          </div>
          <div className="clear clearfix"></div>
        </div>
        <div className="clear clearfix"></div>
        <div className={styles.blockMiBlack}>
          <div className="container">
            <div className="row">
              {this.props.data.map(function fct(data, index) {
                let className = 'col-xs-6 col-sm-4';
                if (index === 2) {
                  className = 'hidden-xs col-sm-4';
                }
                if (this.props.data.length === 2) {
                  className = 'col-xs-6 col-sm-4 col-sm-push-2';
                }
                return (<div className={className} key={index}>
                  <LinkContainer to={'/' + this.props.locale + '/product/' + data.url} className={styles.itemSelect}><a>
                    <div className={styles.itemSelectImg}>
                      {data.media.length > 0 && <img src={'/' + data.media[0].path}/>}
                    </div>
                    <div className="clear clearfix"></div>
                    <h4>{data.title}</h4>
                    <div className="clear clearfix"></div>
                    <p>{data.price}€</p>
                  </a>
                  </LinkContainer>
                </div>);
              }, this)}
              <div className="clear clearfix"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
