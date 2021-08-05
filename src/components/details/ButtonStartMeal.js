import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonStartMeal({ id, type }) {
  const [inProgress, setInProgress] = useState(false);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const history = useHistory();

  function handleStartRecipe() {
    console.log('inProgress');
    setInProgress(true);
  }

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));// implementação com base nos cy testes por enquanto que a tela in progress não está pronta
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));// falta a implementação da tela das receitas feitas
    if ((inProgressRecipes !== null)// implementação com base nos cy testes por enquanto que a tela in progress não está pronta
      && (inProgressRecipes[type] !== undefined)
      && (inProgressRecipes[type][id] !== undefined)) {
      setInProgress(true);
    }
    if (doneRecipes !== null) {
      setShowStartBtn(false);
    }
  }, [id, type]);
  return (
    <div>
      { (showStartBtn) && (
        <button
          className="button-start"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            history
              .push(`/${(type === 'meals' ? 'comidas' : 'bebidas')}/${id}/in-progress`);
            handleStartRecipe();
          } }
        >
          { inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
          {' '}
          {/* requisito 40 passara depois que implementado o inprogress */}
        </button>
      ) }
    </div>

  );
}

ButtonStartMeal.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ButtonStartMeal;
