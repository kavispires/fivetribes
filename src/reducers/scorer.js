import { setNav } from './app';

/* ------------------   ACTIONS   ------------------ */

const CLEAR_SCORER = 'CLEAR_SCORER';
const SET_ARTISANS_EXPANSION = 'SET_ARTISANS_EXPANSION';
const SET_HINT = 'SET_HINT';
const SET_NUM_PLAYERS = 'SET_NUM_PLAYERS';
const SET_THIEVES_EXPANSION = 'SET_THIEVES_EXPANSION';
const SET_WHIMS_EXPANSION = 'SET_WHIMS_EXPANSION';

/* --------------   ACTION CREATORS   -------------- */

export const clearScorer = payload => dispatch => dispatch({ type: CLEAR_SCORER, payload });
export const setHint = payload => dispatch => dispatch({ type: SET_HINT, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
	hint: '',
  numPlayers: 0,
  artisansExpansion: false,
  thievesExpansion: false,
  whimsExpansion: false,
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_ARTISANS_EXPANSION:
      newState.artisansExpansion = action.payload;
      break;

    case SET_NUM_PLAYERS:
      newState.numPlayers = action.payload;
      break;

  	case SET_HINT:
  		newState.hint = action.payload;
  		break;

    case SET_THIEVES_EXPANSION:
      newState.thievesExpansion = action.payload;
      break;

    case SET_WHIMS_EXPANSION:
      newState.whimsExpansion = action.payload;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const setNumPlayers = (evt) => (dispatch) => {
  const numPlayers = +evt.target.value;
  return dispatch({ type: SET_NUM_PLAYERS, numPlayers });
  // TO-DO: When user select any number of players, enable button
};

export const setExpansions = (evt) => (dispatch) => {
  const expName = evt.target.value;
  const payload = true;

  let typeAction;

  if (expName === 'Artisans') {
    typeAction = 'SET_ARTISANS_EXPANSION';
  }
  else if (expName === 'Thieves') {
    typeAction = 'SET_THIEVES_EXPANSION';
  }
  else if (expName === 'Whims') {
    typeAction = 'SET_WHIMS_EXPANSION';
  }

  return dispatch({ type: typeAction, payload});
};
