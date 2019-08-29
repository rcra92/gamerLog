import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
import {
  fetchData,
  fetchDataFulfilled,
  fetchDataError,
  fetchDetails,
} from './reducers/reducer';

export const getGames = (params = {text: 'gta%20v'}) => {
  return async dispatch => {
    try {
      const gamesRequest = await fetch(
        `https://api.rawg.io/api/games?search=${params.text}`,
      );
      dispatch(fetchData(true));
      const games = await gamesRequest.json();
      console.log(games);
      dispatch(fetchDataFulfilled(games.results));
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

export const getDetails = game => {
  return async dispatch => {
    try {
      const starWarsPromise = await fetch(
        `https://api.rawg.io/api/games/${game}`,
      );
      dispatch(fetchData(true));
      const people = await starWarsPromise.json();
      dispatch(fetchDetails(people));
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

export default createStore(reducer, applyMiddleware(thunk));
