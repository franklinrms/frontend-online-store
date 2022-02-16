import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  // Função verifyStorage é usada para o requisito 14
  verifyStorage = () => {
    const { emptyStorage, id } = this.props;
    const verify = emptyStorage.find((item) => item === id);
    return verify;
  }

  render() {
    const { title,
      price,
      thumbnail,
      addToCart,
      id,
      shipping,
      availableQuantity,
    } = this.props;

    return (
      <div data-testid="product">
        <h2>{ title }</h2>
        {shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>}
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <p>{`Quantidade: ${availableQuantity}`}</p>
        <Link
          data-testid="product-detail-link"
          to={ `/productdetail/${id}` }
        >
          Detalhes

        </Link>
        <button
          onClick={ () => addToCart(this.props) }
          type="button"
          disabled={ this.verifyStorage() }
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
  available_quantity: PropTypes.number,
}.isRequired;

export default Card;
