import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

import copy from 'clipboard-copy';
import { Layout, ActionButton } from '../components';

import {
  getStoredFavorites,
  getDoneRecipes,
  getStoredInProgressRecipes } from '../utils/storage';

const TOAST_TIMEOUT = 3000;
const RECOMMENDATION_NUMBER = 6;

const renderLoadingOrError = (error, isLoading) => {
  if (isLoading) return <p>Carregando...</p>;

  if (error) return <p>Opa... algo deu errado</p>;

  return false;
};

function FoodDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [drinksLoading, setDrinksLoading] = useState(true);
  const [drinksError, setDrinksError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php'; // TODO usar token
  const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    fetch(`${BASE_URL}?i=${id}`)
      .then((response) => response.json())
      .then((result) => setRecipe(result.meals[0]))
      .catch(setError)
      .finally(() => setIsLoading(false));

    fetch(DRINKS_URL)
      .then((response) => response.json())
      .then((result) => setDrinks(result.drinks))
      .catch(setDrinksError)
      .finally(() => setDrinksLoading(false));

    getDoneRecipes(id, setIsDone);
    getStoredInProgressRecipes(id, setIsInProgress, 'meals');
    getStoredFavorites(id, setIsFavorite);
  }, [id]);

  function showToast() {
    setToastIsVisible(true);

    setTimeout(() => {
      setToastIsVisible(false);
    }, TOAST_TIMEOUT);
  }

  const renderNoRecipeMessage = () => renderLoadingOrError(error, isLoading);

  const renderNoDrinksMessage = () => renderLoadingOrError(drinksError, drinksLoading);

  const styles = {
    drinkRecommendationList: {
      display: 'flex',
      gap: '32px',
      overflowX: 'auto',
      width: '460px',
      height: '260px',
      listStyle: 'none',
    },
    drinksRecommendationCard: {
      width: '200px',
      flexShrink: '0',
    },
    drinksRecommendationImage: {
      display: 'block',
      width: '100%',
    },
  };

  return (
    <Layout title="App de Receitas">
      <main>
        { !recipe ? renderNoRecipeMessage()
          : (
            <>
              <section>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid="recipe-photo"
                />
              </section>
              <section>
                <div>
                  <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
                  <h2 data-testid="recipe-category">{ recipe.strCategory }</h2>
                </div>
                <div>
                  <ActionButton
                    action="share"
                    onClick={ () => {
                      copy(`http://localhost:3000/comidas/${id}`);
                      showToast();
                    } }
                  />
                  <ActionButton
                    action="favorite"
                    reverse={ isFavorite }
                    onClick={ () => {
                      const storedFavoriteRecipes = localStorage
                        .getItem('favoriteRecipes');
                      const parsedFavoriteRecipes = storedFavoriteRecipes
                        ? JSON.parse(storedFavoriteRecipes)
                        : [];

                      let favoriteRecipesToStore;

                      if (isFavorite) {
                        favoriteRecipesToStore = parsedFavoriteRecipes
                          .filter((parsedRecipe) => parsedRecipe.id !== id);
                      } else {
                        favoriteRecipesToStore = [...parsedFavoriteRecipes, {
                          id,
                          type: 'comida',
                          area: recipe.strArea,
                          category: recipe.strCategory,
                          alcoholicOrNot: '',
                          name: recipe.strMeal,
                          image: recipe.strMealThumb,
                        }];
                      }

                      localStorage.setItem(
                        'favoriteRecipes',
                        JSON.stringify(favoriteRecipesToStore),
                      );

                      setIsFavorite((previously) => !previously);
                    } }
                  />
                </div>
              </section>
              <section>
                <h1>Ingredientes</h1>

                <ol>
                  { Object.keys(recipe)
                    .filter((key) => /strIngredient/i.test(key))
                    .filter((key) => recipe[key] !== '')
                    .map((key) => {
                      const index = parseInt(key.replace('strIngredient', ''), 10);
                      return (
                        <li
                          key={ index }
                          data-testid={ `${index - 1}-ingredient-name-and-measure` }
                        >
                          <span>{ recipe[key] }</span>
                          <span> - </span>
                          <span>{ recipe[`strMeasure${index}`] }</span>
                        </li>
                      );
                    }) }
                </ol>
              </section>

              <section>
                <h1>Instruções</h1>

                <p data-testid="instructions">{ recipe.strInstructions }</p>
              </section>

              <section>
                <iframe
                  data-testid="video"
                  width="560"
                  height="315"
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer;clipboard-write; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </section>

              { !isDone && (
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  onClick={ () => {
                    history.push(`/comidas/${id}/in-progress`);
                  } }
                  style={ { position: 'fixed', bottom: '0', height: '300px' } }
                >
                  { isInProgress ? <>Continuar Receita</> : <>Iniciar Receita</> }
                </button>)}

              <section>
                <h1>Recomendações de bebida</h1>

                { renderNoDrinksMessage() || (
                  <ol style={ styles.drinkRecommendationList }>
                    { drinks.slice(0, RECOMMENDATION_NUMBER).map((drink, index) => (
                      <li
                        style={ styles.drinksRecommendationCard }
                        data-testid={ `${index}-recomendation-card` }
                        key={ drink.idDrink }
                      >
                        <img
                          style={ styles.drinksRecommendationImage }
                          src={ drink.strDrinkThumb }
                          alt={ drink.strDrink }
                        />
                        <h1
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { drink.strDrink }
                        </h1>
                      </li>
                    )) }
                  </ol>
                ) }
              </section>
            </>
          ) }
        { toastIsVisible && (
          <div style={ { position: 'fixed', right: '25px', bottom: '25px' } }>
            <p>Link copiado!</p>
          </div>
        ) }
      </main>
    </Layout>
  );
}

export default FoodDetails;
