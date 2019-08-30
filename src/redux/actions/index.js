import * as types from '../types';

import {getData} from '../../utils/AsyncStorage';

async function getFavorites() {
  try {
    const value = await getData();
    const responseJson = await JSON.parse(value);
    return responseJson;
  } catch (e) {
    // error reading value
  }
}

export const getGames = (params = {text: 'gta%20v'}) => {
  return async dispatch => {
    try {
      const favorites = await getFavorites();
      const gamesRequest = await fetch(
        `https://api.rawg.io/api/games?search=${params.text}`,
      );
      dispatch(fetchData(true));
      const games = await gamesRequest.json();
      let fillLikes = games.results.map(game => {
        var result = favorites.filter(favorite => favorite.slug === game.slug);
        if (result.length > 0) {
          return {...game, liked: 1};
        }
        return {...game, liked: 0};
      });
      dispatch(fetchDataFulfilled(fillLikes));
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

export const getDetails = game => {
  return async dispatch => {
    try {
      const gameDetails = await fetch(`https://api.rawg.io/api/games/${game}`);
      const getRelated = await fetch(
        `https://api.rawg.io/api/games/${game}/suggested?page_size=10`,
      );
      dispatch(fetchData(true));
      const details = await gameDetails.json();
      const related = await getRelated.json();
      dispatch(fetchDetails(details));
      dispatch(fetchRelated(related.results));
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

export const fetchData = bool => {
  return {
    type: types.GET_GAME,
    payload: bool,
  };
};

export const fetchDataFulfilled = data => {
  return {
    type: types.GET_GAME_FULFILLED,
    payload: data,
    loading: false,
  };
};

export const fetchDetails = data => {
  return {
    type: types.GET_GAME_DETAILS,
    payload: [data],
    loading: false,
  };
};

export const fetchRelated = data => {
  return {
    type: types.GET_GAME_RELATED,
    payload: data,
    loading: false,
  };
};

export const fetchDataError = error => {
  return {
    type: types.GET_GAME_ERROR,
    payload: error,
    loading: false,
  };
};
