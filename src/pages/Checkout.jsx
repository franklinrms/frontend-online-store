/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import barcode from '../img/barcode.svg';
import credit from '../img/credit-credit.svg';
import CartItem from '../components/CartItem';

const Conteiner = styled.main`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;

`;
const Title = styled.h2`
  font-size: 25px;
  margin-top: 30px;
`;
const ButtonCheckout = styled.button`
  width: 134px;
  height: 45px;
  background: #222;
  color: #fff;
  border-radius: 6px;
  margin-top: 50px;
  cursor: pointer;
`;
const ConteinerProduct = styled.div`
  width:68%;
  margin-top: 20px;
`;
const ConteinerInfo = styled.div`
height: 200px;
display: flex;
align-items: center;
justify-items: center;
margin-left: 50px;

`;
const ConteinerPaymet = styled.div`
display: flex;
margin-left: 50px;
`;
const Inputs = styled.input`
  padding: 12px 16px;
  height: 20px;
  background: #f5f5f5;
  border: 1px solid #3D495C;
  border-radius: 6px;
  margin: 5px;
`;
const Icons = styled.img`
width: 90px;
height: auto;
`;
const Payment = styled.label`
width: 220px;
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px;
font-size: 18px;
`;

class Checkout extends Component {
    state = {
      name: '',
      email: '',
      cpf: '',
      cep: '',
      phone: '',
      address: '',
      payment: '',
      alert: '',
      redirect: false,
    }

    onChangeUser=({ target }) => {
      const { name, value, type, id } = target;

      if (type === 'radio') {
        this.setState({
          payment: id,
        });
      } else {
        this.setState({
          [name]: value,
        });
      }
    }

    buy = () => {
      const {
        name, email, cpf, phone, cep, address, payment,
      } = this.state;

      if (name !== ''
        && email !== ''
        && cpf !== ''
        && cep !== ''
        && phone !== ''
        && address !== ''
        && payment !== ''
      ) {
        localStorage.clear();
        this.setState({
          redirect: true,
        });
      } else {
        this.setState({
          alert: 'Preencha todos os campos',
        });
      }
    }

    render() {
      const {
        name, email, cpf, phone, cep, address, alert, redirect,
      } = this.state;
      return (
        <Conteiner>
          {redirect && <Redirect to={ { pathname: '/' } } /> }
          <Title>Revise seus Produtos</Title>
          <ConteinerProduct>
            <CartItem />
          </ConteinerProduct>
          <Title>Informações do comprador</Title>
          <ConteinerInfo>
            <form>
              <label htmlFor="name">
                <Inputs
                  data-testid="checkout-fullname"
                  type="text"
                  name="name"
                  value={ name }
                  placeholder="Nome completo"
                  onChange={ this.onChangeUser }
                />
              </label>
              <label htmlFor="email">
                <Inputs
                  data-testid="checkout-email"
                  type="Email"
                  name="email"
                  value={ email }
                  placeholder="Email"
                  onChange={ this.onChangeUser }
                />
              </label>
              <label htmlFor="cpf">
                <Inputs
                  data-testid="checkout-cpf"
                  type="text"
                  name="cpf"
                  value={ cpf }
                  placeholder="CPF"
                  onChange={ this.onChangeUser }
                />
              </label>
              <label htmlFor="phone">
                <Inputs
                  data-testid="checkout-phone"
                  type="text"
                  name="phone"
                  value={ phone }
                  placeholder="Telefone"
                  onChange={ this.onChangeUser }
                />
              </label>
              <label htmlFor="cep">
                <Inputs
                  data-testid="checkout-cep"
                  type="text"
                  name="cep"
                  value={ cep }
                  placeholder="CEP"
                  onChange={ this.onChangeUser }
                />
              </label>
              <label htmlFor="address">
                <Inputs
                  data-testid="checkout-address"
                  type="text"
                  name="address"
                  value={ address }
                  placeholder="Endereço"
                  onChange={ this.onChangeUser }
                />
              </label>
            </form>
          </ConteinerInfo>
          <Title>Método de Pagamento:</Title>
          <ConteinerPaymet>
            <Payment htmlFor="visa">
              <input
                type="radio"
                id="visa"
                onChange={ this.onChangeUser }
                name="payment"
              />
              Visa
              <Icons src={ credit } alt="imagem de um cartão de crédito" />
            </Payment>
            <Payment for="masterCard">
              <input
                type="radio"
                id="masterCard"
                onChange={ this.onChangeUser }
                name="payment"
              />
              MasterCard
              <Icons src={ credit } alt="imagem de um cartão de crédito" />
            </Payment>
            <Payment htmlFor="elo">
              <input
                type="radio"
                id="elo"
                onChange={ this.onChangeUser }
                name="payment"
              />
              Elo
              <Icons src={ credit } alt="imagem de um cartão de crédito" />
            </Payment>
            <Payment htmlFor="boleto">
              <input
                type="radio"
                id="boleto"
                onChange={ this.onChangeUser }
                name="payment"
              />
              Boleto
              <Icons src={ barcode } alt="imagem de um boleto" />
            </Payment>
          </ConteinerPaymet>
          <ButtonCheckout
            type="button"
            onClick={ this.buy }
          >
            Comprar
          </ButtonCheckout>
          <Title>{ alert }</Title>
        </Conteiner>
      );
    }
}

export default Checkout;
