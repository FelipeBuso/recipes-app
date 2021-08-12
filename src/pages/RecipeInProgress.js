import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchRecipeDetail, setRecipeIngredients, updateInProgress,
} from '../actions/selectedRecipe';
import FinishRecipeButton from '../components/FinishRecipeButton';
import { getFromStorage, setToStorage } from '../helpers/utils';
import style from './RecipeInProgress.module.css';

function RecipeInProgress({
  match: { params: { id }, path },
  recipe, ingredients, inProgress,
  dispatchFetchRecipe, dispatchSetIngredients, dispatchUpdateInProgress,
}) {
  React.useEffect(() => {
    const recipesInProgress = getFromStorage('inProgressRecipes') || {};
    dispatchUpdateInProgress(recipesInProgress);
  }, [dispatchUpdateInProgress]);

  React.useEffect(() => {
    const type = path.replace(/(^\/)|(\/)(:|\w|-)+/g, '');
    dispatchFetchRecipe(type, id);
  }, [dispatchFetchRecipe, id, path]);

  React.useEffect(() => {
    (() => {
      const ingredientsCount = 20;
      const ingredientsList = [];

      for (let index = 1; index <= ingredientsCount; index += 1) {
        const ingredient = recipe[`strIngredient${index}`];
        const measure = recipe[`strMeasure${index}`];

        if (
          recipe[`strIngredient${index}`]
          && recipe[`strIngredient${index}`].length > 0
        ) {
          ingredientsList.push([ingredient, measure]);
        } else break;
      }

      dispatchSetIngredients(ingredientsList);
    })();
  }, [recipe, dispatchSetIngredients]);

  const addStepToStorage = (value, storageItem) => {
    const updatedItem = {
      ...storageItem,
      [id]: [
        ...(storageItem[id] || []),
        value,
      ].sort(),
    };

    setToStorage('inProgressRecipes', updatedItem);
    dispatchUpdateInProgress(updatedItem);
  };

  const removeStepFromStorage = (value, storageItem) => {
    const updatedItem = {
      ...storageItem,
      [id]: storageItem[id].filter((item) => item !== value),
    };

    if (updatedItem[id].length === 0) delete updatedItem[id];

    setToStorage('inProgressRecipes', updatedItem);
    dispatchUpdateInProgress(updatedItem);
  };

  const handleStepDone = (target, index) => {
    const recipesInProgress = getFromStorage('inProgressRecipes') || {};

    if (target.checked) {
      addStepToStorage(index, recipesInProgress);
      target.parentElement.classList.add(style.checked);
    } else {
      removeStepFromStorage(index, recipesInProgress);
      target.parentElement.classList.remove(style.checked);
    }
  };

  const details = {
    strThumb: recipe.strDrinkThumb || recipe.strMealThumb,
    str: recipe.strDrink || recipe.strMeal,
    strCategory: recipe.strCategory,
    strInstructions: recipe.strInstructions,
  };

  return (
    <main data-testid="recipes-page">
      <img src={ details.strThumb } alt="" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ details.str }</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{ details.strCategory }</p>
      <ul>
        {
          ingredients.map(([ingredient, measure], index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ `ingredient${index + 1}` }>
                <input
                  type="checkbox"
                  id={ `ingredient${index + 1}` }
                  checked={ inProgress[id] && inProgress[id].includes(index + 1) }
                  onClick={ ({ target }) => handleStepDone(target, index + 1) }
                />
                { `${ingredient} - ${measure}` }
              </label>
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { details.strInstructions }
      </p>
      <FinishRecipeButton id={ id } />
    </main>
  );
}

const mapStateToProps = (
  { selectedRecipeReducer: { recipe, ingredients, inProgress } },
) => ({
  recipe,
  ingredients,
  inProgress,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchRecipe: (type, id) => dispatch(fetchRecipeDetail(type, id)),
  dispatchSetIngredients: (ingredients) => dispatch(setRecipeIngredients(ingredients)),
  dispatchUpdateInProgress: (InProgress) => dispatch(updateInProgress(InProgress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);

RecipeInProgress.defaultProps = {
  recipe: {},
  ingredients: [],
  inProgress: {},
};

RecipeInProgress.propTypes = {
  dispatchFetchRecipe: PropTypes.func,
  dispatchSetIngredients: PropTypes.func,
  dispatchUpdateInProgress: PropTypes.func,
}.isRequired;
