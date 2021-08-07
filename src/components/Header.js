import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchHeaderSearch } from '../actions';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      hidden: true,
      keyWord: '',
      filter: '',
    };

    this.withSearch = this.withSearch.bind(this);
    this.withoutSearch = this.withoutSearch.bind(this);
    this.fetchHeaderSearch = this.fetchHeaderSearch.bind(this);
    this.redirectToRecipeDetail = this.redirectToRecipeDetail.bind(this);
  }

  componentDidUpdate() {
    this.redirectToRecipeDetail();
  }

  redirectToRecipeDetail() {
    const { headerSearchRecipes, history: { push, location: { pathname } } } = this.props;
    if (headerSearchRecipes.length === 1) {
      const id = pathname === '/comidas'
        ? headerSearchRecipes[0].idMeal : headerSearchRecipes[0].idDrink;
      push(`${pathname}/${id}`);
    }
  }

  fetchHeaderSearch() {
    const { dispatchFetchHeaderSearch, history: { location: { pathname } } } = this.props;
    const { keyWord, filter } = this.state;

    const type = pathname.replace('/', '');

    if (keyWord.length > 1 && filter === 'primeira-letra') {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    dispatchFetchHeaderSearch(type, filter, keyWord);
  }

  withSearch() {
    const { pageTitle, history } = this.props;
    const { hidden, keyWord } = this.state;

    return (
      <header>
        <h1 data-testid="page-title">{pageTitle}</h1>
        <button
          type="button"
          onClick={ () => history.push('/perfil') }
        >
          <img
            type="image"
            data-testid="profile-top-btn"
            src={ profile }
            alt=" Profile Icon"
          />
        </button>
        &nbsp;  &nbsp;  &nbsp;
        <button
          type="button"
          onClick={ () => (hidden
            ? this.setState({ hidden: false })
            : this.setState({ hidden: true })) }
        >
          <img
            type="image"
            data-testid="search-top-btn"
            src={ search }
            alt=" Search Icon"
          />
        </button>
       &nbsp;  &nbsp;  &nbsp;
        {
          !hidden
        && (
          <form>
            <fieldset>
              <legend>Filtro de busca</legend>
              <br />
              <input
                data-testid="search-input"
                value={ keyWord }
                type="text"
                placeholder="Buscar Receita"
                onChange={ ({ target: { value } }) => this.setState({ keyWord: value }) }
              />
                &nbsp;  &nbsp;
              <label htmlFor="ingredient">
                <input
                  data-testid="ingredient-search-radio"
                  value="ingrediente"
                  type="radio"
                  id="ingredient"
                  name="filter"
                  onChange={ ({ target: { value } }) => this.setState({ filter: value }) }
                />
                &nbsp;
                Ingrediente
              </label>
            &nbsp;
              <label htmlFor="name">
                <input
                  data-testid="name-search-radio"
                  value="nome"
                  type="radio"
                  id="name"
                  name="filter"
                  onClick={ ({ target: { value } }) => this.setState({ filter: value }) }

                />
                &nbsp;
                Nome
              </label>
            &nbsp;
              <label htmlFor="first-letter">
                <input
                  data-testid="first-letter-search-radio"
                  value="primeira-letra"
                  type="radio"
                  id="first-letter"
                  name="filter"
                  onClick={ ({ target: { value } }) => this.setState({ filter: value }) }
                />
                &nbsp;
                Primeira letra
              </label>
            &nbsp; &nbsp;
              <button
                data-testid="exec-search-btn"
                type="button"
                onClick={ () => this.fetchHeaderSearch() }
              >
                Buscar
              </button>
              <br />
              <br />
            </fieldset>
          </form>)
        }
        <br />
      </header>
    );
  }

  withoutSearch() {
    const { pageTitle } = this.props;
    return (
      <header>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profile }
          alt=" Profile Icon"
        />
      </header>
    );
  }

  render() {
    const { withSearch } = this.props;
    return (
      <div>
        {withSearch ? this.withSearch() : this.withoutSearch() }
      </div>
    );
  }
}

const mapStateToProps = ({ headerSearchReducer }) => ({
  headerSearchRecipes: headerSearchReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchHeaderSearch:
    (type, filter, keyWord) => dispatch(fetchHeaderSearch(type, filter, keyWord)),
});

Header.propTypes = {
  withSearch: PropTypes.bool,
  pageTitle: PropTypes.string,
  dispatchFetchHeaderSearch: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  headerSearchRecipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const headerWithRouter = withRouter(Header);
export default connect(mapStateToProps, mapDispatchToProps)(headerWithRouter);
