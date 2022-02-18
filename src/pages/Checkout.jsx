import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import CartItem from '../components/CartItem';

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
        name,
        email,
        cpf,
        phone,
        cep,
        address,
        payment,
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
        name,
        email,
        cpf,
        phone,
        cep,
        address,
        alert,
        redirect,
      } = this.state;
      return (
        <div>
          {redirect && <Redirect to={ { pathname: '/' } } /> }
          <section>
            <CartItem />
          </section>
          <form>
            <label htmlFor="name">
              <input
                data-testid="checkout-fullname"
                type="text"
                name="name"
                value={ name }
                placeholder="Nome completo"
                onChange={ this.onChangeUser }
              />
            </label>
            <label htmlFor="email">
              <input
                data-testid="checkout-email"
                type="Email"
                name="email"
                value={ email }
                placeholder="Email"
                onChange={ this.onChangeUser }
              />
            </label>
            <label htmlFor="cpf">
              <input
                data-testid="checkout-cpf"
                type="text"
                name="cpf"
                value={ cpf }
                placeholder="CPF"
                onChange={ this.onChangeUser }
              />
            </label>
            <label htmlFor="phone">
              <input
                data-testid="checkout-phone"
                type="text"
                name="phone"
                value={ phone }
                placeholder="Telefone"
                onChange={ this.onChangeUser }
              />
            </label>
            <label htmlFor="cep">
              <input
                data-testid="checkout-cep"
                type="text"
                name="cep"
                value={ cep }
                placeholder="CEP"
                onChange={ this.onChangeUser }
              />
            </label>
            <label htmlFor="address">
              <input
                data-testid="checkout-address"
                type="text"
                name="address"
                value={ address }
                placeholder="Endereço"
                onChange={ this.onChangeUser }
              />
            </label>
            <section>
              <p>Método de Pagamento:</p>
              <label htmlFor="Visa">
                Visa
                <input
                  type="radio"
                  id="visa"
                  onChange={ this.onChangeUser }
                  name="payment"
                />
              </label>
              <label htmlFor="MasterCard">
                MasterCard
                <input
                  type="radio"
                  id=" masterCard"
                  onChange={ this.onChangeUser }
                  name="payment"
                />
              </label>
              <label htmlFor=" Elo">
                Elo
                <input
                  type="radio"
                  id="elo"
                  onChange={ this.onChangeUser }
                  name="payment"
                />
              </label>
              <label htmlFor="Boleto">
                Boleto
                <input
                  type="radio"
                  id="boleto"
                  onChange={ this.onChangeUser }
                  name="payment"
                />
              </label>
            </section>
            <button
              type="button"
              onClick={ this.buy }
            >
              Comprar
            </button>
            <p>{ alert }</p>
          </form>

        </div>
      );
    }
}

export default Checkout;
