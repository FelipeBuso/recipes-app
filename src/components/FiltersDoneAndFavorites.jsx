import React from 'react';

class FiltersDoneAndFavorites extends React.Component {
  render() {
    return (
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </div>
    );
  }
}

export default FiltersDoneAndFavorites;
