import {
  deleteLocalStorage,
  loadLocalStorage,
  saveLocalStorage,
} from '../utils';

/* ------------------   ACTIONS   ------------------ */

const SET_SCREEN = 'SET_SCREEN';

/* --------------   ACTION CREATORS   -------------- */

export const setScreen = payload => dispatch =>
  dispatch({ type: SET_SCREEN, payload });

/* -----------------   REDUCERS   ------------------ */

const initialState = {
  screen: '',
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
      // upload data to states
      // reassign nextScreen
    }
  } else {
    console.log('No data found.');
    saveLocalStorage({ timestamp: Date.now(), bola: 'bola' });
  }

  setTimeout(() => {
    console.log('Switching screens to', nextScreen);
    dispatch(setScreen(nextScreen));
  }, 3000);
};
