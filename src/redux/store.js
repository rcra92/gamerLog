import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
import {
  fetchData,
  fetchDataFulfilled,
  fetchDataError,
  fetchDetails,
} from './reducers/reducer';

export const getGames = () => {
  return async dispatch => {
    try {
      const gamesRequest = await fetch(
        'https://api.rawg.io/api/games?page_size=5&search=gta%20v',
      );
      dispatch(fetchData(true));
      const games = await gamesRequest.json();
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
      console.log('people-----------', people);
      dispatch(fetchDetails(people));
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

export default createStore(reducer, applyMiddleware(thunk));
