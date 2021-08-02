import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '../images/searchIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
    this.centralHeader = this.centralHeader.bind(this);
    this.profileButton = this.profileButton.bind(this);
    this.searchButton = this.searchButton.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }

  profileButton() {
    return (
      <Link to="/perfil">
        <button
          type="button"
          data-testid="profile-top-btn"
        >
          <img src={ ProfileIcon } alt="profileIcon" />
        </button>
      </Link>
    );
  }

  searchButton() {
    return (
      <button
        type="button"
        onClick={ () => this.showSearch() }
      >
        <img src={ SearchIcon } data-testid="search-top-btn" alt="searchIcon" />
      </button>
    );
  }

  showSearch() {
    const { disabled } = this.state;
    if (disabled === true) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  centralHeader() {
    const { recipeType } = this.props;
    const { disabled } = this.state;
    return (
      !disabled ? (<SearchBar recipeType={ recipeType } />) : null
    );
  }

  render() {
    const { title } = this.props;
    return (
      <header>
        { this.profileButton() }
        <h1 data-testid="page-title">{ title }</h1>
        { this.searchButton() }
        { this.centralHeader() }
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
