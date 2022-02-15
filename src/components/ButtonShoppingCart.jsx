import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonShoppingCart extends Component {
 state = {
   total: 0,
 }

 componentDidUpdate(prevProps, prevState) {
   const { total } = this.state;
   // const fun = this.totalItems();
   if (total !== prevState) return true;
 }

  totalItems = () => {
    const { total } = this.state;
    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCartItems === null) { shoppingCartItems = {}; }
    const total1 = Object.values(shoppingCartItems)
      .reduce((acc, item) => acc + item.quantity, 0);
    if (total !== total1) {
      this.setState({ total: total1 });
    }
    // return total1;
  }

  render() {
    const { total } = this.state;
    console.log(total);
    return (
      <Link
        data-testid="shopping-cart-button"
        to="/shoppingcart"
        onClick={ this.totalItems() }
      >
        Carrinho de Compras
        <p
          data-testid="shopping-cart-size"
        >
          {total}
        </p>
      </Link>
    );
  }
}

export default ButtonShoppingCart;
