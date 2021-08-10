import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonShare from '../../components/ButtonShare';
import CardDetail from '../../components/RecipeInProgress/CardDetail';
import IngredientsList from '../../components/RecipeInProgress/IngredientsList';
import Instructions from '../../components/RecipeInProgress/Instructions';
import ButtonFinish from '../../components/RecipeInProgress/ButtonFinish';
import { InProgressProvider } from '../../context/InProgress';

export default function DrinkInProgress({ location }) {
  const [recipe, setRecipe] = useState();
  const recipeId = window.location.pathname.split('/')[2];

  const { state } = location;

  useEffect(() => {
    if (state && !recipe) {
      setRecipe(state);
    }
  }, [recipe, state]);

  useEffect(() => {
    if (!state) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const getRecipe = async () => {
        console.log('passei');
        const data = await fetch(URL).then((r) => r.json()).then((d) => d.drinks[0]);
        setRecipe(data);
      };
      getRecipe();
    }
  }, [recipeId, state]);

  if (recipe) {
    return (
      <InProgressProvider>
        <section>
          <CardDetail
            thumb={ recipe.strDrinkThumb }
            name={ recipe.strDrink }
            id={ recipe.idDrink }
            category={ recipe.strCategory }
          />
          <p>{ recipe.strAlcoholic }</p>
          <ButtonShare path={ window.location.href } testid="share-btn" />
          <button
            type="button"
            data-testid="favorite-btn"
          >
            {'<3'}
          </button>
          <IngredientsList recipe={ recipe } />
          <Instructions Instructions={ recipe.strInstructions } />
          <ButtonFinish />
        </section>
      </InProgressProvider>
    );
  }
  return (<div>Carregando...</div>);
}

DrinkInProgress.propTypes = {
  strCategory: PropTypes.string,
  strDrink: PropTypes.string,
  idDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strInstructions: PropTypes.string,
  strAlcoholic: PropTypes.string,
}.isRequired;
