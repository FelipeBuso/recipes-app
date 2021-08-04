import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

function ButtonStart({ detail, typeDrinkorMeal }) {
  const { idItem } = detail;
  const [buttonStart, setButtonStart] = useState(false);
  const [buttonContinue, setButtonContinue] = useState(false);
  const history = useHistory();

  useEffect(() => {
    function checkRecipes() {
      const recipesLocalstorage = JSON.parse(localStorage.getItem('doneRecipes'));
      if (recipesLocalstorage !== null) {
        recipesLocalstorage.forEach((element) => element.id === idItem
          && setButtonStart(true));
      }

      const continueRecipies = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const typeDoM = typeDrinkorMeal === 'comidas' ? 'meals' : 'cocktails';
      if (continueRecipies !== null
        && continueRecipies[typeDoM] !== undefined) {
        Object.keys(continueRecipies[typeDoM]).forEach((idItemEdit) => (
          idItemEdit === idItem && setButtonContinue(true)
        ));
      }
    }
    checkRecipes();
  }, [idItem, typeDrinkorMeal]);

  function startRecipes() {
    const typeDoM = typeDrinkorMeal === 'comidas' ? 'meals' : 'cocktails';
    const info = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...info,
      [typeDoM]: {
        [idItem]: [],
      },
    }));
    history.push(`${idItem}/in-progress`);
  }

  function btnStart() {
    return (
      <button
        className="buttonSart"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ startRecipes }
      >
        { buttonContinue ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    );
  }

  return (
    buttonStart === false && btnStart()
  );
}

export default ButtonStart;
