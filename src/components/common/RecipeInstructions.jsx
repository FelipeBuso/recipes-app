import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/recipeInstructions.css';

const RecipeInstructions = ({ strInstructions }) => (
  <section>
    <h3>Instruções</h3>
    <p
      className="recipe-instructions"
      data-testid="instructions"
    >
      { strInstructions }
    </p>
  </section>
);

RecipeInstructions.propTypes = {
  strInstructions: PropTypes.string.isRequired,
};

export default RecipeInstructions;
