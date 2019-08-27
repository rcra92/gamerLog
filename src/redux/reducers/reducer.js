const initialState = {
  games: [],
  loading: true,
  errorMessage: '',
}

const GET_GAME = 'GET_GAME';
const GET_GAME_FULFILLED = 'GET_GAME_FULFILLED';
const GET_GAME_ERROR = 'GET_GAME_ERROR';
const GET_GAME_DETAILS = 'GET_GAME_DETAILS'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME:
      return { ...state, loading: action.payload };
    case GET_GAME_FULFILLED:
      return { ...state, games: action.payload, loading: action.loading };
    case GET_GAME_ERROR:
      return { ...state, errorMessage: action.payload, loading: action.loading };
    case GET_GAME_DETAILS:
      return { ...state, gameDetails: action.payload, loading: action.loading };
    default:
      return state;
  }
}

export const fetchData = (bool) => {
  return {
    type: GET_GAME,
    payload: bool,
  };
}

export const fetchDataFulfilled = (data) => {
  return {
    type: GET_GAME_FULFILLED,
    payload: data,
    loading: false,
  };
}

export const fetchDetails = (data) => {
  return {
    type: GET_GAME_DETAILS,
    payload: [data],
    loading: false,
  };
}

export const fetchDataError = (error) => {
  return {
    type: GET_GAME_ERROR,
    payload: error,
    loading: false,
  };
}

export default reducer;