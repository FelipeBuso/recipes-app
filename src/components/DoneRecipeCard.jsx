import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

export default function DoneRecipeCard({ recipe, index }) {
  const path = `/${recipe.type}s/${recipe.id}`;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ path }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {(recipe.type === 'comida') ? (
            `${recipe.area} - ${recipe.category}`) : recipe.alcoholicOrNot }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneData }</p>
      <ShareButton
        dataTestid={ `${index}-horizontal-share-btn` }
        type={ recipe.type }
        id={ recipe.id }
      />
      <ol>
        {
          (recipe.tags) && recipe.tags.map((element, key) => (
            <li
              key={ key }
              data-testid={ `${index}-${element}-horizontal-tag` }
            >
              { element }
            </li>
          ))
        }
      </ol>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.isRequired,
  recipe: PropTypes.isRequired,
};
