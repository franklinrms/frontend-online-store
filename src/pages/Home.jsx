import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Categories from '../components/Categories';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import Card from '../components/Card';

const ConteinerMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  `;
const Conteiner = styled.div`
  display: flex;
`;
const ConteinerCategories = styled.div`
  width: 300px;
`;
const ConteinerProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ContainerSearch = styled.div`
  display: flex;
  justify-content: center;
`;
const Search = styled.input`
  width: 519px;
  height: 45px;
  background: #f5f5f5;
  border: 1px solid #3D495C;
  border-radius: 6px;
  margin-top: 20px;
  font-size: 14px;
  padding-left: 10px;
`;
const Button = styled.button`
  width: 134px;
  height: 45px;
  background: #222;
  color: #fff;
  border-radius: 6px;
  margin-top: 20px;
  margin-left: 10px;
`;
const InitialMessage = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 35 px;
  margin-top: 50px;
  opacity:  ${(props) => (props.search !== '' || props.select !== '' ? 0 : 1)} ;
`;
const Label = styled.label`
  font-size: 20px;
  padding: 1px;
  
  &:hover{
    cursor: pointer;
  }
  
`;

class Home extends Component {
  state = {
    categories: [],
    inputValue: '',
    selectedId: '',
    productsItems: [],
    shoppingCart: [],
    totalItens: 0,
    emptyStorage: [],
  }

  async componentDidMount() {
    this.totalItems(); // Requisito 13
    const categories = await getCategories();
    const shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    const categoriesMenu = categories.map((categorie) => (
      <Label htmlFor={ categorie.id } key={ categorie.name } data-testid="category">
        <input
          id={ categorie.id }
          type="radio"
          name="category"
          onChange={ this.handleRadio }
        />
        { categorie.name }
      </Label>));
    let emptyStorage = JSON.parse(localStorage.getItem('emptyStorage')); // Requisito 14
    if (emptyStorage === null) { emptyStorage = []; } // Requisito 14
    this.setState({
      categories: categoriesMenu,
      shoppingCart: shoppingCartItems,
      emptyStorage });
  }

  countShoppingCartItens = (obj) => {
    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCartItems === null) { shoppingCartItems = {}; }
    const { id, title, price } = obj;
    const availableQuantity = obj.available_quantity;
    if (!shoppingCartItems[id]) {
      shoppingCartItems[id] = { quantity: 1, title, id, price, availableQuantity };
    } else {
      shoppingCartItems[id].quantity += 1;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartItems));
    this.totalItems(); // Requisito 13
    this.checkQuantity(obj); // Requisito 14
  }

  handleRadio = async ({ target: { id } }) => {
    this.filterResults(id);
    this.setState({ selectedId: id });
  }

  filterResults = async (productId, inputValue) => {
    const products = await getProductsFromCategoryAndQuery(productId, inputValue);
    this.setState({ productsItems: products.results });
  }

  handleClick = async () => {
    const { inputValue, selectedId } = this.state;
    this.filterResults(selectedId, inputValue);
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  }

  // Requisito 14
  checkQuantity = (obj) => {
    const { id } = obj;
    const shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    const cartQuantity = shoppingCartItems[id].quantity;

    const setEmptyStorageLocalStorage = () => {
      const { emptyStorage } = this.state;
      localStorage.setItem('emptyStorage', JSON.stringify(emptyStorage));
    };

    if (cartQuantity === obj.available_quantity) {
      this.setState((prevState) => ({
        emptyStorage: [...prevState.emptyStorage, id] }),
      setEmptyStorageLocalStorage);
    }
  }

  addToCart = (obj) => {
    this.setState((prevState) => ({
      shoppingCart: { ...prevState.shoppingCart, obj },
    }), () => this.countShoppingCartItens(obj));
  }

  totalItems = () => {
    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCartItems === null) { shoppingCartItems = {}; }
    const totalLocalStorage = Object.values(shoppingCartItems)
      .reduce((acc, item) => acc + item.quantity, 0);
    this.setState({ totalItens: totalLocalStorage });
  }

  render() {
    const { categories,
      inputValue,
      productsItems,
      detailsRedirect,
      totalItens,
      emptyStorage,
      selectedId } = this.state;
    return (
      <ConteinerMain>
        {
          detailsRedirect && <Redirect
            to={ {
              pathname: '/productdetail',
            } }
          />
        }
        <ContainerSearch>
          <Search
            data-testid="query-input"
            type="text"
            onChange={ this.handleChange }
            value={ inputValue }
            placeholder="   🔍   Digite algum termo de pesquisa ou escolha uma categoria."
          />
          <Button onClick={ this.handleClick } data-testid="query-button" type="button">
            Pesquisar
          </Button>
          <ButtonShoppingCart total={ totalItens } />
        </ContainerSearch>
        <InitialMessage
          data-testid="home-initial-message"
          search={ inputValue }
          select={ selectedId }
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </InitialMessage>
        <Conteiner>
          <ConteinerCategories>
            <Categories categories={ categories } />
          </ConteinerCategories>
          <ConteinerProduct>
            {productsItems.map((product) => (
              <Card
                key={ product.id }
                { ...product }
                availableQuantity={ product.available_quantity }
                addToCart={ this.addToCart }
                emptyStorage={ emptyStorage }
              />))}
          </ConteinerProduct>
        </Conteiner>

      </ConteinerMain>
    );
  }
}

export default Home;
