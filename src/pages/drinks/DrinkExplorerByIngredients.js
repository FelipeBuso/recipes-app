import React from 'react';
import Header from '../../components/Header';
import { SearchBarProvider } from '../../context/SearchBar';
import Footer from '../../components/Footer';
import CardsListByIngredient from '../../components/CardsListByIngredient';

export default function DrinkExplorerByIngredients() {
  return (
    <>
      <SearchBarProvider>
        <Header title="Explorar Ingredientes" />
      </SearchBarProvider>
      <CardsListByIngredient />
      <Footer />
    </>
  );
}
