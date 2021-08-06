import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer container" className="footer">

      <Link to="/bebidas">
        <img
          type="image"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="bebidas"
        />
      </Link>
      <Link to="/explorar">
        <img
          type="image"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explorar"
        />
      </Link>
      <Link to="/comidas">
        <img
          type="image"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="comidas"
        />
      </Link>

    </footer>
  );
}

export default Footer;
