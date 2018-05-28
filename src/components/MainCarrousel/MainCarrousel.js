import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';

@connect(state => ({locale: state.i18n.locale}))
export default class MainCarrousel extends Component {
  static propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }

  render() {
    const styles = require('./maincarousel.scss');
    const settings = {
      dots: false,
      fade: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      draggable: false,
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
    return (<section className={styles.mainCaroussel}>
        <Slider {...settings}>
          <img src="/files/images/home/slider/image1@2x.jpg"/>
          <img src="/files/images/home/slider/image2@2x.jpg"/>
        </Slider>
      </section>
    );
  }
}
