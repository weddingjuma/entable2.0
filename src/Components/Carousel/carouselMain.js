import React, { PropTypes } from 'react';
import { Carousel } from 'react-bootstrap/lib';
import styles from './carouselStyles';

class CarouselMain extends React.PureComponent {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.object),
  }
  renderCarousel = () =>
  this.props.transactions.map(trans => (
    <Carousel.Item key={`carousel-${trans._id}`}>
      <h3 style={styles.h3}>{trans.bank}</h3>
      <img
        role="presentation"
        style={styles.image}
        src={`${trans.image}`}
      />
      <Carousel.Caption>
        <div style={styles.captionContainer}>
          <h3 style={styles.captionH3}>{trans.name}</h3>
          <p style={styles.captionDesc}>
            {trans.description}
          </p>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  render() {
    return (
      <div>
        <Carousel>
          {this.renderCarousel()}
        </Carousel>
      </div>
    );
  }
}
export default CarouselMain;
