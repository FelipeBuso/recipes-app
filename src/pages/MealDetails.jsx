import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Recommendations from '../components/Recommendations';
import IngredientsList from '../components/IngredientsList';
import { APImealById } from '../services/APImealsANDdrinks';
import '../css/footerMenu.css';

// Falta implementar o await da promise;
// corrigir rota e colocar o barra que está faltando. Ver se é encessario
// Adicionar loading

function MealDetails({ match: { params } }) {
  const [MealDataAPI, setMealDadaAPI] = useState({});
  const [isMealDone, setIsMealsDone] = useState(false);
  const [isMealStarted, setIsMealStarted] = useState(false);
  function verifyRecipeProgress(id) {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes !== null) {
      const isInProgress = Object.hasOwnProperty.call(
        inProgressRecipes.meals,
        id,
      );
      setIsMealStarted(isInProgress);
    }
  }
  function verifyRecipeDone(id) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== null) {
      const filter = doneRecipes.filter((recipe) => recipe.id === id);
      if (filter.length >= 1) {
        setIsMealsDone(true);
      }
    }
  }
  function renderButton(comand) {
    return (
      <button className="footer" type="button" data-testid="start-recipe-btn">
        { `${comand} Receita` }
      </button>
    );
  }
  useEffect(() => {
    const { id } = params;
    const requestMeal = async () => {
      const response = await APImealById(id);
      setMealDadaAPI(response.meals[0]);
    };
    verifyRecipeDone(id);
    verifyRecipeProgress(id);
    requestMeal();
  }, [params]);

  return (
    <div>
      <RecipeCard
        title={ MealDataAPI.strMeal }
        img={ MealDataAPI.strMealThumb }
        category={ MealDataAPI.strCategory }
        id={ MealDataAPI.idMeal }
      />

      <IngredientsList recipe={ MealDataAPI } />

      <p data-testid="instructions">
        <h2>Instructions</h2>
        {MealDataAPI.strInstructions}
      </p>

      {(MealDataAPI.strYoutube) ? (
        <div className="embed-responsive embed-responsive-16by9">
          <h2>Video</h2>
          <iframe
            src={ MealDataAPI.strYoutube.replace('watch?v=', 'embed/') }
            data-testid="video"
            title="recipe Video"
            className="embed-responsive-item"
            allowFullScreen
          />

        </div>
      ) : <h2>Loading</h2>}
      <Recommendations />
      { !isMealDone ? (
        <Link to={ `/comidas/${MealDataAPI.idMeal}/in-progress` }>
          { renderButton('Iniciar')}
        </Link>
      )
        : undefined }
      { isMealStarted ? renderButton('Continuar') : undefined }

    </div>
  );
}

export default MealDetails;

MealDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};
