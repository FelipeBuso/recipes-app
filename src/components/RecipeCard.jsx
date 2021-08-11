import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getIds } from '../services';

export default function RecipeCard({ recipe, type, index }) {
  const { image, name, id } = getIds(type, recipe);
  return (
    <Link to={ `/comidas/${id}` }>
      <Card
        data-testid={ `${index}-recipe-card` }
        className="d-flex flex-column align-items-center p-3 my-2"
        style={ { backgroundColor: type.includes('ebida') ? '#a73d7e' : '#fcdc4d',
          color: 'black' } }
      >
        <Card.Img
          width="100px"
          src={ image }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <Card.Title data-testid={ `${index}-card-name` }>{ name }</Card.Title>
      </Card>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.isRequired,
  type: PropTypes.string.isRequired,
};
