import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import '../styles/DetailsRecipe.css';
import * as api from '../services/API';
import DetailsMealsComp from '../components/DetailsMealsComp';

export default function DetailsMeals() {
  const [recipesDetails, setRecipesDetails] = useState({});
  const [setDrinkRecipeId] = useState('');
  const [copyText, setCopyText] = useState('');
  const [buttonHiddenClass, setButtonHiddenClass] = useState('hiddenButton');
  // const [buttonText] = useState('Continuar Receita');
  const [favorite, setFavorite] = useState(false);
  const [recipesRecommendation, setRecipesRecommendation] = useState({});
  const [inProgress, setInProgress] = useState(false);

  const history = useHistory();
  const { pathname } = history.location;
  const recipesSelectedId = pathname.split('/')[2];

  // console.log(drinkRecipeId);
  // console.log(mealRecipeId);

  useEffect(() => {
    const getApiDetailsRecipesFood = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipesSelectedId}`;
      const requestFood = await api.fetchAPI(URL);
      const responseFood = await requestFood.meals;
      setRecipesDetails(responseFood[0]);
    };
    getApiDetailsRecipesFood();
    const recipesInProgress = JSON.parse(localStorage.getItem('recipesProgress')) || [];
    const haveRecipeInProgress = recipesInProgress.filter(
      (recipe) => recipe.idMeal === recipesSelectedId,
    );
    setInProgress(haveRecipeInProgress.length > 0);
  }, [setRecipesDetails, recipesSelectedId]);

  const getNull = (measure) => {
    if (measure === null) {
      return '';
    }
    return `- ${measure}`;
  };

  const getIngredients = (recipe) => {
    // O método Object.entries() retorna uma array dos próprios pares  [key, value] enumeráveis de um dado objeto.
    // referência: https://www.youtube.com/watch?v=HCpXOv1KkJE
    const ingredients = Object.entries(recipe)
      .filter((key) => (key[1] === null ? false : key[0].includes('strIngredient')));
    const measures = Object.entries(recipe)
      .filter((key) => (key[0].includes('strMeasure')));

    return ingredients.filter((recipes) => recipes[1] !== '')
      .map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { `${ingredient[1]} ${getNull(measures[index][1])}` }
        </li>
      ));
  };

  useEffect(() => {
    const recommendationFetch = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const requestDrink = await api.fetchAPI(URL);
      const responseDrink = await requestDrink.drinks;
      setRecipesRecommendation(responseDrink);
    };
    recommendationFetch();
  }, []);

  useEffect(() => {
    if (!localStorage.doneRecipes) localStorage.doneRecipes = JSON.stringify([]);
    const doneRecipesLCstorage = JSON.parse(localStorage.doneRecipes)
      .filter((item) => item.id === recipesSelectedId);
    if (doneRecipesLCstorage.length >= 1) {
      setButtonHiddenClass('hiddenButton-hidden');
    } else {
      setButtonHiddenClass('hiddenButton');
    }
  }, [recipesSelectedId]);

  const handleClickCopy = () => {
    copy(window.location.href);
    setCopyText('Link copiado!');
    setInterval(() => setCopyText(''), '2000');
    console.log(window.location.href);
  };

  useEffect(() => {
    const retriveFavoties = () => {
      const atualStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      return setFavorite(atualStorage.some((item) => item.id === recipesSelectedId));
    };
    retriveFavoties();
  }, [recipesSelectedId]);

  const handleClickRecipesProgress = () => {
    history.push(`/comidas/${recipesSelectedId}/in-progress`);
  };

  const handleClickFavorites = () => {
    const favoriteObj = [
      {
        id: recipesDetails.idMeal,
        type: 'comida',
        area: recipesDetails.strArea,
        category: recipesDetails.strCategory,
        alcoholicOrNot: '',
        name: recipesDetails.strMeal,
        image: recipesDetails.strMealThumb,
      },
    ];
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      const rmvFavorite = storageFavorite.filter((item) => item.id !== recipesSelectedId);
      const rmvFavoriteStringfy = JSON.stringify(rmvFavorite);
      setFavorite(false);
      localStorage.setItem('favoriteRecipes', rmvFavoriteStringfy);
    } else {
      setFavorite(true);
      const newRecipeStringfy = JSON.stringify([
        ...favoriteObj,
        ...storageFavorite,
      ]);
      localStorage.setItem('favoriteRecipes', newRecipeStringfy);
    }
  };

  const propsDrink = {
    recipesDetails,
    handleClickCopy,
    handleClickFavorites,
    favorite,
    copyText,
    getIngredients,
    recipesRecommendation,
    recipesSelectedId,
    buttonHiddenClass,
    inProgress,
    setDrinkRecipeId,
    handleClickRecipesProgress,
  };

  return (
    <div className="container">
      <DetailsMealsComp propsDrink={ propsDrink } />
    </div>
  );
}
