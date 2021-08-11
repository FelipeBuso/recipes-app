import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './RecipesFoods.css';
import CardRecipes from '../Components/CardRecipes';
import MyContext from '../Context/MyContext';
import { getFood } from '../Services/FetchApi';

export default function RecipesFood() {
  const { cards, setCards } = useContext(MyContext);

  const searchCards = async () => {
    const response = await getFood();
    setCards(response.meals);
  };

  useEffect(() => {
    searchCards();
  }, []);

  const renderCardRecipes = () => {
    const showMaxRecipes = 12;
    if (cards) {
      const filteredRecipe = cards.filter(
        (meals, index) => index < showMaxRecipes,
      );
      return filteredRecipe;
    }
  };

  return (
    <div>
      <Header className="title" title="Comidas" searchIconAppears />
      <div className="cardlist">
        {cards.length > 0 && renderCardRecipes().map((recp, index) => (
          <Link
            className="link"
            key={ index }
            to={ {
              pathname: `/comidas/${recp.idMeal}`,
            } }
          >
            <CardRecipes
              key={ index }
              index={ index }
              thumb={ recp.strMealThumb }
              title={ recp.strMeal }
            />
          </Link>))}
      </div>
      <Footer />
    </div>
  );
}
