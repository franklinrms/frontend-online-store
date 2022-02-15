import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsDetails } from '../services/api';
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
    };
  }

  async componentDidMount() {
    this.totalItems(); // Requisito 13
    const { match: { params: { id } } } = this.props;
    const productDetails = await getProductsDetails(id);
    const { title, thumbnail, attributes, price, shipping } = productDetails;
    this.setState({ title, thumbnail, attributes, price, shipping });
    const itensReviewStorage = JSON.parse(localStorage.getItem(id));

    if (itensReviewStorage !== null) {
      this.setState((prevState) => ({
        itensReview: [...prevState.itensReview, ...itensReviewStorage] }));
    }
  }

  onChangeEmailTextarea({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  onChangeCheckbox({ target }) {
    const checkboxId = target.id;

    if (checkboxId === 'one') {
      this.setState({
        checkedOne: true,
        checkedTwo: false,
        checkedThee: false,
        checkedFour: false,
        checkedFive: false,
        itemReviewStar: 1,
      });
    } else if (checkboxId === 'two') {
      this.setState({
        checkedOne: true,
        checkedTwo: true,
        checkedThee: false,
        checkedFour: false,
        checkedFive: false,
        itemReviewStar: 2,
      });
    } else if (checkboxId === 'thee') {
      this.setState({
        checkedOne: true,
        checkedTwo: true,
        checkedThee: true,
        checkedFour: false,
        checkedFive: false,
        itemReviewStar: 3,
      });
    } else if (checkboxId === 'four') {
      this.setState({
        checkedOne: true,
        checkedTwo: true,
        checkedThee: true,
        checkedFour: true,
        checkedFive: false,
        itemReviewStar: 4,
      });
    } else {
      this.setState({
        checkedOne: true,
        checkedTwo: true,
        checkedThee: true,
        checkedFour: true,
        checkedFive: true,
        itemReviewStar: 5,
      });
    }
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
    const { title, price } = this.state;
    if (!shoppingCartItems[id]) {
      shoppingCartItems[id] = { quantity: 1, title, id, price };
    } else {
      shoppingCartItems[id].quantity += 1;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartItems));
    this.totalItems(); // Requisito 13
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
    } = this.state;

    return (
      <div data-testid="product-detail-name">
        <h2>{ title }</h2>
        {shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>}
        <p>{ price }</p>
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
