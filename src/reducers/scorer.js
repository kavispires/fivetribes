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
  const total = new Array(getState().scorer.total.length).fill(0);
  // const artisansExpansion = getState().scorer.artisansExpansion;
  const whimsExpansion = getState().scorer.whimsExpansion;

  CATEGORIES.forEach(category => {
    playerPoints[category].forEach((pts, i) => {
      // 2 points per artisan and elder
      if (category === 'artisans' || category === 'elders') {
        total[i] += pts * 2;
      }
      // if not using whims expansion, 3 points per oasis
      else if (!whimsExpansion && category === 'oasisTotal') {
        total[i] += pts * 3;
      }
      // if not using whims expansion, 5 points per village
      else if (!whimsExpansion && category === 'villagesTotal') {
        total[i] += pts * 5;
      }
      else {
        total[i] += pts;
      }
    });
  });

  // TO-DO Compute Viziers Bonus
  // TO-DO Compute Artisans Bonus if expansion

  dispatch(setTotal(total));
};

export const calculateMerch = () => (dispatch, getState) => {
  const playerPoints = Object.assign({}, getState().scorer.playerPoints);
  const merchPoints = Object.assign({}, getState().scorer.merchPoints);

  const newMerchArray = new Array(playerPoints.merch.length).fill(0);

  const POINTS_PER_SET = [0, 1, 3, 7, 13, 21, 30, 40, 50, 60];

  // Iterate through merchPoints and create array per player
  const merchArrays = {};

  for (let key in merchPoints) {
    if (merchPoints.hasOwnProperty(key)) {
      for (let i = 0; i < newMerchArray.length; i++) {
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
        newMerchArray[key] += POINTS_PER_SET[merchArrays[key].length];
        // Decrease one on each element
        merchArrays[key] = merchArrays[key].map((a) => --a);
      }
    }
  }

  playerPoints.merch = newMerchArray;

  dispatch(setPlayerPoints(playerPoints));
};

export const calculatePreciousItems = () => (dispatch, getState) => {
  const playerPoints = Object.assign({}, getState().scorer.playerPoints);
  const preciousItemsPoints = Object.assign({}, getState().scorer.preciousItemsPoints);

  const newPreciousItemsArray = new Array(playerPoints.preciousItems.length).fill(0);

  for (let key in preciousItemsPoints) {
    if (preciousItemsPoints.hasOwnProperty(key)) {
      for (let i = 0; i < preciousItemsPoints[key].length; i++) {
        if (key === 'jewelry') {
          newPreciousItemsArray[i] += preciousItemsPoints[key][i] * 5;
        }
        else if (key === 'treasure') {
          newPreciousItemsArray[i] += preciousItemsPoints[key][i] * 7;
        }
        else if (key === 'crown') {
          newPreciousItemsArray[i] += preciousItemsPoints[key][i] * 9;
        }
      }
    }
  }

  playerPoints.preciousItems = newPreciousItemsArray;

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

export const updateCell = (evt) => (dispatch, getState) => {
  const [screen, category, player] = evt.target.name.split('-');
  const value = evt.target.value;

  console.log('SCREEN: ', screen);

  let pointsObject;
  if (screen === 'scorer') {
    pointsObject = Object.assign({}, getState().scorer.playerPoints);
  } else if (screen === 'merch') {
    pointsObject = Object.assign({}, getState().scorer.merchPoints);
  } else if (screen === 'preciousItems') {
    pointsObject = Object.assign({}, getState().scorer.preciousItemsPoints);
  }

  if (pointsObject[category] === undefined) console.warn('Category doesnt exist');

  // Add points
  pointsObject[category][+player] = +value;

  // Dispatch
  if (screen === 'scorer') {
    dispatch(setPlayerPoints(pointsObject));
  } else if (screen === 'merch') {
    dispatch(setMerchPoints(pointsObject));
  } else if (screen === 'preciousItems') {
    dispatch(setPreciousItemsPoints(pointsObject));
  }
};

export const updateScreen = (newScreen) => (dispatch) => {

  if (['merch', 'djinns', 'oasis', 'preciousItems', 'villages'].indexOf(newScreen) !== -1) {
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
    // dispatch(setScreen('results'));
    // dispatch(setControls('done'));
  }
  else if (EVENT_NAME === 'confirm' && CURRENT_SCREEN === 'merch') {
    dispatch(calculateMerch());
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));
  }
  else if (EVENT_NAME === 'confirm' && CURRENT_SCREEN === 'preciousItems') {
    dispatch(calculatePreciousItems());
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));
  }
  else if (EVENT_NAME === 'clear') {
    dispatch(setScreen('scorer'));

    if (CURRENT_SCREEN === 'merch') {
      dispatch(newMerchPoints());
      dispatch(setScreen('merch'));
    }

    if (CURRENT_SCREEN === 'preciousItems') {
      dispatch(newPreciousItemsPoints());
      dispatch(setScreen('preciousItems'));
    }
  }

};
