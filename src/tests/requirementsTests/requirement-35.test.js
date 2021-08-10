import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { FoodDetails, DrinkDetails } from '../../pages';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';

const mockMealPath = '/comidas/52977';
const mockMealsMatch = { params: { id: '52977' }, url: '/comidas/52977' };

const mockDrinkPath = '/bebidas/15997';
const mockDrinkMatch = { params: { id: '15997' }, url: '/bebidas/15997' };

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`35 - Design the screen so that it contains an image of the recipe, the title, 
the category (or whether or not you are alcoholic), a list of ingredients followed by the
quantities, instructions, a "drunk" youtube video, and recommendations`, () => {
  it('Check if the elements described in the prototype exist in the food details screen',
    async () => {
      renderWithRouterAndStore(<FoodDetails match={ mockMealsMatch } />, mockMealPath);

      const firstRecommendationCard = await screen.findByTestId('0-recomendation-card');
      const secondRecommendationCard = await screen.findByTestId('1-recomendation-card');
      const thirdRecommendationCard = await screen.findByTestId('2-recomendation-card');
      const fourthRecommendationCard = await screen.findByTestId('3-recomendation-card');
      const fivethRecommendationCard = await screen.findByTestId('4-recomendation-card');
      const sixthRecommendationCard = await screen.findByTestId('5-recomendation-card');

      expect(firstRecommendationCard).toBeInTheDocument();
      expect(secondRecommendationCard).toBeInTheDocument();
      expect(thirdRecommendationCard).toBeInTheDocument();
      expect(fourthRecommendationCard).toBeInTheDocument();
      expect(fivethRecommendationCard).toBeInTheDocument();
      expect(sixthRecommendationCard).toBeInTheDocument();
    });

  it(`Check if the elements described in the prototype exist in the drink details 
  screen`, async () => {
    renderWithRouterAndStore(<DrinkDetails match={ mockDrinkMatch } />, mockDrinkPath);

    const firstRecommendationCard = await screen.findByTestId('0-recomendation-card');
    const secondRecommendationCard = await screen.findByTestId('1-recomendation-card');
    const thirdRecommendationCard = await screen.findByTestId('2-recomendation-card');
    const fourthRecommendationCard = await screen.findByTestId('3-recomendation-card');
    const fivethRecommendationCard = await screen.findByTestId('4-recomendation-card');
    const sixthRecommendationCard = await screen.findByTestId('5-recomendation-card');

    expect(firstRecommendationCard).toBeInTheDocument();
    expect(secondRecommendationCard).toBeInTheDocument();
    expect(thirdRecommendationCard).toBeInTheDocument();
    expect(fourthRecommendationCard).toBeInTheDocument();
    expect(fivethRecommendationCard).toBeInTheDocument();
    expect(sixthRecommendationCard).toBeInTheDocument();
  });
});
