import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from '../components/ShareButton';

export default function renderDoneRecipes(item, index) {
  return (
    <div key={ index }>
      <Link
        to={
          item.type === 'comida'
            ? `/comidas/${item.id}`
            : `/bebidas/${item.id}`
        }
      >
        <img
          className="visible"
          data-testid={ `${index}-horizontal-image` }
          alt="image_of_recipe"
          src={ item.image }
          // Timed out retrying: cy.click() failed because the center of this element is hidden from view: -> https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Visibility
        />
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>
        {item.type === 'comida'
          ? `${item.area} - ${item.category}` : item.alcoholicOrNot}
      </h3>
      <Link
        to={
          item.type === 'comida'
            ? `/comidas/${item.id}`
            : `/bebidas/${item.id}`
        }
      >
        <h2 data-testid={ `${index}-horizontal-name` }>
          {item.name}
        </h2>
      </Link>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {`Feita em: ${item.doneDate}`}
      </p>
      <ShareButton
        index={ index }
        foodOrDrinkBtn={ item.type === 'comida' ? 'comidas' : 'bebidas' }
        id={ item.id }
      />
      {item.tags && item.tags
        .map((_, i) => (
          <p key={ i } data-testid={ `${index}-${item.tags[i]}-horizontal-tag` }>
            {item.tags[i]}
          </p>))}
    </div>
  );
}
