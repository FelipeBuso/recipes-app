import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function MainRecipes({ foodOrDrink }) {
  const { mainItems,
    categories,
    buttonFilter,
    setButtonFilter,
    loadingMainRecipes,
    setLoadingMainRecipes,
    filterButtonActive,
    setFilterButtonActive,
    fetchMainRecipes,
  } = useContext(AppContext);

  const maxLengthItems = 12;
  const maxLengthCategories = 5;

  function renderRecipes(item, index) {
    return (
      <Link
        key={ index }
        to={ foodOrDrink === 'Comidas' ? `/comidas/${item.idMeal}`
          : `/bebidas/${item.idDrink}` }
      >
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            src={ foodOrDrink === 'Comidas' ? item.strMealThumb : item.strDrinkThumb }
            alt="food_image"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            {foodOrDrink === 'Comidas' ? item.strMeal : item.strDrink}
          </p>
        </div>
      </Link>
    );
  }

  function handleClick(e) {
    if (e.target.value === buttonFilter) {
      setFilterButtonActive(false);
      setLoadingMainRecipes(true);
      setButtonFilter('');
      return;
    }
    setLoadingMainRecipes(true);
    setButtonFilter(e.target.value);
    if (e.target.value === 'all') {
      setFilterButtonActive(false);
      return;
    }
    setFilterButtonActive(true);
  }

  useEffect(() => {
    fetchMainRecipes(foodOrDrink);
  }, [buttonFilter, filterButtonActive]);

  useEffect(() => {
    fetchMainRecipes(foodOrDrink);
  }, []);

  return (
    <div>
      {loadingMainRecipes ? <span>Carregando...</span> : (
        <div>
          <div>
            {(
              categories.filter((item, index) => index < maxLengthCategories)
                .map((item, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `${item.strCategory}-category-filter` }
                    value={ item.strCategory }
                    onClick={ (e) => handleClick(e) }
                  >
                    { item.strCategory }
                  </button>
                ))
            )}
            <button
              type="button"
              value="all"
              onClick={ (e) => handleClick(e) }
              data-testid="All-category-filter"
            >
              All
            </button>
          </div>
          <div>
            {mainItems
              .filter((item, index) => index < maxLengthItems).map(renderRecipes) }
          </div>
        </div>
      )}
    </div>
  );
}

export default MainRecipes;

MainRecipes.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};
