import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SearchBarContext } from '../context/SearchBar';
import fetchByFilter from '../services/data';

// Ficam todas as funções referentes aos botões de categorias

export default function FiltersBar(props) {
  const { fetchType } = props;
  const five = 5;
  const twelve = 12;
  const {
    dataList,
    setDataList,
    setDataValues,
    filter,
    setFilter,
    categories,
    setCategories,
    setShouldCallCards,
  } = useContext(SearchBarContext);

  const onClickFilter = (clickedCategory) => {
    if (clickedCategory === filter) {
      setFilter('');
    } else {
      setFilter(clickedCategory);
    }
  };

  useEffect(() => {
    const getRecipes = async () => {
      const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/search.php?s=`;
      const recipesFromApi = await fetchByFilter(urlToFetch);
      const recipesList = Object.values(recipesFromApi)[0];
      setDataValues(recipesList);
      setDataList(recipesList);
      setShouldCallCards(true);
    };
    const getCategories = async () => {
      const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/list.php?c=list`;
      const categoriesFromApi = await fetchByFilter(urlToFetch);
      const categoriesList = Object.values(categoriesFromApi)[0];
      setCategories(categoriesList.filter((_recipe, index) => index < five));
    };
    getRecipes();
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchType]);

  useEffect(() => {
    const getRecipesByCategory = async () => {
      let newRecipesFiltered = [...dataList];
      if (filter) {
        const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/filter.php?c=${filter}`;
        const recipesFromApi = await fetchByFilter(urlToFetch);
        newRecipesFiltered = [...Object.values(recipesFromApi)[0]];
      }
      setDataValues(newRecipesFiltered.filter((_recipe, index) => index < twelve));
    };
    getRecipesByCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, fetchType, dataList]);

  return (
    <section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => onClickFilter('') }
      >
        All
      </button>
      { categories.length > 0 && categories.map((cat) => (
        <button
          type="button"
          key={ cat.strCategory }
          data-testid={ `${cat.strCategory}-category-filter` }
          onClick={ () => onClickFilter(cat.strCategory) }
        >
          {cat.strCategory}
        </button>
      ))}
    </section>
  );
}

FiltersBar.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
