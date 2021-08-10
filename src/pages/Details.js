import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import FrameVideo from '../components/FrameVideo';
import RecommendedRecipes from '../components/RecommendedsRecipes';
import RecipesContext from '../context/RecipesContext';
import DetailsButton from '../components/DetailsButton';

function Details({ match: { url, params: { id } } }) {
  const { getRecipeById } = useContext(RecipesContext);

  // didMount getRecipeById
  useEffect(() => {
    getRecipeById(url, id);
  }, []);

  return (

    <div className="container">
      <RecipeDetails url={ url } />
      {url.includes('comidas') && <FrameVideo />}
      <RecommendedRecipes />
      <DetailsButton />
    </div>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default Details;
