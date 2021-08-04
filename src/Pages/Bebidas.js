import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchCocktailsCategorisAPI } from '../Services/Data';
import '../App.css';

function Bebidas() {
  const [listCocktailsCategorie, setListCocktailsCategorie] = useState([]);
  const [buttonCategorie, setButtonCategorie] = useState(null);
  const [toggleClick, setToggleClick] = useState(false);

  const renderCards = () => (<Cards
    ApiCallMeals={ false }
    ApiCallCockTails
    categorie={ buttonCategorie }
  />);

  const toggleButton = (setButton, listCategorie, index, categorie) => {
    if (toggleClick && buttonCategorie === categorie) {
      setToggleClick(false);
      return setButton(null);
    }
    setToggleClick(true);
    return setButton(listCategorie[index].strCategory);
  };

  const getDataButton = () => {
    fetchCocktailsCategorisAPI(setListCocktailsCategorie);
    return renderCards;
  };
  useEffect(getDataButton, [buttonCategorie]);
  const renderButtonsCocktails = () => {
    if (listCocktailsCategorie.length > 0) {
      return (
        <div>
          <button
            type="button"
            data-testid={ `${listCocktailsCategorie[0].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              setButtonCategorie,
              listCocktailsCategorie,
              '0',
              `${listCocktailsCategorie[0].strCategory}-category-filter`,
            ) }
          >
            {listCocktailsCategorie[0].strCategory}
          </button>
          <button
            type="button"
            data-testid={ `${listCocktailsCategorie[1].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              setButtonCategorie,
              listCocktailsCategorie,
              '1',
              `${listCocktailsCategorie[1].strCategory}-category-filter`,
            ) }
          >
            {listCocktailsCategorie[1].strCategory}

          </button>
          <button
            type="button"
            data-testid={ `${listCocktailsCategorie[2].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              setButtonCategorie,
              listCocktailsCategorie,
              '2',
              `${listCocktailsCategorie[2].strCategory}-category-filter`,
            ) }
          >
            {listCocktailsCategorie[2].strCategory}

          </button>
          <button
            type="button"
            data-testid={ `${listCocktailsCategorie[3].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              setButtonCategorie,
              listCocktailsCategorie,
              '3',
              `${listCocktailsCategorie[3].strCategory}-category-filter`,
            ) }
          >
            {listCocktailsCategorie[3].strCategory}

          </button>
          <button
            type="button"
            data-testid={ `${listCocktailsCategorie[4].strCategory}-category-filter` }
            onClick={ () => toggleButton(
              setButtonCategorie,
              listCocktailsCategorie,
              '4',
              `${listCocktailsCategorie[4].strCategory}-category-filter`,
            ) }
          >
            {listCocktailsCategorie[4].strCategory}

          </button>
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setButtonCategorie(null) }
          >
            All
          </button>
        </div>
      );
    }
  };
  return (
    <div>
      <Header title="Bebidas" search />
      {renderButtonsCocktails()}
      {renderCards()}
      <Footer />
    </div>
  );
}

export default Bebidas;
