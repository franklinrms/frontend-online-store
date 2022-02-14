import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { title, price, thumbnail, addToCart, id } = this.props;
    return (
      <div data-testid="product">
        <h2>{ title }</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <Link
          data-testid="product-detail-link"
          to={ `/productdetail/${id}` }
        >
          Detalhes

        </Link>
        <button
          onClick={ () => addToCart(this.props) }
          type="button"
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default Card;
