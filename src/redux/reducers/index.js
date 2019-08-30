import * as types from '../types';

const initialState = {
  games: [],
  gameDetails: [],
  gameRelated: [],
  loading: true,
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GAME:
      return {...state, loading: action.payload};
    case types.GET_GAME_FULFILLED:
      return {...state, games: action.payload, loading: action.loading};
    case types.GET_GAME_ERROR:
      return {...state, errorMessage: action.payload, loading: action.loading};
    case types.GET_GAME_DETAILS:
      return {...state, gameDetails: action.payload, loading: action.loading};
    case types.GET_GAME_RELATED:
      return {...state, gameRelated: action.payload, loading: action.loading};
    default:
      return state;
  }
};

export default reducer;
