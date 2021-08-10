import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Spinner,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
  retrieveInProgressRecipes,
  setInProgressRecipe,
} from '../../../../services/handleLocalStorage';
import { fetchDetails } from '../../../../services/fetchDetailsApi';
import FavoriteButton from '../../../../components/Details/FavoriteButton/index';
import CopyButton from '../../../../components/Details/CopyButton/index';

export default function BebidasInProgress({ match: { params: { recipeId } } }) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [isRecipeFinalized, setIsRecipeFinalized] = useState(false);

  useEffect(() => {
    const verifyFinalizedBtn = () => {
      const checkIngredients = Object.keys(details)
        .filter((key) => key.includes('strIngredient'));
      if (checkIngredients.length === ingredients.length) {
        setIsRecipeFinalized(true);
      } else {
        setIsRecipeFinalized(false);
      }
    };

    if (ingredients.length !== 0) {
      setInProgressRecipe('cocktails', recipeId, ingredients);
    }
    verifyFinalizedBtn();
  }, [details, recipeId, ingredients]);

  useEffect(() => {
    const recipesInprogress = retrieveInProgressRecipes();
    if (recipesInprogress.cocktails[recipeId]) {
      setIngredients([...recipesInprogress.cocktails[recipeId]]);
    } else {
      setIngredients([]);
    }
  }, [recipeId]);

  useEffect(() => {
    const fetchApi = async () => {
      const getDetails = await fetchDetails('drink', recipeId);
      setDetails(getDetails);
      setIsLoading(false);
    };
    fetchApi();
  }, [recipeId]);

  const loading = () => (
    <Container className="d-flex m-auto flex-column justify-content-center">
      <Spinner className="m-auto" animation="border" role="status" />
      <h2 className="m-auto">Loading</h2>
    </Container>
  );

  const handleCheckbox = ({
    target: {
      nextElementSibling,
      defaultChecked,
      id,
    },
  }) => {
    nextElementSibling.classList.toggle('line-through');
    const index = Number(id.split('-')[1]);
    if (!defaultChecked) {
      setIngredients([...ingredients, index]);
    } else {
      const filteredIngredients = ingredients.filter((el) => el !== index);
      setIngredients([...filteredIngredients]);
    }
  };

  const history = useHistory();
  const handleFinalizedBtn = () => {
    history.push('/receitas-feitas');
  };

  const pageContent = () => {
    const {
      strDrink,
      strCategory,
      strInstructions,
      strDrinkThumb,
      strAlcoholic,
    } = details;

    return (
      <Container fluid="md" style={ { backgroundColor: '#0fa36b' } } as="main">
        <Row>
          <Col as="figure" className="m-auto" sd="12" md="8" lg="6">
            <Image
              className="my-3 p-3 shadow-lg"
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt="Foto da receita em progresso"
              fluid
              thumbnail
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <h1 data-testid="recipe-title">{ strDrink }</h1>
          </Col>
        </Row>
        <Row
          as="nav"
          data-testid="recipe-category"
          className="mb-3 p-3 d-flex m-auto justify-content-center"
        >
          <Col className="col-3 my-auto align-content-center">
            <span>
              <strong>{ strCategory }</strong>
            </span>
          </Col>
          <Col className="col-3 my-auto align-content-center">
            <span className="">{ strAlcoholic }</span>
          </Col>
          <Col className="col-6 d-flex justify-content-end">
            <CopyButton />
            <FavoriteButton recipeId={ recipeId } selector="drink" details={ details } />
          </Col>
        </Row>
        <Row className="bg-secondary text-light">
          <Col className="col-12">
            <h2>Ingredientes</h2>
          </Col>
          {
            Object.keys(details)
              .filter((key) => key.includes('strIngredient'))
              .map((key, index) => (
                <Col key={ index } className="col-12">
                  <Form.Group
                    data-testid={ `${index}-ingredient-step` }
                    className="ml-2 mb-1"
                    controlId={ `item-${index}` }
                  >
                    <Form.Check
                      type="checkbox"
                      defaultChecked={ ingredients.some((el) => el === index) }
                      label={
                        `${details[key]} :${details[`strMeasure${index + 1}`] || ''}`
                      }
                      onClick={ handleCheckbox }
                    />
                  </Form.Group>
                </Col>
              ))
          }
        </Row>
        <Row>
          <Col className="col-12">
            <h2>Instruções</h2>
          </Col>
          <Col className="col-12">
            <p className="text-justify" data-testid="instructions">{ strInstructions }</p>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Button
              data-testid="finish-recipe-btn"
              onClick={ handleFinalizedBtn }
              disabled={ !isRecipeFinalized }
            >
              Finalizar Receita
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    isLoading ? loading() : pageContent()
  );
}

BebidasInProgress.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }),
  }).isRequired,
});
