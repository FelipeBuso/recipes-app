import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { func, shape, string } from 'prop-types';
import RecipeInstructions from '../components/common/RecipeInstructions';
import StartRecipeBtn from '../components/common/StartRecipeBtn';
import { requestMealDetails } from '../redux/actions/recipeDetailsActions';
import RecipeVideo from '../components/common/RecipeVideo';

const FoodDetails = ({ dispatch, match, mealDetails }) => {
  const { params: { id }, url } = match;

  useEffect(() => {
    dispatch(requestMealDetails(id));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>Pagina de Detalhe de Comida</div>
      <RecipeInstructions strInstructions={ mealDetails.strInstructions } />
      <RecipeVideo strYoutube={ mealDetails.strYoutube } />
      <StartRecipeBtn routeInfo={ { id, url } } />
    </>
  );
};

const mapStateToProps = (state) => ({
  mealDetails: state.recipeDetailsReducer.meal,
});

FoodDetails.propTypes = {
  dispatch: func,
  match: shape({
    params: shape({
      id: string,
    }),
    url: string,
  }),
  mealDetails: shape({
    strInstructions: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(FoodDetails);
