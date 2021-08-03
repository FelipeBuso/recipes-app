import React from 'react';
import PropTypes from 'prop-types';

function RecomendedFood(props) {
  const { category, title, img, dataTestid } = props;
  return (
    <div data-testid={ dataTestid }>
      <img src={ img } alt="imagem de um drink" />
      <p>{ category }</p>
      <h4>{ title }</h4>
    </div>
  );
}

RecomendedFood.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default RecomendedFood;
