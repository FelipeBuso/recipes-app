import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InProgressContext } from '../../context/InProgress';

export default function IngredientsList(props) {
  const { recipe } = props;
  const recipeId = window.location.pathname.split('/')[2];

  const {
    ingredientsArray,
    setIngredientsArray,
    measurementsArray,
    setMeasurementsArray,
    saveInLocalStorage,
    checkSavedItens,
    setLocalStorage,
  } = useContext(InProgressContext);

  useEffect(() => {
    const getItems = (searchedKey) => Object.entries(recipe).filter(
      (value) => value[0].includes(searchedKey) && value[1],
    ).map((item) => item[1]);
    if (recipe) {
      const ingredients = getItems('Ingredient');
      const measures = getItems('Measure');
      setIngredientsArray(ingredients);
      setMeasurementsArray(measures);
    }
  }, [recipe, setIngredientsArray, setMeasurementsArray]);

  useEffect(() => {
    const obj = setLocalStorage(recipeId);
    localStorage.setItem('cocktails', JSON.stringify(obj));
  }, [recipeId, setLocalStorage]);

  return (
    <section>
      <h3>Receita</h3>
      { ingredientsArray && ingredientsArray.map((ingredient, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <label key={ index } htmlFor={ `id${index}` }>
            <input
              checked={ checkSavedItens(ingredient) }
              id={ `id${index}` }
              name="ingredient"
              onChange={ saveInLocalStorage }
              key={ index }
              type="checkbox"
              value={ ingredient }
            />
            {`${ingredient} ${
              measurementsArray[index]
                ? ` - ${measurementsArray[index]}`
                : ''
            }`}
          </label>
        </div>
      ))}
    </section>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.string,
}.isRequired;
