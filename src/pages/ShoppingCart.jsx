import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import CartItem from '../components/CartItem';

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin-left: 25%;
`;
const ButtonCheckout = styled.button`
  width: 134px;
  height: 45px;
  background: #222;
  color: #fff;
  border-radius: 6px;
  margin-top: 50px;
  margin-left: 23%;
  cursor: pointer;
`;

class ShoppingCart extends Component {
  state = {
    redirect: false,
  };

  // Requisito 12
  redirectCheckout= () => {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    const itemInformation = JSON.parse(localStorage.getItem('shoppingCart'));
    return (
      <Conteiner>
        {redirect && <Redirect to={ { pathname: '/checkout' } } /> }
        {itemInformation ? (
          <div>
            <CartItem />
            <ButtonCheckout
              type="button"
              data-testid="checkout-products"
              onClick={ this.redirectCheckout }
            >
              Finalizar a Compra
            </ButtonCheckout>
          </div>
        ) : (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
      </Conteiner>
    );
  }
}

export default ShoppingCart;
