import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  padding-top: 10px;
  width: 280px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-left: 20px;
`;

class Categories extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <Conteiner>
        <Title>Categorias:</Title>
        { categories }
      </Conteiner>);
  }
}

Categories.propTypes = { categories: PropTypes.arrayOf(PropTypes.object).isRequired };
export default Categories;
