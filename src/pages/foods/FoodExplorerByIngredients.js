import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SearchBarProvider } from '../../context/SearchBar';
import CardsListByIngredient from '../../components/CardsListByIngredient';

export default function FoodExplorerByIngredients() {
  return (
    <>
      <SearchBarProvider>
        <Header title="Explorar Ingredientes" search={ false } />
        <CardsListByIngredient fetchType="themealdb" />
      </SearchBarProvider>
      <Footer />
    </>
  );
}
