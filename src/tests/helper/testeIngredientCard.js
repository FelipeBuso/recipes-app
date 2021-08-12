import { screen } from '@testing-library/react';

export const testMealsRecipeIngredient = async (menu, maxCards) => {
  const reduceToMaxCards = menu.slice(0, maxCards);
  await Promise.all(
    reduceToMaxCards.map(async ({ strIngredient, strMealThumb }, index) => {
      const foodCard = await screen.findByTestId(`${index}-ingredient-card`);
      const foodCardImg = await screen.findByTestId(`${index}-card-img`);
      const foodCardName = await screen.findByTestId(`${index}-card-name`);

      expect(foodCard).toBeInTheDocument();
      expect(foodCard).toHaveAttribute('href', '/comidas');
      expect(foodCardImg).toHaveAttribute('src', strMealThumb);
      expect(foodCardName).toHaveTextContent(strIngredient);
    }),
  );
};

export const testDrinksRecipeIngredient = async (menu, maxCards) => {
  const reduceToMaxCards = menu.slice(0, maxCards);
  await Promise.all(
    reduceToMaxCards.map(async ({ strIngredient1, strDrinkThumb }, index) => {
      const drinkCard = await screen.findByTestId(`${index}-ingredient-card`);
      const drinkCardImg = await screen.findByTestId(`${index}-card-img`);
      const drinkCardName = await screen.findByTestId(`${index}-card-name`);

      expect(drinkCard).toBeInTheDocument();
      expect(drinkCard).toHaveAttribute('href', '/bebidas');
      expect(drinkCardImg).toHaveAttribute('src', strDrinkThumb);
      expect(drinkCardName).toHaveTextContent(strIngredient1);
    }),
  );
};
