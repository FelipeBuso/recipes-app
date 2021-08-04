import React, { useContext } from 'react';

import '../styles/ExplorarIngredientes.css';
import Header from '../components/Header';
import Loading from '../components/Loading';
import RecipesContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Footer from '../components/Footer';

function ExplorarIngredientes() {
  const NUMBER_OF_CARDS = 12;
  const { isLoading,
    ingredientList,
    recipeType } = useContext(RecipesContext);

  return (
    <div className="ingredients-page-container">
      <Header title="Explorar Ingredientes" />
      <div className="ingredients-card-container">
        { isLoading === true
          ? <Loading />
          : ingredientList.slice(0, NUMBER_OF_CARDS).map(
            (ingredient, index) => (<IngredientCard
              key={ index }
              index={ index }
              ingredient={ ingredient }
              recipeType={ recipeType }
            />
            ),
          )}
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarIngredientes;
