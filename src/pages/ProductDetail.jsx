import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsDetails } from '../services/api';
import verifyStars from '../services/verifyStars';
import ButtonShoppingCart from '../components/ButtonShoppingCart';
import Review from '../components/Review';

class ProductDetail extends Component {
  constructor() {
    super();
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.reviewClickButton = this.reviewClickButton.bind(this);
    this.onChangeEmailTextarea = this.onChangeEmailTextarea.bind(this);
    this.state = {
      checkedOne: false,
      checkedTwo: false,
      checkedThee: false,
      checkedFour: false,
      checkedFive: false,
      itemReviewStar: 0,
      itemReviewEmail: '',
      itemReviewDescription: '',
      itensReview: [],
      title: '',
      thumbnail: '',
      attributes: [],
      price: '',
      shipping: {},
      totalItens: 0,
      emptyStorage: false,
      availableQuantity: 0,
    };
  }

  async componentDidMount() {
    this.totalItems(); // Requisito 13
    const { match: { params: { id } } } = this.props;
    const productDetails = await getProductsDetails(id);
    const { title, thumbnail, attributes, price, shipping } = productDetails;
    const availableQuantity = productDetails.available_quantity;
    this.setState({ title, thumbnail, attributes, price, shipping, availableQuantity });
    const itensReviewStorage = JSON.parse(localStorage.getItem(id));

    if (itensReviewStorage !== null) {
      this.setState((prevState) => ({
        itensReview: [...prevState.itensReview, ...itensReviewStorage] }));
    }

    let emptyStorage = JSON.parse(localStorage.getItem('emptyStorage')); // Requisito 14
    if (emptyStorage === null) { // Requisito 14
      emptyStorage = false;
    } else {
      emptyStorage = emptyStorage.find((item) => item === id);
    }

    this.setState({ emptyStorage }); // Requisito 14
  }

  onChangeEmailTextarea({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  onChangeCheckbox({ target }) {
    const checkboxId = target.id;

    const stars = verifyStars(checkboxId);
    this.setState({
      checkedOne: stars.checkedOne,
      checkedTwo: stars.checkedTwo,
      checkedThee: stars.checkedThee,
      checkedFour: stars.checkedFour,
      checkedFive: stars.checkedFive,
      itemReviewStar: stars.itemReviewStar,
    });
  }

  // Requisito 13:
  totalItems = () => {
    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCartItems === null) { shoppingCartItems = {}; }
    const totalLocalStorage = Object.values(shoppingCartItems)
      .reduce((acc, item) => acc + item.quantity, 0);
    this.setState({ totalItens: totalLocalStorage });
  }

  addToCart2 = () => {
    let shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCartItems === null) { shoppingCartItems = {}; }
    const { match: { params: { id } } } = this.props;
    const { title, price, availableQuantity } = this.state;
    if (!shoppingCartItems[id]) {
      shoppingCartItems[id] = { quantity: 1, title, id, price, availableQuantity };
    } else {
      shoppingCartItems[id].quantity += 1;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartItems));
    this.totalItems(); // Requisito 13
    this.checkQuantity(id); // Requisito 14
  }

  // Requisito 14
  checkQuantity = (id) => {
    const { availableQuantity } = this.state;
    const shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCart'));
    const cartQuantity = shoppingCartItems[id].quantity;

    const setEmptyStorageLocalStorage = () => {
      let emptyStorageOld = JSON.parse(localStorage.getItem('emptyStorage'));
      if (emptyStorageOld === null) { emptyStorageOld = []; }
      const emptyStorageNew = [...emptyStorageOld, id];
      localStorage.setItem('emptyStorage', JSON.stringify(emptyStorageNew));
    };

    if (cartQuantity === availableQuantity) {
      this.setState(() => ({
        emptyStorage: true }),
      setEmptyStorageLocalStorage);
    }
  }

  reviewClickButton() {
    const { match: { params: { id } } } = this.props;

    const { itemReviewStar,
      itemReviewEmail,
      itemReviewDescription } = this.state;

    if (itemReviewStar === 0 || itemReviewEmail === '') {
      return alert('Preencha todos os campos obrigatórios!');
    }

    const itemReview = {
      stars: itemReviewStar,
      email: itemReviewEmail,
      description: itemReviewDescription,
    };

    const updateLocalStorage = () => {
      const { itensReview } = this.state;
      localStorage.setItem(id, JSON.stringify(itensReview));
    };

    this.setState((prevState) => ({
      itensReview: [...prevState.itensReview, itemReview],
      itemReviewEmail: '',
      itemReviewDescription: '',
      checkedOne: false,
      checkedTwo: false,
      checkedThee: false,
      checkedFour: false,
      checkedFive: false,
    }), updateLocalStorage);
  }

  render() {
    const { checkedOne,
      checkedTwo,
      checkedThee,
      checkedFour,
      checkedFive,
      itemReviewEmail,
      itemReviewDescription,
      itensReview,
      title,
      thumbnail,
      attributes,
      price,
      shipping,
      totalItens,
      emptyStorage,
      availableQuantity,
    } = this.state;

    return (
      <div data-testid="product-detail-name">
        <h2>{ title }</h2>
        {shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>}
        <p>{ price }</p>
        <p>{`Quantidade: ${availableQuantity}`}</p>
        <img src={ thumbnail } alt={ title } />
        <ul>
          {attributes.map((attribute) => (

            <li key={ attribute.id }>
              {`${attribute.name}: ${attribute.value_name}`}
            </li>))}
        </ul>
        <ButtonShoppingCart total={ totalItens } />
        <Review
          itemReviewEmail={ itemReviewEmail }
          itemReviewDescription={ itemReviewDescription }
          onChangeEmailTextarea={ this.onChangeEmailTextarea }
          onChangeCheckbox={ this.onChangeCheckbox }
          reviewClickButton={ this.reviewClickButton }
          checkedOne={ checkedOne }
          checkedTwo={ checkedTwo }
          checkedThee={ checkedThee }
          checkedFour={ checkedFour }
          checkedFive={ checkedFive }
        />
        <section>
          {itensReview.map((itenReview, index) => (
            <div key={ index }>
              <p>{itenReview.email}</p>
              <p>{itenReview.stars}</p>
              <p>{itenReview.description}</p>
            </div>))}
        </section>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart2 }
          disabled={ emptyStorage }
          type="button"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}
ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};
ProductDetail.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};
export default ProductDetail;
