import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
/* import RecipesContext from '../context/RecipesContext'; */
import { fetchDrinksDetails, fetchFoods } from '../services/API';
import '../styles/DrinksDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ingredientsDrinkDetails from '../helpers/ingredientsDrinkDetails';
import FoodsRecomendations from '../components/FoodsRecomendations';

function DrinksDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const foodDetails = async (drinkId) => {
      const fetchedDetails = await fetchDrinksDetails(drinkId);
      setDetails(fetchedDetails);
      setLoading(false);
    };
    foodDetails(id);
  }, [id, setLoading]);

  useEffect(() => {
    const foodsRecomendations = async () => {
      const fetchedRecomendations = await fetchFoods();
      setRecomendations(fetchedRecomendations);
    };
    foodsRecomendations();
  }, []);

  const ingredientsAndMeasures = details.idDrink
    ? ingredientsDrinkDetails(details) : [];

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="details-container">
      {loading ? (
        <ReactBootStrap.Spinner animation="border" />
      )
        : (
          <>
            <img
              src={ details.strDrinkThumb }
              alt="Detalhe da bebida"
              data-testid="recipe-photo"
            />
            <div className="details-header">
              <div>
                <span data-testid="recipe-title">{details.strDrink}</span>
                <span data-testid="recipe-category">{details.strAlcoholic}</span>
              </div>
              <div>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => copyLink() }
                >
                  <img src={ shareIcon } alt="Botão compartilhar" />
                </button>
                <button type="button" data-testid="favorite-btn">
                  <img src={ whiteHeartIcon } alt="Botão favoritar" />
                </button>
              </div>
            </div>
            <div className="ingredients-container">
              <span>Ingredients</span>
              <ul>
                {ingredientsAndMeasures.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions-container">
              <span>Instruções</span>
              <p data-testid="instructions">{details.strInstructions}</p>
            </div>
            <div className="recomendation-container">
              <span>Recomendadas</span>
              <FoodsRecomendations recomendations={ recomendations } />
            </div>
          </>)}
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default DrinksDetails;
