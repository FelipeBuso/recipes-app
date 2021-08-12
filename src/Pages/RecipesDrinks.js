import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './RecipesFoods.css';
import CardRecipes from '../Components/CardRecipes';
import { getDrink } from '../Services/FetchApi';
import MyContext from '../Context/MyContext';

export default function RecipesDrink() {
  const { cards, setCards } = useContext(MyContext);
  
  const busca = async () => {
    const resposta = await getDrink();
    setCards(resposta.drinks);
    }
  useEffect(() => {
    busca();
  }, []);
  
    const renderCardRecipes = () => {
    const showMaxRecipes = 12;
    if (cards) {
      const filteredRecipe = cards.filter(
        (drinks, index) => index < showMaxRecipes,
      );
      return filteredRecipe;
   }
  };
  return (
    <div>
      <Header className="title" title="Bebidas" searchIconAppears />
      <div className="cardlist">
      {cards.length>0 && renderCardRecipes().map((recp, index ) => (
        <Link
         className="link"
         key= { index }
         to= "/bebidas/drink-details"
        >
          <CardRecipes
            key={ index }
            index={ index }
            thumb={ recp.strDrinkThumb }
            title={ recp.strDrink }
          />
        </Link>
      ))}  
      </div>
      <Footer />
    </div>
  );
}
