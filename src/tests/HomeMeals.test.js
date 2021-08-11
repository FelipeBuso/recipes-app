// HomeMeals.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeRecipe from '../pages/HomeRecipe';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import mockMeals from '../../cypress/mocks/meals';
import mockCategories from '../../cypress/mocks/mealCategories';

const INITIAL_STATE = {
  RecipesReducer: {
    recipesData: { meals: [] },
    recipeDetailsData: [],
    recipesRedirectData: [],
    isLoading: false,
    showRecipe: false,
  },
};

describe('Testes para página de HomeComidas', () => {
  it('Verifica se há os itens procurados', async () => {
    jest.spyOn(global, 'fetch');
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockMeals),
    });
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCategories),
    });
    const { findByText, findByTestId, store } = renderWithRouterAndRedux(
      <HomeRecipe location={ { state: '' } } />,
      { route: '/comidas' }, INITIAL_STATE,
    );
    expect(store.getState()).not.toEqual(INITIAL_STATE);
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    const Footer = screen.getByTestId('drinks-bottom-btn');
    expect(Footer).toBeInTheDocument();
    const type = await findByText(/Dal fry/i);
    const title = await findByTestId('1-recipe-card');
    expect(type).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    const myStore = store.getState();
    const firstRecipe = myStore.RecipesReducer.recipesData.meals[0];
    expect(firstRecipe.strMeal).toEqual('Corba');
    expect(myStore).not.toEqual(INITIAL_STATE);
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchIn = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const findRecipeBtn = screen.getByTestId('exec-search-btn');
    expect(searchIn).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(findRecipeBtn).toBeInTheDocument();
    userEvent.type(searchIn, 'asdasdsada');
    userEvent.click(nameRadio);
    userEvent.click(findRecipeBtn);
    const categorie = await findByTestId('All-category-filter');
    userEvent.click(categorie);
  });
  it('Verifica se há os itens procurados', async () => {
    jest.spyOn(global, 'fetch');
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockMeals),
    });
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCategories),
    });
    const { findByText } = renderWithRouterAndRedux(
      <HomeRecipe location={ { state: '' } } />,
      { route: '/comidas' }, INITIAL_STATE,
    );
    const Beef = await findByText(/Beef/i);
    expect(Beef).toBeInTheDocument();
    userEvent.click(Beef);
    const Breakfast = await findByText(/Breakfast/i);
    expect(Breakfast).toBeInTheDocument();
    userEvent.click(Breakfast);
    const Chicken = await findByText(/Chicken/i);
    expect(Chicken).toBeInTheDocument();
    userEvent.click(Chicken);
    const Dessert = await findByText(/Dessert/i);
    expect(Dessert).toBeInTheDocument();
    userEvent.click(Dessert);
    const Goat = await findByText(/Goat/i);
    expect(Goat).toBeInTheDocument();
    userEvent.click(Goat);
    const All = await findByText(/All/i);
    expect(All).toBeInTheDocument();
    userEvent.click(All);
  });
});

// Para utilizar o location
// <HomeRecipe location={ { state: 'chicken' } } />

// Para utilizar o match.param
// <HomeDetail match={ { params: { item: 'pamp' } } } />
