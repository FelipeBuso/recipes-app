import React, { Component } from 'react';
import { connect } from 'react-redux';

class FoodDetailsCard extends Component {
  render() {
    const { foodDetails } = this.props;
    const ingredients = Object.values(foodDetails).slice(9, 29);
    const measurements = Object.values(foodDetails).slice(29, 49);

    return (
      <div>
        <img
          data-testid="recipe-photo"
          alt="Foto do prato"
          src={ foodDetails.strMealThumb }
          width="300px"
          height="250px"
        />
        <h1 data-testid="recipe-title">{ foodDetails.strMeal }</h1>
        <p data-testid="recipe-category">{ foodDetails.strCategory }</p>
        <ul>
          { ingredients
            .map((item, index) => (item
              ? <li key={ index }>{`${item} - ${measurements[index]}`}</li> : ''))}
        </ul>
        <p data-testid="instructions">{ foodDetails.strInstructions }</p>
        <iframe
          data-testid="video"
          width="300px"
          height="250px"
          title="Vídeo da Receita"
          src={ foodDetails.strYoutube }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodDetails: state.foodReducer.foodDetails,
});

export default connect(mapStateToProps)(FoodDetailsCard);
