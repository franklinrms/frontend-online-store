import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import CartItem from '../components/CartItem';

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
      <div>
        {redirect && <Redirect to={ { pathname: '/checkout' } } /> }
        {itemInformation ? (
          <div>
            <CartItem />
            <button
              type="button"
              data-testid="checkout-products"
              onClick={ this.redirectCheckout }
            >
              Finalizar a Compra
            </button>
          </div>
        ) : (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
