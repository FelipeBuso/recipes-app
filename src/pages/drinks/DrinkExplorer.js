import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../../components/Header';
import { SearchBarProvider } from '../../context/SearchBar';
import Footer from '../../components/Footer';
import fetchByFilter from '../../services/data';

export default function DrinkExplorer() {
  const history = useHistory();
  const [idRandomDrink, setIdRandomDrink] = useState('');

  useEffect(() => {
    const getRandomDrink = async () => {
      const urlToFetch = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const { drinks } = await fetchByFilter(urlToFetch);
      setIdRandomDrink(drinks[0].idDrink);
    };
    getRandomDrink();
  }, []);

  return (
    <>
      <SearchBarProvider>
        <Header title="Explorar Bebidas" />
      </SearchBarProvider>
      <section className="container-buttons">
        <Button
          className="button-style"
          variant="dark"
          type="button"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
        <Button
          variant="dark"
          className="button-style"
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/bebidas/${idRandomDrink}`) }
        >
          Me Surpreenda!
        </Button>
      </section>
      <Footer />
    </>
  );
}
