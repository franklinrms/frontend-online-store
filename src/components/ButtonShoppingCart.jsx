import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ButtonShoppingCart extends Component {
  render() {
    const { total } = this.props;

    return (
      <Link
        data-testid="shopping-cart-button"
        to="/shoppingcart"
      >
        Carrinho de Compras
        <p
          data-testid="shopping-cart-size"
        >
          { total }
        </p>
      </Link>
    );
  }
}

ButtonShoppingCart.propTypes = {
  total: PropTypes.number,
}.isRequired;

export default ButtonShoppingCart;
