import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function Cards(props) {
  const [source, setSource] = useState();
  const [recipeName, setRecipeName] = useState();
  const { recipe, index, type } = props;
  const history = useHistory();

  let tipo = 'comidas';
  let shortName = 'Meal';
  if (type === 'thecocktaildb') {
    tipo = 'bebidas';
    shortName = 'Drink';
  }

  useEffect(() => {
    if (type === 'themealdb') {
      setRecipeName(recipe.strMeal);
      setSource(recipe.strMealThumb);
    }
    if (type === 'thecocktaildb') {
      setRecipeName(recipe.strDrink);
      setSource(recipe.strDrinkThumb);
    }
  }, [recipe.strDrink, recipe.strDrinkThumb, recipe.strMeal, recipe.strMealThumb, type]);

  return (
    <Card
      style={ { margin: '20px 40px' } }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/${tipo}/${recipe[`id${shortName}`]}`) }
    >
      <Card.Img
        variant="top"
        src={ source }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
        width="50px"
      />
      <Card.Body>
        <Card.Title
          data-testid={ `${index}-card-name` }
        >
          { recipeName }
        </Card.Title>

      </Card.Body>
    </Card>
  );
}

Cards.propTypes = {
  key: PropTypes.string,
  recipe: PropTypes.string,
}.isRequired;
