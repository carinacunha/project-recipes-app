import React from 'react';
import PropTypes from 'prop-types';
import '../css/ButtonStart.css';

function ButtonStart(props) {
  const { type, history, id } = props;
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  const isDone = done && done.some((recipe) => recipe.id === id);
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let isStarted = false;
  if (inProgress) {
    const inProgressKey = Object.keys(inProgress);
    const inProgressRecipes = inProgressKey.reduce((acc, key) => {
      const recipes = Object.keys(inProgress[key]);
      return [...acc, ...recipes];
    }, []);
    const isInProgress = inProgressRecipes.includes(id);
    isStarted = isInProgress;
  }

  const changeRoute = () => {
    history.push(`/${type}/${id}/in-progress`);
  };
  return (
    isDone ? null
      : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ changeRoute }
          className="start-btn"
        >
          { isStarted ? 'continue' : 'start' }
        </button>)
  );
}

ButtonStart.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default ButtonStart;
