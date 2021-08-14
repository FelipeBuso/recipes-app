import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeMealProgressComp({ propsMealProgress }) {
  const {
    recipesSelectedId,
    setFavorited,
    handleChangeCheck,
    checkBox,
    recipeProgress,
    ingredientChecked,
    favorited,
  } = propsMealProgress;
  const [copyText, setCopyText] = useState();

  const history = useHistory();

  const handleFavoriteClick = () => {
    if (!favorited) {
      const favoriteStorage = JSON.parse(localStorage.favoriteRecipes);
      const newFavoriteStorage = favoriteStorage.concat({
        id: recipeProgress.idMeal,
        type: 'comida',
        area: recipeProgress.strArea,
        category: recipeProgress.strCategory,
        alcoholicOrNot: '',
        name: recipeProgress.strMeal,
        image: recipeProgress.strMealThumb,
      });
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
      setFavorited(true);
    } else {
      const favoriteStorage = JSON.parse(localStorage.favoriteRecipes);
      const newFavoriteStorage = favoriteStorage.filter(
        (recipe) => recipe.id !== recipesSelectedId,
      );
      localStorage.favoriteRecipes = JSON.stringify(newFavoriteStorage);
      setFavorited(false);
    }
  };

  function addRecipeDone() {
    const date = new Date();
    const svDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const objDoneRecipes = {
      id: recipeProgress.idMeal,
      type: 'comida',
      area: recipeProgress.strArea,
      category: recipeProgress.strCategory,
      alcoholicOrNot: '',
      name: recipeProgress.strMeal,
      image: recipeProgress.strMealThumb,
      doneDate: svDate,
      tags: recipeProgress.strTags.split(','),
    };
    const recipeDone = JSON.parse(localStorage.doneRecipes);
    const newDoneStorage = recipeDone.concat(objDoneRecipes);
    localStorage.doneRecipes = JSON.stringify(newDoneStorage);
    history.push('/receitas-feitas');
  }

  const handleClickCopy = () => {
    copy(`http://localhost:3000/comidas/${recipeProgress.idMeal}`);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), '2000');
  };

  return (
    <div>
      <div>
        <h2 data-testid="recipe-title">{recipeProgress.strMeal}</h2>
        <p>{ copyText }</p>
        <img
          src={ recipeProgress.strMealThumb }
          data-testid="recipe-photo"
          className="recipes-img"
          alt={ recipeProgress.strMeal }
          width="100px"
        />
        <button
          data-testid="share-btn"
          type="button"
          onClick={ handleClickCopy }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button
          type="button"
          onClick={ handleFavoriteClick }
        >
          <img
            src={ favorited ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
            data-testid="favorite-btn"
          />
        </button>
        <p data-testid="recipe-category">{recipeProgress.strCategory}</p>
        <h3>Ingredients</h3>
        {checkBox.map((itens, key) => (
          <label
            htmlFor={ key }
            data-testid={ `${key}-ingredient-step` }
            className={ ingredientChecked.includes(itens) ? 'risk' : 'norisk' }
            key={ key }
          >
            <input
              type="checkbox"
              checked={ ingredientChecked.includes(itens) }
              value={ itens }
              id={ key }
              onClick={ (e) => handleChangeCheck(e) }
            />
            {itens}
          </label>))}

        <p data-testid="instructions">{recipeProgress.strInstructions}</p>
        <button
          disabled={ checkBox.length !== ingredientChecked.length }
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => addRecipeDone() }
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

RecipeMealProgressComp.propTypes = {
  propsMealProgress: PropTypes.shape({
    recipesSelectedId: PropTypes.string,
    setFavorited: PropTypes.func,
    handleChangeCheck: PropTypes.func,
    checkBox: PropTypes.arrayOf(PropTypes.string),
    recipeProgress: PropTypes.objectOf(PropTypes.string),
    ingredientChecked: PropTypes.arrayOf(PropTypes.string),
    favorited: PropTypes.bool,
  }).isRequired,
};
