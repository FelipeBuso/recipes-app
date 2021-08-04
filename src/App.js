import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Perfil from './pages/Perfil';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <RecipesProvider>
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Comidas } />
            <Route exact path="/comidas/{id-da-receita}" />
            <Route exact path="/comidas/{id-da-receita}/in-progress" />
            <Route exact path="/bebidas/{id-da-receita}" />
            <Route exact path="/bebidas/{id-da-receita}/in-progress" />
            <Route exact path="/explorar" component={ Explorar } />
            <Route
              exact
              path="/explorar/comidas"
              component={ ExplorarComidas }
            />
            <Route
              exact
              path="/explorar/bebidas"
              component={ ExplorarBebidas }
            />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExplorarIngredientes }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExplorarIngredientes }
            />
            <Route
              exact
              path="/explorar/comidas/area"
              component={ () => <Header title="Explorar Origem" showSearchIcon /> }
            />
            <Route exact path="/perfil" component={ Perfil } />
            <Route
              exact
              path="/receitas-feitas"
              component={ () => <Header title="Receitas Feitas" /> }
            />
            <Route
              exact
              path="/receitas-favoritas"
              component={ () => <Header title="Receitas Favoritas" /> }
            />
          </RecipesProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
