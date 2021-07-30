import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React from 'react';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import styles from './Drinks.module.css';

function Drinks({ match }) {
  const { Filter: { isLoading, data } } = useSelector((state) => state);
  const mn = 12;
  if (isLoading) {
    return (<h1>Carregando...</h1>);
  }

  if (!isLoading && !data.drinks) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div className={ styles.drinksContainer }>
      <Header title="Bebidas" glass="true" match={ match } />
      <div className={ styles.drinksCardContainer }>
        {data.drinks && data.drinks.filter((_, index) => index < mn)
          .map((item, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className={ styles.cardDiv }
            >
              <img
                src={ item.strDrinkThumb }
                alt="thumbnail"
                data-testid={ `${index}-card-img` }
                className={ styles.cardImg }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {item.strDrink}
              </p>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Drinks;
