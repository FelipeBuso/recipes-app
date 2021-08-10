import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExploreMealsArea } from '../../redux/actions';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';

function ExploreFoodsArea({ match }) {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const { meals } = useSelector((state) => state.MealsByArea);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAreas = () => {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json())
        .then((data) => setAreas(data.meals));
    };
    fetchAreas();
    dispatch(fetchExploreMealsArea('https://www.themealdb.com/api/json/v1/1/search.php?s='));
  }, [dispatch]);

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    if (selectedArea === 'All') {
      const normalUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      dispatch(fetchExploreMealsArea(normalUrl));
    }
    dispatch(fetchExploreMealsArea(url));
  }, [dispatch, selectedArea]);

  const selectHandle = ({ target }) => {
    setSelectedArea(target.value);
  };

  console.log(selectedArea);
  const magicNumber = 12;
  return (
    <>
      <Header title="Explorar Origem" glass="true" match={ match } />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ selectHandle }
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {areas.map((item) => (
            <option
              key={ item.strArea }
              data-testid={ `${item.strArea}-option` }
              value={ item.strArea }
            >
              {item.strArea}
            </option>
          ))}
        </select>
      </div>
      <div>
        {meals && meals.filter((_, index) => index < magicNumber).map((item, index) => (
          <Link
            key={ index }
            to={ `/comidas/${item.idMeal}` }
          >
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ item.strMealThumb }
                alt="Meal"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {item.strMeal}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

ExploreFoodsArea.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ExploreFoodsArea;
