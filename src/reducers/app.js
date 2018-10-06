import { deleteLocalStorage, loadLocalStorage } from '../utils';

import {
  setColors,
  setExpasions,
  setNumPlayers,
  setIsSetupReady,
} from './scorer';

import { HISTORY_CHAIN } from '../constants';

/* ------------------   ACTIONS   ------------------ */

const SET_SCREEN = 'SET_SCREEN';

/* --------------   ACTION CREATORS   -------------- */

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
      // nextScreen = data.screen; TO-DO Uncomment
      nextScreen = 'scorer';
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
  }, 500); // TO-DO Change to 3000
};

export const handleBackButton = () => (dispatch, getState) => {
  const { screen } = getState().app;

  const destination = HISTORY_CHAIN[screen];

  if (destination === undefined)
    throw Error('Add this screen name to the HISTORY_CHAIN in constants');

  dispatch(setScreen(destination));
};
