import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { shape, string } from 'prop-types';
import RecipeInstructions from '../components/common/RecipeInstructions';
import StartRecipeBtn from '../components/common/StartRecipeBtn';
import { requestDrinkDetails } from '../redux/actions/recipeDetailsActions';
import RecommendationCarousel from '../components/common/RecommendationCarousel';

const DrinkDetails = ({ dispatch, match, drinkDetails }) => {
  const { params: { id }, url } = match;

  useEffect(() => {
    dispatch(requestDrinkDetails(id));
  }, [dispatch, id]);
  if (drinkDetails.strInstructions === undefined) return (<span>Carregando...</span>);
  return (
    <>
      <div>Pagina de Detalhe de Bebidas</div>
      <RecipeInstructions strInstructions={ drinkDetails.strInstructions } />
      <RecommendationCarousel url={ url } />
      <StartRecipeBtn routeInfo={ { id, url } } />
    </>
  );
};

const mapStateToProps = (state) => ({
  drinkDetails: state.recipeDetailsReducer.drink,
});

DrinkDetails.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }),
  drinkDetails: shape({
    strInstructions: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(DrinkDetails);
