import React from 'react';

function StartButton(page, item, history) {
  let btnName = 'Iniciar Receita';
  if (page === 'comidas') {
    const redirection = () => {
      history.push(`/comidas/${item.idMeal}/in-progress`);
      const inProgressRecipes = {
        meals: {
          [item.idMeal]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    };
    if (localStorage.inProgressRecipes) {
      const recipes = JSON.parse(localStorage.inProgressRecipes);
      const inProgress = Object.keys(recipes)
        .map((key) => Object.keys(recipes[key]).includes(item.idMeal));
      if (inProgress.includes(true)) {
        btnName = 'Continuar Receita';
      }
    }
    return (
      <button
        className="start-button"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ redirection }
      >
        {btnName}
      </button>
    );
  }
  if (page === 'bebidas') {
    const redirection = () => {
      history.push(`/bebidas/${item.idDrink}/in-progress`);
      const inProgressRecipes = {
        cocktails: {
          [item.idDrink]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    };
    if (localStorage.inProgressRecipes) {
      const recipes = JSON.parse(localStorage.inProgressRecipes);
      const inProgress = Object.keys(recipes)
        .map((key) => Object.keys(recipes[key]).includes(item.idDrink));
      if (inProgress.includes(true)) {
        btnName = 'Continuar Receita';
      }
    }
    return (
      <button
        className="start-button"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ redirection }
      >
        {btnName}
      </button>
    );
  }
}

export default StartButton;
