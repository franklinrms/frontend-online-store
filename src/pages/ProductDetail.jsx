import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonShoppingCart from '../components/ButtonShoppingCart';

class ProductDetail extends Component {
  addToCart2 = () => {
    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCartItems === null) { shoppingCartItems = {}; }
    const { location } = this.props;
    const { details } = location;
    const { id, title } = details;
    if (!shoppingCartItems[id]) {
      shoppingCartItems[id] = { quantity: 1, title };
    } else {
      shoppingCartItems[id].quantity += 1;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartItems));
  }

  render() {
    const { location } = this.props;
    const { details } = location;
    const { title, price, thumbnail, attributes } = details;

    return (
      <div data-testid="product-detail-name">
        <h2>{ title }</h2>
        <p>{ price }</p>
        <img src={ thumbnail } alt={ title } />
        <ul>
          {attributes.map((attribute) => (

            <li key={ attribute.id }>
              {`${attribute.name}: ${attribute.value_name}`}
            </li>))}
        </ul>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart2 }
          type="button"
        >
          Adicionar ao carrinho
        </button>
        <ButtonShoppingCart />

      </div>
    );
  }
}

ProductDetail.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  details: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ProductDetail;
