import { deleteLocalStorage, loadLocalStorage } from '../utils';

import {
  setColors,
  setExpasions,
  setNumPlayers,
  setIsSetupReady,
} from './scorer';

/* ------------------   ACTIONS   ------------------ */

const SET_HISTORY = 'SET_HISTORY';
const SET_SCREEN = 'SET_SCREEN';

/* --------------   ACTION CREATORS   -------------- */

export const setHistory = payload => dispatch =>
  dispatch({ type: SET_HISTORY, payload });
export const setScreen = payload => dispatch =>
  dispatch({ type: SET_SCREEN, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  screen: '',
  history: [''],
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_HISTORY:
      newState.history = action.payload;
      break;

    case SET_SCREEN:
      newState.screen = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const initialize = () => dispatch => {
  console.log('Initializing...');
  // Load localstorage
  const data = loadLocalStorage();

  let nextScreen = 'home';

  // If it has date, load it to app
  if (data) {
    console.log('Data retrived!', data);
    const age = Date.now() - data.timestamp;

    // If timestamp is older than 90 minutes, delete localstorage
    if (age > 5400000) {
      console.log('Data is expired!');
      deleteLocalStorage();
    } else {
      console.log('Data is fine');
      // Assign current Screen
      nextScreen = data.screen;
      // Handle setup
      dispatch(setColors(data.colors));
      dispatch(setExpasions(data.expansions));
      dispatch(setNumPlayers(data.numPlayers));
      dispatch(setIsSetupReady(true));
    }
  }

  setTimeout(() => {
    console.log('Switching screens to', nextScreen);
    dispatch(setScreen(nextScreen));
  }, 3000); // TO-DO Change to 3000
};

export const handleHomeButton = screen => (dispatch, getState) => {
  const history = [...getState().app.history];

  history.push(screen);
  dispatch(setHistory(history));
  dispatch(setScreen(screen));
};
