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
const SET_VIEWPORT = 'SET_VIEWPORT';

/* --------------   ACTION CREATORS   -------------- */

export const setScreen = payload => dispatch =>
  dispatch({ type: SET_SCREEN, payload });
export const setViewPort = payload => dispatch =>
  dispatch({ type: SET_VIEWPORT, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  screen: '',
  viewport: {
    width: '100vw',
    height: '100vh',
  },
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_SCREEN:
      newState.screen = action.payload;
      break;

    case SET_VIEWPORT:
      newState.viewport = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const initialize = () => dispatch => {
  console.warn('Initializing...');
  // Load localstorage
  const data = loadLocalStorage();

  let nextScreen = 'home';

  // If it has date, load it to app
  if (data) {
    const age = Date.now() - data.timestamp;

    // If timestamp is older than 90 minutes, delete localstorage
    if (age > 5400000) {
      console.log('Data has expired.');
      deleteLocalStorage();
    } else {
      console.log('Data retrieved');
      // Assign current Screen
      nextScreen = data.screen;
      nextScreen = 'scorer';
      // Handle setup
      dispatch(setColors(data.colors));
      dispatch(setExpasions(data.expansions));
      dispatch(setNumPlayers(data.numPlayers));
      dispatch(setIsSetupReady(true));
    }
  }

  setTimeout(() => {
    dispatch(setScreen(nextScreen));
  }, 3000);
};

export const handleBackButton = () => (dispatch, getState) => {
  const { screen } = getState().app;

  const destination = HISTORY_CHAIN[screen];

  if (destination === undefined)
    throw Error('Add this screen name to the HISTORY_CHAIN in constants');

  dispatch(setScreen(destination));
};

export const overrideViewPort = obj => dispatch => {
  console.log(obj);
  console.log(obj.clientWidth, obj.clientHeight);
  dispatch(
    setViewPort({
      width: `${obj.clientWidth}px`,
      height: `${obj.clientHeight}px`,
    })
  );
};
