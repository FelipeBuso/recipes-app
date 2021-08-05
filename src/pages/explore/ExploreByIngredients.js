import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import { fetchByIngredients } from '../../redux/actions';

function ExploreByIngredients() {
  // const urlFetch = `https://www.themealdb.com/api/json/v1/1/search.php?s=${}`;
  const magicNumberFive = 12;
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const clearData = (recipeType) => dispatch(fetchByIngredients(recipeType));

  const fetchIngredients = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(url);
    const dataFetch = await response.json();
    setData([...dataFetch.meals]);
  };

  React.useEffect(() => {
    clearData('meals');
    fetchIngredients();
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {data && data.slice(0, magicNumberFive).map((item, index) => (
        <Link
          key={ index }
          to={ { pathname: '/comidas', state: item.strIngredient } }
        >
          <div key={ index }>
            <button
              data-testid={ `${index}-ingredient-card` }
              type="button"
            >
              {' '}
              oi
              {' '}
            </button>
            <h2
              data-testid={ `${index}-card-name` }
            >
              { item.strIngredient }
            </h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
              alt={ item.strIngredient }
            />
          </div>
        </Link>))}

      <Footer />
    </div>
  );
}

export default connect(null, null)(ExploreByIngredients);
