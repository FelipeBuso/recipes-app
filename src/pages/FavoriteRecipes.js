import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import CardsRecipesFavorites from '../components/CardsRecipesFavorites';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);
  const [type, setType] = useState('all');

  useEffect(() => {
    if (favoriteRecipes) {
      let newFilteredRecipes = [...favoriteRecipes];
      if (type !== 'all') {
        newFilteredRecipes = newFilteredRecipes.filter((recipe) => recipe.type === type);
      }
      setFilteredRecipes(newFilteredRecipes);
    }
  }, [type]);

  const handleChange = (btn) => setType(btn);

  const handleDisfavor = (id) => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    setFilteredRecipes(recipes);
  };

  return (
    <>
      <Header title="Receitas Favoritas" search={ false } />
      <ToggleButtonGroup
        className="container-buttons"
        type="radio"
        name="type"
        value={ type }
        onChange={ handleChange }
      >
        <ToggleButton name="type" data-testid="filter-by-all-btn" value="all">
          All
        </ToggleButton>
        <ToggleButton name="type" data-testid="filter-by-food-btn" value="comida">
          Food
        </ToggleButton>
        <ToggleButton name="type" data-testid="filter-by-drink-btn" value="bebida">
          Drink
        </ToggleButton>
      </ToggleButtonGroup>
      <section>
        {filteredRecipes && filteredRecipes.map((recipe, index) => (
          <CardsRecipesFavorites
            recipe={ recipe }
            index={ index }
            key={ index }
            handleDisfavor={ handleDisfavor }
          />
        ))}
      </section>
    </>
  );
}
