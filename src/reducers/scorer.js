import {
  CATEGORIES,
  CATEGORIES_DJINNS,
  CATEGORIES_ITEMS,
  CATEGORIES_MERCH,
  CATEGORIES_OSASIS,
  CATEGORIES_VILLAGES
} from '../constants';

/* ------------------   ACTION TYPES  ------------------ */

const CLEAR_SCORER = 'CLEAR_SCORER';
const SET_ARTISANS_EXPANSION = 'SET_ARTISANS_EXPANSION';
const SET_CONTROLS = 'SET_CONTROLS';
const SET_DJINNS_POINTS = 'SET_DJINNS_POINTS';
const SET_HINT = 'SET_HINT';
const SET_MERCH_POINTS = 'SET_MERCH_POINTS';
const SET_NUM_PLAYERS = 'SET_NUM_PLAYERS';
const SET_OASIS_POINTS = 'SET_OASIS_POINTS';
const SET_PLAYERS_POINTS = 'SET_PLAYERS_POINTS';
const SET_PRECIOUS_ITEMS_POINTS = 'SET_PRECIOUS_ITEMS_POINTS';
const SET_SCREEN = 'SET_SCREEN';
const SET_THIEVES_EXPANSION = 'SET_THIEVES_EXPANSION';
const SET_TOTAL = 'SET_TOTAL';
const SET_VILLAGES_POINTS = 'SET_VILLAGES_POINTS';
const SET_WHIMS_EXPANSION = 'SET_WHIMS_EXPANSION';

/* --------------   ACTION CREATORS   -------------- */

export const clearScorer = payload => dispatch => dispatch({ type: CLEAR_SCORER, payload });
export const setControls = payload => dispatch => dispatch({ type: SET_CONTROLS, payload });
export const setDjinnsPoints = payload => dispatch => dispatch({ type: SET_DJINNS_POINTS, payload });
export const setHint = payload => dispatch => dispatch({ type: SET_HINT, payload });
export const setMerchPoints = payload => dispatch => dispatch({ type: SET_MERCH_POINTS, payload });
export const setOasisPoints = payload => dispatch => dispatch({ type: SET_OASIS_POINTS, payload });
export const setPlayerPoints = payload => dispatch => dispatch({ type: SET_PLAYERS_POINTS, payload });
export const setPreciousItemsPoints = payload => dispatch => dispatch({ type: SET_PRECIOUS_ITEMS_POINTS, payload });
export const setScreen = payload => dispatch => dispatch({ type: SET_SCREEN, payload });
export const setTotal = payload => dispatch => dispatch({ type: SET_TOTAL, payload });
export const setVillagesPoints = payload => dispatch => dispatch({ type: SET_VILLAGES_POINTS, payload });

/* -----------------   REDUCERS   ------------------ */

export const initialState = {
  artisansExpansion: false,
  controls: '',
  djinnsPoints: {},
	hint: '',
  merchPoints: {},
  oasisPoints: {},
  numPlayers: 0,
  playerPoints: {},
  preciousItemsPoints: {},
  screen: 'options',
  thievesExpansion: false,
  total: [],
  villagesPoints: {},
  whimsExpansion: false,
};

export default function reducer(prevState = initialState, action) {

  const newState = Object.assign({}, prevState);

  switch (action.type) {

    case SET_ARTISANS_EXPANSION:
      newState.artisansExpansion = action.payload;
      break;

    case SET_CONTROLS:
      newState.controls = action.payload;
      break;

    case SET_DJINNS_POINTS:
      newState.djinnsPoints = action.payload;
      break;

  	case SET_HINT:
  		newState.hint = action.payload;
  		break;

    case SET_MERCH_POINTS:
      newState.merchPoints = action.payload;
      break;

    case SET_NUM_PLAYERS:
      newState.numPlayers = action.payload;
      break;

    case SET_OASIS_POINTS:
      newState.oasisPoints = action.payload;
      break;

    case SET_PLAYERS_POINTS:
      newState.playerPoints = action.payload;
      break;

    case SET_PRECIOUS_ITEMS_POINTS:
      newState.preciousItemsPoints = action.payload;
      break;

    case SET_SCREEN:
      newState.screen = action.payload;
      break;

    case SET_THIEVES_EXPANSION:
      newState.thievesExpansion = action.payload;
      break;

    case SET_TOTAL:
      newState.total = action.payload;
      break;

    case SET_VILLAGES_POINTS:
      newState.villagesPoints = action.payload;
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

export const calculateScore = () => (dispatch, getState) => {
  const playerPoints = Object.assign({}, getState().scorer.playerPoints);
  const total = [...getState().scorer.total];

  CATEGORIES.forEach(category => {
    // TO-DO Compute Right number of points
    playerPoints[category].forEach((pts, i) => { total[i] += pts; });
    // TO-DO Compute Viziers Bonus
    // TO-DO Compute Artisans Bonus if expansion
  });

  dispatch(setTotal(total));
};

export const calculateMerch = () => (dispatch, getState) => {
  const playerPoints = Object.assign({}, getState().scorer.playerPoints);
  const merchPoints = Object.assign({}, getState().scorer.merchPoints);
  const merchCopy = [...playerPoints.merch];

  const POINTS_PER_SET = [0, 1, 3, 7, 13, 21, 30, 40, 50, 60];

  // Iterate through merchPoins and create array per player
  const merchArrays = {};

  for (let key in merchPoints) {
    if (merchPoints.hasOwnProperty(key)) {
      for (let i = 0; i < merchCopy.length; i++) {
        if (merchArrays[i] === undefined) {
          merchArrays[i] = [];
        }
        merchArrays[i].push(merchPoints[key][i]);
      }
    }
  }

  // Merch Scoring
  for (let key in merchArrays) {
    if (merchArrays.hasOwnProperty(key)) {
      // Reverse sort
      merchArrays[key] = merchArrays[key].sort((a,b) => b > a);

      while (merchArrays[key].length > 0) {
        // Remove zeroes
        merchArrays[key] = merchArrays[key].filter((a) => a > 0);
        // Count length and award points according to POINST_PER_SET
        merchCopy[key] += POINTS_PER_SET[merchArrays[key].length];
        // Decrease one on each element
        merchArrays[key] = merchArrays[key].map((a) => --a);
      }
    }
  }

  playerPoints.merch = merchCopy;

  dispatch(setPlayerPoints(playerPoints));
};

export const newDjinnsPoints = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  const djinnsPoints = {};

  for (let i = 0; i < CATEGORIES_DJINNS.length; i++) {
    djinnsPoints[CATEGORIES_DJINNS[i]] = [...placeholder];
  }

  dispatch(setDjinnsPoints(djinnsPoints));

  //TO-DO: Specific djinn cards (Jaafar, Geb, etc)
};

export const newMerchPoints = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  const merchPoints = {};

  for (let i = 0; i < CATEGORIES_MERCH.length; i++) {
    merchPoints[CATEGORIES_MERCH[i]] = [...placeholder];
  }

  dispatch(setMerchPoints(merchPoints));
};

export const newOasisPoints = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  const oasisPoints = {};

  for (let i = 0; i < CATEGORIES_OSASIS.length; i++) {
    oasisPoints[CATEGORIES_OSASIS[i]] = [...placeholder];
  }

  dispatch(setOasisPoints(oasisPoints));
};

export const newPreciousItemsPoints = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  const preciousItemsPoints = {};

  for (let i = 0; i < CATEGORIES_ITEMS.length; i++) {
    preciousItemsPoints[CATEGORIES_ITEMS[i]] = [...placeholder];
  }

  dispatch(setPreciousItemsPoints(preciousItemsPoints));
};

export const newVillagePoints = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  const villagesPoints = {};

  for (let i = 0; i < CATEGORIES_VILLAGES.length; i++) {
    villagesPoints[CATEGORIES_VILLAGES[i]] = [...placeholder];
  }

  dispatch(setVillagesPoints(villagesPoints));
};

export const setExpansions = (evt) => (dispatch, getState) => {
  const expName = evt.target.value;

  let typeAction;
  let payload;

  if (expName === 'Artisans') {
    typeAction = 'SET_ARTISANS_EXPANSION';
    payload = !getState().scorer.artisansExpansion;
  }
  else if (expName === 'Thieves') {
    typeAction = 'SET_THIEVES_EXPANSION';
    payload = !getState().scorer.thievesExpansion;
  }
  else if (expName === 'Whims') {
    typeAction = 'SET_WHIMS_EXPANSION';
    payload = !getState().scorer.whimsExpansion;
  }

  return dispatch({ type: typeAction, payload});
};

export const setNumPlayers = (evt) => (dispatch) => {
  const payload = +evt.target.value;
  dispatch({ type: SET_NUM_PLAYERS, payload });
  // TO-DO: setNewSession to false in the app reducer ???
  dispatch(setControls('start'));
};

export const setScorer = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  // Add Basic Scorer Categories
  const playerPoints = {};

  for (let i = 0; i < CATEGORIES.length; i++) {
    playerPoints[CATEGORIES[i]] = [...placeholder];
  }

  dispatch(setPlayerPoints(playerPoints));

  // Add Djinns and Thieves Modal Categories
  dispatch(newDjinnsPoints());

  // Add Precious Items Modal Categories
  dispatch(newPreciousItemsPoints());

  // Add Merch Modal Categories
  dispatch(newMerchPoints());

  // Add Oasis Modal
  dispatch(newOasisPoints());

  // Add Villages Modal
  dispatch(newVillagePoints());

  // Add Total
  const total = [...placeholder];
  dispatch(setTotal(total));
};

export const updateMerchPoints = (evt) => (dispatch, getState) => {
  const [category, player] = evt.target.name.split('-');
  const value = evt.target.value;

  const merchPointsCopy = Object.assign({}, getState().scorer.merchPoints);

  if (merchPointsCopy[category] === undefined) console.warn('Category doesnt exist');

  merchPointsCopy[category][+player] = +value;

  dispatch(setMerchPoints(merchPointsCopy));
};

export const updatePlayerPoints = (evt) => (dispatch, getState) => {
  const [category, player] = evt.target.name.split('-');
  const value = evt.target.value;

  const playerPointsCopy = Object.assign({}, getState().scorer.playerPoints);

  if (playerPointsCopy[category] === undefined) console.warn('Category doesnt exist');

  playerPointsCopy[category][+player] = +value;

  dispatch(setPlayerPoints(playerPointsCopy));
};

export const updateScreen = (newScreen) => (dispatch) => {

  if (newScreen === 'merch') {
    dispatch(setControls('clear-ok'));
  }

  dispatch(setScreen(newScreen));
};

export const controller = (evt) => (dispatch, getState) => {
  const EVENT_NAME = evt.target.name;
  const CURRENT_SCREEN = getState().scorer.screen;

  console.log('EVENT_NAME', EVENT_NAME);
  console.log('CURRENT_SCREEN', CURRENT_SCREEN);

  if (EVENT_NAME === 'start') {
    dispatch(setScorer());
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));
  }
  else if (EVENT_NAME === 'score') {
    dispatch(calculateScore());
    dispatch(setScreen('results'));
    dispatch(setControls('done'));
  }
  else if (EVENT_NAME === 'confirm' && CURRENT_SCREEN === 'merch') {
    dispatch(calculateMerch());
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));
  }
  else if (EVENT_NAME === 'clear') {
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));

    if (CURRENT_SCREEN === 'merch') {
      dispatch(newMerchPoints());
    }
  }

};
