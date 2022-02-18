import React from 'react';

class CartItem extends React.Component {
  state = {
    update: '',
    totalSum: 0,
  }

  componentDidMount() {
    this.totalSum();
  }

  componentDidUpdate(prevState) {
    const { update } = this.state;
    if (update !== prevState) return true;
  }

  totalSum = () => {
    let itemInformation = JSON.parse(localStorage.getItem('shoppingCart'));
    if (itemInformation === null) { itemInformation = {}; }
    let total = 0;
    Object.values(itemInformation).forEach((item) => {
      total += item.price * item.quantity;
    });
    this.setState({ totalSum: total });
  }

  handleAdd = ({ target }) => {
    const { name } = target;
    const itemInformation = JSON.parse(localStorage.getItem('shoppingCart'));
    const item = Object.values(itemInformation).find(({ id }) => id === target.id);
    let quant = item.quantity;
    if (name === 'add' && quant < item.availableQuantity) {
      quant += 1;
    }
    if (name === 'remove' && quant > 0) {
      quant -= 1;
    }
    const update = {
      quantity: quant,
    };
    Object.assign(item, update);
    itemInformation[item.id] = { ...item };
    this.setState({ update: itemInformation });
    localStorage.setItem('shoppingCart', JSON.stringify(itemInformation));
    this.totalSum();
  };

  render() {
    const { totalSum } = this.state;
    let itemInformation = JSON.parse(localStorage.getItem('shoppingCart'));
    if (itemInformation === null) { itemInformation = {}; }
    return (
      <div>
        {Object.values(itemInformation).map((item) => (
          <div
            key={ item.title }
          >
            <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
            <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>
            <button
              onClick={ this.handleAdd }
              data-testid="product-increase-quantity"
              type="button"
              id={ item.id }
              name="add"
            >
              +
            </button>
            <button
              onClick={ this.handleAdd }
              id={ item.id }
              name="remove"
              data-testid="product-decrease-quantity"
              type="button"
            >
              -
            </button>
            <h3>
              R$
              { item.price * item.quantity }
            </h3>
          </div>
        ))}
        <p>{`Total: R$ ${totalSum} `}</p>
      </div>
    );
  }
}
export default CartItem;
