import React from 'react';
import styled from 'styled-components';

const Conteiner = styled.main`
  /* height: 70vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ConteinerItem = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  /* border-top: 1px solid #222; */
  margin-top: 15px;
  margin-left: 50px;
`;
const ConteinerQunt = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10%;
  margin-left: 35px;
  margin-right: 35px;
`;
const ConteinerTitle = styled.div`
  display: flex;
  width: 30%;
`;
const ButtonQunt = styled.button`
  background: #fff;
  color: #222;
  border: none;
  font-weight: bold;
  font-size: 30px;
  padding: 3px;
  cursor: pointer;
`;
const Qunt = styled.p`
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  border: 1px solid #222;
  border-radius: 6px;
  padding: 10px;
`;
const Total = styled.p`
  font-size: 30px;
  margin-top: 30px;
  margin-left: 50px;
`;

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
      <Conteiner>
        {Object.values(itemInformation).map((item) => (
          <ConteinerItem
            key={ item.title }
          >
            <ConteinerTitle>
              <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
            </ConteinerTitle>
            <ConteinerQunt>
              <ButtonQunt
                onClick={ this.handleAdd }
                id={ item.id }
                name="remove"
                data-testid="product-decrease-quantity"
                type="button"
              >
                -
              </ButtonQunt>
              <Qunt data-testid="shopping-cart-product-quantity">{item.quantity}</Qunt>
              <ButtonQunt
                onClick={ this.handleAdd }
                data-testid="product-increase-quantity"
                type="button"
                id={ item.id }
                name="add"
              >
                +
              </ButtonQunt>
            </ConteinerQunt>
            <h3>{`R$ ${item.price * item.quantity}`}</h3>
          </ConteinerItem>
        ))}
        <Total>{`Total: R$ ${totalSum} `}</Total>
      </Conteiner>
    );
  }
}
export default CartItem;
