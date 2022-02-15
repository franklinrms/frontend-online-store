import React from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {
  render() {
    const { itemReviewEmail,
      onChangeEmailTextarea,
      checkedOne,
      checkedTwo,
      checkedThee,
      checkedFour,
      checkedFive,
      reviewClickButton,
      onChangeCheckbox,
      itemReviewDescription } = this.props;
    return (
      <section>
        <p>Avaliações</p>
        <input
          type="email"
          onChange={ onChangeEmailTextarea }
          data-testid="product-detail-email"
          placeholder="Email"
          value={ itemReviewEmail }
          name="itemReviewEmail"
        />
        <input
          id="one"
          data-testid="1-rating"
          type="checkbox"
          checked={ checkedOne }
          onChange={ onChangeCheckbox }
        />
        <input
          id="two"
          data-testid="2-rating"
          type="checkbox"
          checked={ checkedTwo }
          onChange={ onChangeCheckbox }
        />
        <input
          id="thee"
          data-testid="3-rating"
          type="checkbox"
          checked={ checkedThee }
          onChange={ onChangeCheckbox }
        />
        <input
          id="four"
          data-testid="4-rating"
          type="checkbox"
          checked={ checkedFour }
          onChange={ onChangeCheckbox }
        />
        <input
          id="five"
          data-testid="5-rating"
          type="checkbox"
          checked={ checkedFive }
          onChange={ onChangeCheckbox }
        />
        <br />
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Mensagem (opcional)"
          value={ itemReviewDescription }
          onChange={ onChangeEmailTextarea }
          name="itemReviewDescription"
        />
        <br />
        <button
          data-testid="submit-review-btn"
          type="button"
          onClick={ reviewClickButton }
        >
          Avaliar
        </button>
      </section>
    );
  }
}

Review.propTypes = { itemReviewEmail: PropTypes.string.isRequired,
  onChangeEmailTextarea: PropTypes.func.isRequired,
  checkedOne: PropTypes.bool.isRequired,
  checkedTwo: PropTypes.bool.isRequired,
  checkedThee: PropTypes.bool.isRequired,
  checkedFour: PropTypes.bool.isRequired,
  checkedFive: PropTypes.bool.isRequired,
  reviewClickButton: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
  itemReviewDescription: PropTypes.string.isRequired,
};

export default Review;
