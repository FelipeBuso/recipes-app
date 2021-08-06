import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';

function ButtonFavoriteRecipe({ recipes, favorite, setFavorite, index }) {
  const location = useLocation();
  const testIds = location.pathname.includes('receitas-favoritas')
    ? `${index}-horizontal-favorite-btn`
    : 'favorite-btn';

  const { id, area, category, strAlcoholic, title, imgUrl } = recipes;
  const createFavoriteObject = () => {
    let favoriteRecipeObj = {};
    // if (location.pathname.includes('comidas')) {
    if (area) {
      favoriteRecipeObj = {
        id,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name: title,
        image: imgUrl,
      };
    }
    // if (location.pathname.includes('bebidas')) {
    if (!recipes.area) {
      favoriteRecipeObj = {
        id,
        type: 'bebida',
        area: '',
        category,
        alcoholicOrNot: strAlcoholic,
        name: title,
        image: imgUrl,
      };
    }
    return favoriteRecipeObj;
  };

  const favoriteRecipe = createFavoriteObject();

  const handleFavoriteBtn = () => {
    const parsedLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorite) {
      setFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...parsedLocalStorage,
        favoriteRecipe]));
    }
    if (favorite) {
      setFavorite(false);
      const favoriteRecipeArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const removeRecipe = favoriteRecipeArr.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeRecipe));
    }
  };

  return (
    <button
      className="Favorite-Page-Button-Styles"
      type="button"
      onClick={ () => { handleFavoriteBtn(); } }
    >
      { favorite ? <img
        src={ BlackHeart }
        alt="favorite"
        data-testid={ testIds }
      /> : <img src={ WhiteHeart } alt="Nonfavorite" data-testid='favorite-btn' /> }
    </button>
  );
}

ButtonFavoriteRecipe.propTypes = {
  recipes: PropTypes.objectOf(String),
  setFavorite: PropTypes.func,
}.isRequired;

export default ButtonFavoriteRecipe;
