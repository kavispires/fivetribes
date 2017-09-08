/* ------------------   ACTIONS   ------------------ */

const SET_MODE = 'SET_MODE';
const SET_NEW_SESSION = 'SET_NEW_SESSION';
const TOGGLE_SCORER = 'TOGGLE_SCORER';
const TOGGLE_SOLITAIRE = 'TOGGLE_SOLITAIRE';

/* --------------   ACTION CREATORS   -------------- */

export const setMode = payload => dispatch => dispatch({ type: SET_MODE, payload });
export const setNewSession = payload => dispatch => dispatch({ type: SET_NEW_SESSION, payload });
export const toggleScorer = payload => dispatch => dispatch({ type: TOGGLE_SCORER, payload });
export const toggleSolitaire = payload => dispatch => dispatch({ type: TOGGLE_SOLITAIRE, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  mode: '',
  newSession: true,
  scorerSession: false,
  solitaireSession: false,
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_MODE:
      newState.mode = action.payload;
      break;

    case SET_NEW_SESSION:
      newState.newSession = action.payload;
      break;

    case TOGGLE_SCORER:
      newState.scorerSession = action.payload;
      break;

    case TOGGLE_SOLITAIRE:
      newState.solitaireSession = action.payload;
      break;

    default:
      return prevState;

  }

  return newState;

}

/* ---------------   DISPATCHERS   ----------------- */

export const selectMode = (event) => (dispatch) => {
  const [action, mode] = event.target.name.split('-');
  dispatch(setMode(mode));

  if (mode === 'scorer') {
    dispatch(toggleScorer(true));
  } else if (mode === 'solitaire') {
    dispatch(toggleSolitaire(true));
  }

  if (action === 'new') {
    dispatch(setNewSession(true));
  } else {
    dispatch(setNewSession(false));
  }
};
