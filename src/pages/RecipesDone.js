import React from 'react';
import Header from '../components/Header';

function RecipesDone() {
  return (
    <>
      <Header withSearch={ false } pageTitle="Receitas Feitas" />
      <br />
      <main>
        <h1>Conteúdo da tela de Receitas Feitas</h1>
      </main>
    </>
  );
}

export default RecipesDone;
