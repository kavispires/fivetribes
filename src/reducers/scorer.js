import {
  CATEGORIES,
  CATEGORIES_DJINNS,
  CATEGORIES_ITEMS,
  CATEGORIES_MERCH,
  CATEGORIES_OSASIS,
  CATEGORIES_VILLAGES
} from '../constants';

/* ------------------   ACTIONS   ------------------ */

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

const initialState = {
  artisansExpansion: false,
  controls: [],
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
    playerPoints[category].forEach((pts, i) => { total[i] += pts; });
    // TO-DO Compute Viziers Bonus
    // TO-DO Compute Artisans Bonus if expansion
  });

  dispatch(setTotal(total));
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
  const controlsArray = [{
    label: 'Start',
    action: 'GO_TO_SCORER'
  }];

  dispatch(setControls(controlsArray));
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

  const djinnsPoints = {};

  for (let i = 0; i < CATEGORIES_DJINNS.length; i++) {
    djinnsPoints[CATEGORIES_DJINNS[i]] = [...placeholder];
  }

  dispatch(setDjinnsPoints(djinnsPoints));

  // Add Precious Items Modal Categories

  const preciousItemsPoints = {};

  for (let i = 0; i < CATEGORIES_ITEMS.length; i++) {
    preciousItemsPoints[CATEGORIES_ITEMS[i]] = [...placeholder];
  }

  dispatch(setPreciousItemsPoints(preciousItemsPoints));

  // Add Merch Modal Categories

  const merchPoints = {};

  for (let i = 0; i < CATEGORIES_MERCH.length; i++) {
    merchPoints[CATEGORIES_MERCH[i]] = [...placeholder];
  }

  dispatch(setMerchPoints(merchPoints));

  // Add Oasis Modal

  const oasisPoints = {};

  for (let i = 0; i < CATEGORIES_OSASIS.length; i++) {
    oasisPoints[CATEGORIES_OSASIS[i]] = [...placeholder];
  }

  dispatch(setOasisPoints(oasisPoints));

  // Add Villages Modal

  const villagesPoints = {};

  for (let i = 0; i < CATEGORIES_VILLAGES.length; i++) {
    villagesPoints[CATEGORIES_VILLAGES[i]] = [...placeholder];
  }

  dispatch(setVillagesPoints(villagesPoints));

  // Add Total

  const total = [...placeholder];

  dispatch(setTotal(total));
};

export const updatePlayerPoints = (evt) => (dispatch, getState) => {
  const [category, player] = evt.target.name.split('-');
  const value = evt.target.value;

  const playerPointsCopy = Object.assign({}, getState().scorer.playerPoints);

  if (playerPointsCopy[category] === undefined) console.warn('Category doesnt exist');

  playerPointsCopy[category][+player] = +value;

  dispatch(setPlayerPoints(playerPointsCopy));
};

export const controller = (evt) => (dispatch, getState) => {
  const EVENT_NAME = evt.target.name;

  switch (EVENT_NAME) {
    case 'GO_TO_SCORER':
      dispatch(setScreen('Scorer'));
      dispatch(setScorer());
      dispatch(setControls([
        {
          label: 'Score',
          action: 'GO_TO_RESULTS'
        },
        {
          label: 'Clear',
          action: 'CLEAR_SCORER'
        },
        {
          label: 'Back',
          action: 'GO_TO_HOME'
        }
      ]));
      break;

    case 'GO_TO_RESULTS':
      dispatch(calculateScore());
      // dispatch(setScreen('Results'));
      break;

    case 'CLEAR_SCORER':
      dispatch(setScorer());
      break;

    case 'GO_TO_HOME':
      console.log('You clicked on GO_TO_HOME');
      break;

    default:
      return console.warn(`No Function Assigned to Action ${EVENT_NAME}`);

  }



  // dispatch(setHint('EventClicked'));
};
