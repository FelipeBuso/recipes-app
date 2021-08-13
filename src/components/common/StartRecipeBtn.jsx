import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useRecipeStatus from '../../hooks/useRecipeStatus';
import '../../styles/components/startRecipeBtn.css';

const StartRecipeBtn = ({ routeInfo: { id, url } }) => {
  const { recipeProgress, showBtn } = useRecipeStatus(id, url);

  const [currentRecipeId] = useState(id);

  const choiceRoute = () => {
    if (url.includes('comidas')) {
      return `/comidas/${currentRecipeId}/in-progress`;
    }
    if (url.includes('bebidas')) {
      return `/bebidas/${currentRecipeId}/in-progress`;
    }
  };

  return (
    (showBtn)
      ? (
        <Link
          to={ choiceRoute() }
        >
          <button
            className="start-recipe-btn "
            data-testid="start-recipe-btn"
            type="button"
          >
            { recipeProgress }
          </button>
        </Link>
      )
      : null
  );
};

StartRecipeBtn.propTypes = {
  routeInfo: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default StartRecipeBtn;
