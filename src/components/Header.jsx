import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = ({ title, hasSearchBar }) => {
  const [isSearchShowing, setIsSearchShowing] = useState(false);

  return (
    <header>
      <Link to="/perfil">
        <button type="button">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Perfil" />
        </button>
      </Link>
      <span data-testid="page-title">{ title }</span>
      { hasSearchBar && (
        <button
          onClick={ () => setIsSearchShowing(!isSearchShowing) }
          type="button"
        >
          <img data-testid="search-top-btn" src={ SearchIcon } alt="Procurar" />
        </button>)}
    </header>
  );
};

export default Header;

Header.propTypes = ({
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool,
});

Header.defaultProps = ({
  hasSearchBar: false,
});
