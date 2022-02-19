import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Conteiner = styled.div`
margin-left: 20px;
margin-bottom: 20px;
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 0px 15px;
width: 290px;
height: 320px;
border: 1px solid #E1E5EB;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
border-radius: 10px;
`;
const Button = styled.button`
  height: 30px;
  background: #222;
  color: #fff;
  font-size: 12px;
  border-radius: 6px; 
  padding: 2px 2px;
  margin-top: 5px;
  cursor: pointer;
`;
const ImageItem = styled.img`
width: 290px;
height: 180px;
border-radius: 10px 10px 0px 0px;
`;
const BasicText = styled.p`
  font-size: 14px;
  margin-right: 9px;
`;
const Text = styled.h2`
font-weight: bold;
font-size: 16px;
color: #3D495C;
margin: 4px 4px;
padding-top: 2px;
`;
const ConteinerInfo = styled.div`
  display: flex;
  height: 20px
`;
const ConteinerTitle = styled.div`
  height: 50px
`;
const ConteinerB = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70px
`;
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
      <Conteiner data-testid="product">
        <ImageItem src={ thumbnail } alt={ title } />
        <ConteinerTitle>
          <Text>{ title }</Text>
        </ConteinerTitle>
        <ConteinerInfo>
          <BasicText>{`Quantidade disponível: ${availableQuantity}`}</BasicText>
          {shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>}
        </ConteinerInfo>
        <ConteinerB>
          <Text>{ `R$ ${price}` }</Text>
          <Link
            data-testid="product-detail-link"
            to={ `/productdetail/${id}` }
          >
            Mais detalhes

          </Link>
          <Button
            onClick={ () => addToCart(this.props) }
            type="button"
            disabled={ this.verifyStorage() }
            data-testid="product-add-to-cart"
          >
            Adicionar ao carrinho
          </Button>
        </ConteinerB>
      </Conteiner>
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
