import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

export default function ExplorarComida() {
  return (
    <div>
      <Header lupa={ false } text="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button" data-testid="explore-by-area">
          Por Local de Origem
        </button>
      </Link>
      <button type="button" data-testid="explore-surprise">
        Me Surpreenda!
      </button>
      <LowerMenu />
    </div>
  );
}
