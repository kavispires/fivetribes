/* ------------------   ACTIONS   ------------------ */

const CLEAR_SCORER = 'CLEAR_SCORER';
const SET_ARTISANS_EXPANSION = 'SET_ARTISANS_EXPANSION';
const SET_HINT = 'SET_HINT';
const SET_THIEVES_EXPANSION = 'SET_THIEVES_EXPANSION';
const SET_WHIMS_EXPANSION = 'SET_WHIMS_EXPANSION';

/* --------------   ACTION CREATORS   -------------- */


export const clearScorer = payload => dispatch => dispatch({ type: CLEAR_SCORER, payload });
export const setHint = payload => dispatch => dispatch({ type: SET_HINT, payload });
export const setArtisansExpansion = payload => dispatch => dispatch({ type: SET_ARTISANS_EXPANSION, payload });
export const setThievesExpansion = payload => dispatch => dispatch({ type: SET_THIEVES_EXPANSION, payload });
export const setWhimesExpanison = payload => dispatch => dispatch({ type: SET_WHIMS_EXPANSION, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
	hint: '',
  artisansExpansion: false,
  thievesExpansion: false,
  whimsExpansion: false,
  categories: []
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

  	case SET_HINT:
  		newState.hint = action.payload;
  		break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

// When app.mode is 'scorer' and app.newSession is 'scorer'
