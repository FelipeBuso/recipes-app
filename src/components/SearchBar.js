import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import {
  fetchFoodsIngredienteMeail,
  fetchFoodsIngredienteDrink,
  fetchFoodsName,
  fetchFoodsNameDrink,
  fetchFoodsFirstLetter,
  fetchFoodsFirstLetterDrink } from '../Services/Data';

const list = (search, lala, selected) => {
  const LOC = window.location.pathname;
  if (LOC === '/comidas') {
    if (selected === 'Ingrediente') {
      fetchFoodsIngredienteMeail(search, lala);
    }
    if (selected === 'Nome') {
      fetchFoodsName(search, lala);
    }
    if (selected === 'Primeira letra') {
      fetchFoodsFirstLetter(search, lala);
    }
  }
  if (LOC === '/bebidas') {
    if (selected === 'Ingrediente') {
      fetchFoodsIngredienteDrink(search, lala);
    }
    if (selected === 'Nome') {
      fetchFoodsNameDrink(search, lala);
    }
    if (selected === 'Primeira letra') {
      fetchFoodsFirstLetterDrink(search, lala);
    }
  }
};

function SearchBar(props) {
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const [listSearch, setListSearch] = useState([]);
  const { setDrinkFromSearch, setFoodFromSearch } = props;

  // const foodOrDrink = () => {
  //   const LOC = window.location.pathname;
  //   const item = { type: '', key: '', id: '' };
  //   const food = ['meal', 'meals', 'idMeal'];
  //   const drink = ['cocktail', 'drinks', 'idDrink'];
  //   if (LOC === '/comidas') {
  //     food.forEach((el, index) => { item[Object.keys(item)[index]] = el; });
  //     return item;
  //   }

  //   drink.forEach((el, index) => { item[Object.keys(item)[index]] = el; });
  //   return item;
  // };
  const lala = (x) => {
    if (x !== null) {
      setListSearch(x);
      const LOC = window.location.pathname;
      if (LOC === '/comidas') {
        setFoodFromSearch(x);
      }
      if (LOC === '/bebidas') {
        setDrinkFromSearch(x);
      }
    }
  };

  if (listSearch.length === 1) {
    const LOC = window.location.pathname;
    if (LOC === '/comidas') {
      return (<Redirect
        to={ `/comidas/${listSearch[0].idMeal}` }
      />);
    }
    if (LOC === '/bebidas') {
      return (<Redirect
        to={ `/bebidas/${listSearch[0].idDrink}` }
      />);
    }
  }

  return (
    <div>
      <div className="radios" onChange={ ({ target }) => setSelected(target.value) }>
        <label htmlFor="radio">
          {' '}
          Ingrediente
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="radio"
            name="radio"
            value="Ingrediente"
          />
        </label>
        <label htmlFor="radio">
          {' '}
          Nome
          <input
            type="radio"
            data-testid="name-search-radio"
            id="radio"
            name="radio"
            value="Nome"
          />
        </label>
        <label htmlFor="radio">
          {' '}
          Primeira letra
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="radio"
            name="radio"
            value="Primeira letra"
          />
        </label>
      </div>
      <label htmlFor="search">
        <input
          type="text"
          data-testid="search-input"
          id="search"
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => list(search, lala, selected) }
      >
        Busca
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  setFoodFromSearch: PropTypes.func.isRequired,
  setDrinkFromSearch: PropTypes.func.isRequired,
};
export default SearchBar;
