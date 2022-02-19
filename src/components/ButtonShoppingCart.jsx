import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CartIcon = styled.p`
  font-size: 40px;
  margin-top: 12px;
  margin-left: 100px;
`;
const Conteiner = styled.div`
  display: flex;
  justify-items: center;
  justify-content: center;
`;
const Qunt = styled.p`
  color: #222;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;

`;

class ButtonShoppingCart extends Component {
  render() {
    const { total } = this.props;

    return (
      <Link
        data-testid="shopping-cart-button"
        to="/shoppingcart"
      >
        <Conteiner>

          <CartIcon>
            🛒
          </CartIcon>
          <Qunt
            data-testid="shopping-cart-size"
          >
            { total }
          </Qunt>
        </Conteiner>
      </Link>
    );
  }
}

ButtonShoppingCart.propTypes = {
  total: PropTypes.number,
}.isRequired;

export default ButtonShoppingCart;
