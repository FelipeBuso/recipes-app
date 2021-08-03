import React from 'react';
import { Link } from 'react-router-dom';
import DrinkIcon from '../../../images/drinkIcon.svg';
import ExploreIcon from '../../../images/exploreIcon.svg';
import MealIcon from '../../../images/mealIcon.svg';

function Footer() {    
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <img 
          data-testid="drinks-bottom-btn" 
          alt="Drink Icon" 
          src={ DrinkIcon } 
        />
      </Link>
      <Link to="/explorar">
        <img 
          data-testid="explore-bottom-btn" 
          alt="Explore Icon" 
          src={ ExploreIcon } 
        />
      </Link>
      <Link to="/comidas">
        <img 
          data-testid="food-bottom-btn" 
          alt="Food Icon" 
          src={ MealIcon } 
        />
      </Link>
    </footer>       
  );
}

export default Footer;
       