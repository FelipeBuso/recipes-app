import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';

function Header(props) {
  const [hidden, setHidden] = useState(false);

  const searchIconRender = (<img
    aria-hidden="true"
    onClick={ () => setHidden(!hidden) }
    className="container-search-icon"
    data-testid="search-top-btn"
    src={ searchIcon }
    alt="search icon"
  />);

  const { title, showSearchIcon } = props;

  return (
    <header data-testid="header" className="header">
      <div className="container-main-header">
        <div className="container-title-icons">
          <Link to="/perfil" className="profile-icon-bg">
            <img
              className="container-profile-icon"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </Link>
          <h3
            className="container-title-header"
            data-testid="page-title"
          >
            { title }
          </h3>
          <div className="search-icon-bg">
            { showSearchIcon ? searchIconRender : null }
          </div>
        </div>
      </div>
      { hidden && <SearchBar /> }
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
  showSearchIcon: PropTypes.bool,
}.isRequired;
