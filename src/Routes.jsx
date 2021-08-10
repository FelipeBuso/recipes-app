import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Login,
  Perfil,
  Drinks,
  Foods,
  Explore,
  RecipesMade,
  FavoriteRecipes,
  FoodExplore,
  DrinksExplore,
  ExploreOrigin,
  ExploreFoodsIngredients,
  ExploreCocktailsIngredients,
  NotFound,
} from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/perfil"
        component={ Perfil }
      />
      <Route
        exact
        path="/explorar"
        component={ Explore }
      />
      <Route
        exact
        path="/comidas"
        component={ Foods }
      />
      <Route
        exact
        path="/bebidas"
        component={ Drinks }
      />
      <Route
        exact
        path="/receitas-feitas"
        component={ RecipesMade }
      />
      <Route
        exact
        path="/receitas-favoritas"
        component={ FavoriteRecipes }
      />
      <Route
        exact
        path="/explorar/comidas"
        component={ FoodExplore }
      />
      <Route
        exact
        path="/explorar/bebidas"
        component={ DrinksExplore }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        component={ ExploreOrigin }
      />
      <Route
        exact
        path="/comidas/:id-da-receitas"
      />
      <Route
        exact
        path="/bebidas/:id-da-receitas"
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreCocktailsIngredients }
      />
      <Route
        exact
        path="/comidas/:id-da-receitas/in-progress"
      />
      <Route
        exact
        path="/bebidas/:id-da-receitas/in-progress"
      />
      <Route component={ NotFound } />
    </Switch>
  </BrowserRouter>
);

export default Routes;
