import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import '../styles/RecipesRecomendations.css';

function DrinksRecomendations(props) {
  const { recomendations } = props;
  const recomendationsNumber = 6;
  return (
    <Carousel>
      {recomendations.map((element, index) => {
        if (index < recomendationsNumber) {
          return (
            <Carousel.Item
              key={ element.idDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="recipe-recom"
                src={ element.strDrinkThumb }
                alt="Bebida recomendada"
              />
              <p>{element.strAlcoholic}</p>
              <p
                data-testid={ `${index}-recomendation-title` }
              >
                {element.strDrink}
              </p>
            </Carousel.Item>
          );
        }
        return null;
      })}
    </Carousel>

  );
}

DrinksRecomendations.propTypes = ({
  recomendations: PropTypes.arrayOf.isRequired,
});

export default DrinksRecomendations;
