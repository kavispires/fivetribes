import {
  CATEGORIES,
  CATEGORIES_DJINNS,
  CATEGORIES_DJINNS_AND_THIEVES,
  CATEGORIES_ITEMS,
  CATEGORIES_MERCH,
  CATEGORIES_OSASIS,
  CATEGORIES_TILES,
  CATEGORIES_VILLAGES
} from '../constants';

/* ------------------   ACTION TYPES  ------------------ */

const CLEAR_SCORER = 'CLEAR_SCORER';
const SET_ARTISANS_EXPANSION = 'SET_ARTISANS_EXPANSION';
const SET_CONTROLS = 'SET_CONTROLS';
const SET_DJINNS = 'SET_DJINNS';
const SET_DJINNS_POINTS = 'SET_DJINNS_POINTS';
const SET_HINT = 'SET_HINT';
const SET_MERCH_POINTS = 'SET_MERCH_POINTS';
const SET_NUM_PLAYERS = 'SET_NUM_PLAYERS';
const SET_OASIS_POINTS = 'SET_OASIS_POINTS';
const SET_PLAYERS_POINTS = 'SET_PLAYERS_POINTS';
const SET_PRECIOUS_ITEMS_POINTS = 'SET_PRECIOUS_ITEMS_POINTS';
const SET_PRECIOUS_ITEMS_QUANTITY = 'SET_PRECIOUS_ITEMS_QUANTITY';
const SET_SCREEN = 'SET_SCREEN';
const SET_THIEVES_EXPANSION = 'SET_THIEVES_EXPANSION';
const SET_TILES_POINTS = 'SET_TILES_POINTS';
const SET_TOTAL = 'SET_TOTAL';
const SET_VILLAGES_POINTS = 'SET_VILLAGES_POINTS';
const SET_WHIMS_EXPANSION = 'SET_WHIMS_EXPANSION';

/* --------------   ACTION CREATORS   -------------- */

export const clearScorer = payload => dispatch => dispatch({ type: CLEAR_SCORER, payload });
export const setControls = payload => dispatch => dispatch({ type: SET_CONTROLS, payload });
export const setDjinns = payload => dispatch => dispatch({ type: SET_DJINNS, payload });
export const setDjinnsPoints = payload => dispatch => dispatch({ type: SET_DJINNS_POINTS, payload });
export const setHint = payload => dispatch => dispatch({ type: SET_HINT, payload });
export const setMerchPoints = payload => dispatch => dispatch({ type: SET_MERCH_POINTS, payload });
export const setOasisPoints = payload => dispatch => dispatch({ type: SET_OASIS_POINTS, payload });
export const setPlayerPoints = payload => dispatch => dispatch({ type: SET_PLAYERS_POINTS, payload });
export const setPreciousItemsPoints = payload => dispatch => dispatch({ type: SET_PRECIOUS_ITEMS_POINTS, payload });
export const setPreciousItemsQuantity = payload => dispatch => dispatch({ type: SET_PRECIOUS_ITEMS_QUANTITY, payload,});
export const setScreen = payload => dispatch => dispatch({ type: SET_SCREEN, payload });
export const setTilesPoints = payload => dispatch => dispatch({ type: SET_TILES_POINTS, payload });
export const setTotal = payload => dispatch => dispatch({ type: SET_TOTAL, payload });
export const setVillagesPoints = payload => dispatch => dispatch({ type: SET_VILLAGES_POINTS, payload });

/* -----------------   REDUCERS   ------------------ */

export const initialState = {
  artisansExpansion: false,
  controls: '',
  djinns: [-1, -1, -1, -1, -1],
  djinnsPoints: {},
	hint: '',
  merchPoints: {},
  oasisPoints: {},
  numPlayers: 0,
  playerPoints: {},
  preciousItemsPoints: {},
  preciousItemsQuantity: [],
  screen: 'options',
  thievesExpansion: false,
  tilesPoints: {},
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

     case SET_DJINNS:
      newState.djinns = action.payload;
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

    case SET_PRECIOUS_ITEMS_QUANTITY:
      newState.preciousItemsQuantity = action.payload;
      break;

    case SET_SCREEN:
      newState.screen = action.payload;
      break;

    case SET_THIEVES_EXPANSION:
      newState.thievesExpansion = action.payload;
      break;

    case SET_TILES_POINTS:
      newState.tilesPoints = action.payload;
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
  // TO-DO Special Djinns points

  dispatch(setTotal(total));
};

export const calculateDjinnsAndThieves = () => (dispatch, getState) => {
  const playerPoints = Object.assign({}, getState().scorer.playerPoints);
  const djinnsPoints = Object.assign({}, getState().scorer.djinnsPoints);

  const newDjinnsTotalArray = new Array(playerPoints.djinnsTotal.length).fill(0);

  for (let key in djinnsPoints) {
    if (djinnsPoints.hasOwnProperty(key)) {
      for (let i = 0; i < djinnsPoints[key].length; i++) {
        newDjinnsTotalArray[i] += djinnsPoints[key][i];
      }
    }
  }

  playerPoints.djinnsTotal = newDjinnsTotalArray;

  dispatch(setPlayerPoints(playerPoints));
};

export const calculateOasisAndVillages = () => (dispatch, getState) => {
  const playerPoints = Object.assign({}, getState().scorer.playerPoints);
  const oasisPoints = Object.assign({}, getState().scorer.oasisPoints);
  const newOasisTotalArray = new Array(playerPoints.oasisTotal.length).fill(0);

  for (let key in oasisPoints) {
    if (oasisPoints.hasOwnProperty(key)) {
      for (let i = 0; i < oasisPoints[key].length; i++) {
        // 6 points per tree next to a great lake
        if (key === 'oasisLake') {
          newOasisTotalArray[i] += oasisPoints[key][i] * 6;
        }
        else {
          newOasisTotalArray[i] += oasisPoints[key][i] * 3;
        }
      }
    }
  }

  playerPoints.oasisTotal = newOasisTotalArray;

  const villagesPoints = Object.assign({}, getState().scorer.villagesPoints);
  const newVillagesTotalArray = new Array(playerPoints.villagesTotal.length).fill(0);

  for (let key in villagesPoints) {
    if (villagesPoints.hasOwnProperty(key)) {
      for (let i = 0; i < villagesPoints[key].length; i++) {
        // 10 points per tree next to a great lake
        if (key === 'villagesLake') {
          newVillagesTotalArray[i] += villagesPoints[key][i] * 10;
        }
        else {
          newVillagesTotalArray[i] += villagesPoints[key][i] * 5;
        }
      }
    }
  }

  playerPoints.villagesTotal = newVillagesTotalArray;

  dispatch(setPlayerPoints(playerPoints));
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
      merchArrays[key] = merchArrays[key].sort((a, b) => b > a);

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
  const itemsQuantity = new Array(playerPoints.preciousItems.length).fill(0);

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
        itemsQuantity[i] += preciousItemsPoints[key][i];
      }
    }
  }

  playerPoints.preciousItems = newPreciousItemsArray;

  dispatch(setPlayerPoints(playerPoints));
  dispatch(setPreciousItemsQuantity(itemsQuantity));
};

export const calculateTiles = () => (dispatch, getState) => {
  const playerPoints = Object.assign({}, getState().scorer.playerPoints);
  const tilesPoints = Object.assign({}, getState().scorer.tilesPoints);
  const newTilesTotalArray = new Array(playerPoints.tilesTotal.length).fill(0);

  const fabulousCitiesPoints = [0, 5, 20, 45, 80, 125];

  for (let key in tilesPoints) {
    if (tilesPoints.hasOwnProperty(key)) {
      for (let i = 0; i < tilesPoints[key].length; i++) {
        // if fabulous city, calculate differently
        if (key === 'cities') {
          if (tilesPoints[key][i] > 5) {
            console.warn('For Fabulous Cities input the number of tiles, not the total points');
          }
          newTilesTotalArray[i] += fabulousCitiesPoints[tilesPoints[key][i]];
        }
        else {
          newTilesTotalArray[i] += tilesPoints[key][i];
        }
      }
    }
  }

  playerPoints.tilesTotal = newTilesTotalArray;

  dispatch(setPlayerPoints(playerPoints));
};

export const newDjinnsPoints = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  const djinnsPoints = {};

  for (let i = 0; i < CATEGORIES_DJINNS_AND_THIEVES.length; i++) {
    djinnsPoints[CATEGORIES_DJINNS_AND_THIEVES[i]] = [...placeholder];
  }

  dispatch(setDjinnsPoints(djinnsPoints));

  dispatch(setDjinns([-1, -1, -1, -1, -1]));
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

  dispatch(setPreciousItemsQuantity([...placeholder]));
};

export const newTilesPoints = () => (dispatch, getState) => {
  // Creates an array of zeroes in the size of the number of players
  const numPlayers = getState().scorer.numPlayers;
  const placeholder = new Array(numPlayers).fill(0);

  const tilesPoints = {};

  for (let i = 0; i < CATEGORIES_TILES.length; i++) {
    tilesPoints[CATEGORIES_TILES[i]] = [...placeholder];
  }

  dispatch(setTilesPoints(tilesPoints));
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

  // Add Tiles Modal
  dispatch(newTilesPoints());

  // Add Total
  const total = [...placeholder];
  dispatch(setTotal(total));
};

export const updateCell = (evt) => (dispatch, getState) => {
  const [screen, category, player] = evt.target.name.split('-');
  const value = evt.target.value;

  let pointsObject;
  if (screen === 'scorer') {
    pointsObject = Object.assign({}, getState().scorer.playerPoints);
  } else if (screen === 'merch') {
    pointsObject = Object.assign({}, getState().scorer.merchPoints);
  } else if (screen === 'preciousItems') {
    pointsObject = Object.assign({}, getState().scorer.preciousItemsPoints);
  } else if (screen === 'djinnsTotal') {
    pointsObject = Object.assign({}, getState().scorer.djinnsPoints);
  } else if (screen === 'oasisTotal') {
    pointsObject = Object.assign({}, getState().scorer.oasisPoints);
  } else if (screen === 'tilesTotal') {
    pointsObject = Object.assign({}, getState().scorer.tilesPoints);
  } else if (screen === 'villagesTotal') {
    pointsObject = Object.assign({}, getState().scorer.villagesPoints);
  }

  if (pointsObject[category] === undefined) console.warn('Category does not exist');

  // Add points
  pointsObject[category][+player] = +value;

  // Dispatch
  if (screen === 'scorer') {
    dispatch(setPlayerPoints(pointsObject));
  } else if (screen === 'merch') {
    dispatch(setMerchPoints(pointsObject));
  } else if (screen === 'preciousItems') {
    dispatch(setPreciousItemsPoints(pointsObject));
  } else if (screen === 'djinnsTotal') {
    dispatch(setDjinnsPoints(pointsObject));
  } else if (screen === 'oasisTotal') {
    dispatch(setOasisPoints(pointsObject));
  } else if (screen === 'tilesTotal') {
    dispatch(setTilesPoints(pointsObject));
  } else if (screen === 'villagesTotal') {
    dispatch(setVillagesPoints(pointsObject));
  }
};

export const updateRadioDjinn = (evt) => (dispatch, getState) => {
  const djinn = evt.target.name.split('-')[1];
  const playerId = evt.target.id.split('-')[1];

  const index = CATEGORIES_DJINNS.indexOf(djinn);

  if (index < 0) return;

  const djinnsArray = [...getState().scorer.djinns];

  djinnsArray[index] = +playerId;

  dispatch(setDjinns(djinnsArray));
};

export const updateScreen = (newScreen) => (dispatch) => {
  if (['merch', 'djinnsTotal', 'oasis', 'preciousItems', 'villages', 'oasisTotal', 'villagesTotal', 'tilesTotal'].indexOf(newScreen) !== -1) {
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
  else if (EVENT_NAME === 'confirm' && CURRENT_SCREEN === 'djinnsTotal') {
    dispatch(calculateDjinnsAndThieves());
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));
  }
  else if (EVENT_NAME === 'confirm' && (CURRENT_SCREEN === 'oasisTotal' || CURRENT_SCREEN === 'villagesTotal')) {
    dispatch(calculateOasisAndVillages());
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));
  }
  else if (EVENT_NAME === 'confirm' && CURRENT_SCREEN === 'tilesTotal') {
    dispatch(calculateTiles());
    dispatch(setScreen('scorer'));
    dispatch(setControls('back-clear-score'));
  }
  else if (EVENT_NAME === 'clear') {
    // Hack: Switches to score than back to the previous one
    dispatch(setScreen('scorer'));

    if (CURRENT_SCREEN === 'merch') {
      dispatch(newMerchPoints());
    }

    if (CURRENT_SCREEN === 'preciousItems') {
      dispatch(newPreciousItemsPoints());
    }

    if (CURRENT_SCREEN === 'djinnsTotal') {
      dispatch(newDjinnsPoints());
    }

    if (CURRENT_SCREEN === 'oasisTotal' || CURRENT_SCREEN === 'villagesTotal') {
      dispatch(newVillagePoints());
      dispatch(newOasisPoints());
    }

    if (CURRENT_SCREEN === 'tilesTotal') {
      dispatch(newTilesPoints());
    }

    dispatch(setScreen(CURRENT_SCREEN));
  }
  else if (EVENT_NAME === 'clear-all' && CURRENT_SCREEN === 'scorer') {
    dispatch(setScorer());
  }
};
