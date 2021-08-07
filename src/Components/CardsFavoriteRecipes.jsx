import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default class CardsFavoriteRecipes extends Component {
  constructor(props) {
    super(props);
    const { favorites } = this.props;

    this.state = {
      favorites,
      copyLink: false,
    };

    this.copySuccess = this.copySuccess.bind(this);
    this.favoriteOrNotRecipe = this.favoriteOrNotRecipe.bind(this);
  }

  copySuccess() {
    const oneSecond = 1000;
    this.setState({
      copyLink: true,
    });
    setTimeout(() => {
      this.setState({
        copyLink: false,
      });
    }, oneSecond);
  }

  favoriteOrNotRecipe({ id }) {
    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = storageFavoriteRecipes
      .filter((eachRecipe) => eachRecipe.id !== id);

    this.setState({
      favorites: newFavoriteRecipes,
    });

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  }

  render() {
    const { copyLink, favorites } = this.state;
    return (
      <div>
        {favorites.map((recipe, index) => (
          <div key={ index }>
            <img
              alt="imagem"
              src={ recipe.image }
              width="150px"
              data-testid={ `${index}-horizontal-image` }
            />
            <h6
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.area !== ''
                ? `${recipe.area} - ${recipe.category}` : `${recipe.alcoholicOrNot}`}
            </h6>
            <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
            <CopyToClipboard
              text={ `${window.location.origin}/${recipe.type}s/${recipe.id}` }
            >
              <button
                style={ { color: 'white',
                  backgroundColor: 'rgb(151, 0, 0)',
                  width: '100%' } }
                type="button"
                data-testid="share-btn"
                onClick={ this.copySuccess }
              >
                <img
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </CopyToClipboard>
            <button type="button" onClick={ () => this.favoriteOrNotRecipe(recipe) }>
              <img
                src={ blackHeartIcon }
                alt="share"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>))}
        {copyLink ? <h6>Link copiado!</h6> : null}
      </div>);
  }
}

CardsFavoriteRecipes.propTypes = {
  favorites: PropTypes.shape({
    myFavoriteRecipes: PropTypes.arrayOf(),
  }),
}.isRequired;
