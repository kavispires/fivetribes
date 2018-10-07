import { COLORS } from '../constants';
import { saveLocalStorage, buildCategories, buildTiles } from '../utils';

/* ------------------   ACTION TYPES  ------------------ */

const SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER';
const SET_ACTIVE_TILE_SUBSCREEN = 'SET_ACTIVE_TILE_SUBSCREEN';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_COLORS = 'SET_COLORS';
const SET_EXPANSIONS = 'SET_EXPANSIONS';
const SET_HINT = 'SET_HINT';
const SET_IS_SETUP_READY = 'SET_IS_SETUP_READY';
const SET_NUM_PLAYERS = 'SET_NUM_PLAYERS';
const SET_SCORES = 'SET_SCORES';
const SET_SUBSCREEN = 'SET_SUBSCREEN';
const SET_TILES = 'SET_TILES';
const SET_VIOLATION = 'SET_VIOLATION';

/* --------------   ACTION CREATORS   -------------- */

export const setActivePlayer = payload => dispatch =>
  dispatch({ type: SET_ACTIVE_PLAYER, payload });
export const setActiveTileSubscreen = payload => dispatch =>
  dispatch({ type: SET_ACTIVE_TILE_SUBSCREEN, payload });
export const setCategories = payload => dispatch =>
  dispatch({ type: SET_CATEGORIES, payload });
export const setColors = payload => dispatch =>
  dispatch({ type: SET_COLORS, payload });
export const setExpasions = payload => dispatch =>
  dispatch({ type: SET_EXPANSIONS, payload });
export const setHint = payload => dispatch =>
  dispatch({ type: SET_HINT, payload });
export const setIsSetupReady = payload => dispatch =>
  dispatch({ type: SET_IS_SETUP_READY, payload });
export const setNumPlayers = payload => dispatch =>
  dispatch({ type: SET_NUM_PLAYERS, payload });
export const setScores = payload => dispatch =>
  dispatch({ type: SET_SCORES, payload });
export const setSubscreen = payload => dispatch =>
  dispatch({ type: SET_SUBSCREEN, payload });
export const setTiles = payload => dispatch =>
  dispatch({ type: SET_TILES, payload });
export const setViolation = payload => dispatch =>
  dispatch({ type: SET_VIOLATION, payload });

/* -----------------   REDUCER   ------------------ */

export const initialState = {
  activePlayer: '',
  activeTileSubscreen: 'scorer-tiles',
  categories: {},
  colors: [],
  expansions: {
    ARTISANS: false,
    THIEVES: false,
    WHIMS: false,
  },
  hint: '',
  isSetupReady: false,
  numPlayers: 0,
  scores: {
    coins: [],
    viziers: [],
    elders: [],
    djinns: [],
    tiles: [],
    oasis: [],
    villages: [],
    merch: [],
    total: [],
  },
  subscreen: '',
  tiles: [],
  violation: '',
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_ACTIVE_PLAYER:
      newState.activePlayer = action.payload;
      break;

    case SET_ACTIVE_TILE_SUBSCREEN:
      newState.activeTileSubscreen = action.payload;
      break;

    case SET_CATEGORIES:
      newState.categories = action.payload;
      break;

    case SET_COLORS:
      newState.colors = action.payload;
      break;

    case SET_EXPANSIONS:
      newState.expansions = action.payload;
      break;

    case SET_HINT:
      newState.hint = action.payload;
      break;

    case SET_IS_SETUP_READY:
      newState.isSetupReady = action.payload;
      break;

    case SET_NUM_PLAYERS:
      newState.numPlayers = action.payload;
      break;

    case SET_SCORES:
      newState.scores = action.payload;
      break;

    case SET_SUBSCREEN:
      newState.subscreen = action.payload;
      break;

    case SET_TILES:
      newState.tiles = action.payload;
      break;

    case SET_VIOLATION:
      newState.violation = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}

/* ---------------   DISPATCHERS   ----------------- */

export const handleColors = color => (dispatch, getState) => {
  const colors = [...getState().scorer.colors];

  const index = colors.indexOf(color);
  if (index !== -1) {
    colors.splice(index, 1);
  } else {
    colors.push(color);
  }

  // Ensure order
  const orderedColors = [];

  for (let i = 0; i < COLORS.length; i++) {
    const ENUM = COLORS[i];
    if (colors.includes(ENUM)) {
      orderedColors.push(ENUM);
    }
  }

  dispatch(setColors(orderedColors));
  dispatch(verifySetup());
};

export const handleExpansions = expansion => (dispatch, getState) => {
  const expansions = Object.assign({}, getState().scorer.expansions);

  expansions[expansion] = !expansions[expansion];

  dispatch(setExpasions(expansions));
};

export const handleNumPlayers = number => (dispatch, getState) => {
  const { numPlayers } = getState().scorer;

  if (typeof number === 'number' && number !== numPlayers) {
    dispatch(setNumPlayers(number));
    dispatch(verifySetup());
  }
};

export const verifySetup = () => (dispatch, getState) => {
  const { colors, numPlayers } = getState().scorer;

  let message = '';
  let isValid = true;

  if (numPlayers === 0) {
    message = 'You must select the number of players';
    isValid = false;
  } else if (colors.length !== numPlayers) {
    message =
      'You must select the same number of colors as the number of players';
    isValid = false;
  }

  dispatch(setViolation(message));
  dispatch(setIsSetupReady(isValid));
};

export const saveData = () => (dispatch, getState) => {
  const state = getState();
  saveLocalStorage(state);
};

export const prepareScorer = () => (dispatch, getState) => {
  console.warn('Scorer is being prepared...');
  const { expansions, numPlayers } = getState().scorer;
  // Build categories
  const categories = buildCategories(expansions);
  dispatch(setCategories(categories));

  // Build Scores state

  const arrayPlaceholder = new Array(numPlayers).fill(0);

  const scores = {};

  Object.keys(categories).forEach(category =>
    categories[category].forEach(subCategory => {
      scores[subCategory.name] = [...arrayPlaceholder];
    })
  );

  dispatch(setScores(scores));

  // Build Tiles Select Object
  const tiles = buildTiles(expansions);

  dispatch(setTiles(tiles));
};

export const updateButtonCell = subscreen => dispatch => {
  dispatch(setSubscreen(subscreen));

  if (subscreen === 'scorer-tiles' || subscreen === 'scorer-tiles-select') {
    dispatch(setActiveTileSubscreen(subscreen));
  }
};

export const updateNumberCell = (category, index, value) => (
  dispatch,
  getState
) => {
  const scores = { ...getState().scorer.scores };
  scores[category][index] = +value;

  dispatch(setScores(scores));
};

export const updateRadioCell = (category, index) => (dispatch, getState) => {
  const scores = { ...getState().scorer.scores };
  const { numPlayers } = getState().scorer;

  const wasChecked = scores[category][index];
  scores[category] = new Array(numPlayers).fill(false);
  if (!wasChecked) {
    scores[category][index] = true;
  }

  dispatch(setScores(scores));
};

export const toggleHint = (hint = '') => dispatch => {
  dispatch(setHint(hint));
};

export const handleActivePlayer = color => (dispatch, getState) => {
  const { activePlayer } = getState().scorer;
  if (activePlayer !== color) {
    dispatch(setActivePlayer(color));
  }
};

export const handleSelectedTile = (tileId, activePlayer) => (
  dispatch,
  getState
) => {
  const tiles = { ...getState().scorer.tiles };

  let operation = '+';
  if (tiles[tileId].owner === activePlayer) {
    tiles[tileId].owner = null;
    operation = '-';
  } else {
    tiles[tileId].owner = activePlayer;
  }

  dispatch(setTiles(tiles));

  // Sum the results
  const scores = { ...getState().scorer.scores };
  const { colors } = getState().scorer;
  const playerIndex = colors.indexOf(activePlayer);

  const { value } = tiles[tileId];
  if (operation === '+') {
    if (typeof value === 'number') {
      scores['tiles-total'][playerIndex] += value;
    } else {
      scores.cities[playerIndex] += 1;
    }
  } else if (typeof value === 'number') {
    scores['tiles-total'][playerIndex] -= value;
  } else {
    scores.cities[playerIndex] -= 1;
  }

  dispatch(setScores(scores));
};

export const clearCategory = category => (dispatch, getState) => {
  if (category === 'all') {
    dispatch(prepareScorer());
  } else {
    const { numPlayers, categories } = getState().scorer;
    const arrayPlaceholder = new Array(numPlayers).fill(0);
    const scores = { ...getState().scorer.scores };
    categories[category].forEach(cat => {
      scores[cat.name] = [...arrayPlaceholder];
    });
    dispatch(setScores(scores));
    if (category === 'tiles') {
      const tiles = buildTiles(getState().scorer.expansions);
      dispatch(setTiles(tiles));
    }
  }
};

export const handleOk = category => (dispatch, getState) => {
  let scores = { ...getState().scorer.scores };
  const { expansions, categories } = getState().scorer;

  // Calculate Total
  if (category === 'scorer') {
    scores = calculateBonusPoints(scores, expansions);
    dispatch(calculateTotalPoints(scores, expansions, categories));
  }
  // Calculate Djinns Points
  else if (category === 'djinns') {
    scores.djinns = calculateDjinnsPoints(scores, expansions);
  }
  // Calculate Merch Points
  else if (category === 'merch') {
    scores.merch = calculateMerchPoints(scores);
  }
  // Calculate Oasis Points
  else if (category === 'oasis') {
    scores.oasis = calculateOasis(scores, expansions);
  }
  // Calculate Villages Points
  else if (category === 'villages') {
    scores.villages = calculateVillages(scores, expansions);
  }
  // Calculate Precious Items Points
  else if (category === 'items') {
    scores.items = calculateItems(scores);
  }
  // Calculate Tiles Points
  else if (category === 'tiles') {
    scores.tiles = calculateTiles(scores, expansions);
  }

  dispatch(setScores(scores));
  dispatch(setSubscreen(''));
};

const calculateBonusPoints = (scores, expansions) => {
  // Reset everything
  const placeholder = new Array(scores.coins.length).fill(0);
  scores['bonus-viziers'] = [...placeholder];
  scores['bonus-elders'] = [...placeholder];
  scores['bonus-oasis'] = [...placeholder];

  console.log(scores);
  // Award Viziers: 10 pts per player with less viziers
  scores.viziers.forEach((player, index) => {
    scores.viziers.forEach(opponent => {
      if (player > opponent) {
        scores['bonus-viziers'][index] += 10;
      }
    });
  });

  // Award Jaafar: 1pt per vizier
  const jaafarIndex = scores['djinn-jaafar'].indexOf(true);
  if (jaafarIndex > -1) {
    scores['bonus-viziers'][jaafarIndex] += scores.viziers[jaafarIndex];
  }

  // Award Shamhat: 2pt per elder
  const shamhatIndex = scores['djinn-shamhat'].indexOf(true);
  if (shamhatIndex > -1) {
    scores['bonus-elders'][shamhatIndex] += scores.artisans[shamhatIndex] * 2;
  }

  // Award Haurvatat: 2pt per palm tree
  const haurvatatIndex = scores['djinn-haurvatat'].indexOf(true);
  if (haurvatatIndex > -1) {
    scores['bonus-oasis'][haurvatatIndex] +=
      scores.artisans[haurvatatIndex] * 2;
  }

  if (expansions.ARTISANS) {
    // Reset expansion
    scores['bonus-artisans'] = [...placeholder];
    scores['bonus-items'] = [...placeholder];

    // Award Artisans: 1pt pts if most artisans
    const maxArtisans = Math.max(...scores.artisans);
    scores.artisans.forEach((player, index) => {
      if (player === maxArtisans) {
        scores['bonus-artisans'][index] += scores.artisans[index];
      }
    });

    // Award Ptah: 2pt per artisan
    const ptahIndex = scores['djinn-ptah'].indexOf(true);
    if (ptahIndex > -1) {
      scores['bonus-artisans'][ptahIndex] += scores.artisans[ptahIndex] * 2;
    }

    // Award Geb: 3pt per item
    const gebIndex = scores['djinn-geb'].indexOf(true);
    if (gebIndex > -1) {
      scores['bonus-items'][gebIndex] += scores['item-crown'][gebIndex] * 3;
      scores['bonus-items'][gebIndex] += scores['item-treasure'][gebIndex] * 3;
      scores['bonus-items'][gebIndex] += scores['item-jewelry'][gebIndex] * 3;
    }
  }

  return scores;
};

let totalInterval = null;
let count = 0;
let totalCategories = [];

const calculateTotalPoints = (scores, expansions, categories) => dispatch => {
  if (totalCategories.length === 0) {
    totalCategories = [...categories.main, ...categories.bonus];
  }
  totalInterval = setInterval(() => {
    scores.total = scores.total.map(
      (prev, index) => prev + scores[totalCategories[count].name][index]
    );
    dispatch(setScores(scores));
    count++;
    if (count >= totalCategories.length) {
      clearInterval(totalInterval);
      count = 0;
    }
  }, 1000);
  return scores;
};

const calculateDjinnsPoints = (scores, expansions) => {
  let points = [...scores['djinns-total']];
  if (expansions.WHIMS) {
    points = points.map((item, index) => item + scores.thieves[index]);
  }
  return points;
};

const calculateMerchPoints = scores => {
  const points = new Array(scores.merch.length).fill(0);

  const pointRef = {
    0: 0,
    1: 1,
    2: 3,
    3: 7,
    4: 13,
    5: 21,
    6: 30,
    7: 40,
    8: 50,
    9: 60,
  };

  for (let i = 1; i <= 6; i++) {
    const currentCategory = `merch-set-${i}`;
    scores[currentCategory].forEach((value, index) => {
      if (pointRef[value] !== undefined) {
        points[index] += pointRef[value];
      } else {
        throw Error('Merchandising sets allow a maxium of 9 cards per set');
      }
    });
  }
  return points;
};

const calculateOasis = (scores, expansions) => {
  const points = new Array(scores.oasis.length).fill(0);

  const POINST_PER_TREE = 3;

  if (expansions.WHIMS) {
    points.forEach((v, index) => {
      points[index] += scores['oasis-total'][index] * POINST_PER_TREE;
      points[index] += scores['oasis-lake-total'][index] * POINST_PER_TREE;
    });
  }

  return points;
};

const calculateVillages = (scores, expansions) => {
  const points = new Array(scores.villages.length).fill(0);

  const POINST_PER_PALACE = 5;

  if (expansions.WHIMS) {
    points.forEach((v, index) => {
      points[index] += scores['villages-total'][index] * POINST_PER_PALACE;
      points[index] += scores['villages-lake-total'][index] * POINST_PER_PALACE;
    });
  }

  return points;
};

const calculateItems = scores => {
  const points = new Array(scores.items.length).fill(0);

  const POINST_PER_CROWN = 9;
  const POINST_PER_JEWELRY = 5;
  const POINST_PER_TREASURE = 7;

  points.forEach((v, index) => {
    points[index] += scores['item-crown'][index] * POINST_PER_CROWN;
    points[index] += scores['item-jewelry'][index] * POINST_PER_JEWELRY;
    points[index] += scores['item-treasure'][index] * POINST_PER_TREASURE;
  });

  return points;
};

const calculateTiles = (scores, expansions) => {
  const points = new Array(scores.items.length).fill(0);

  const CITIES_POINTS = {
    0: 0,
    1: 5,
    2: 20,
    3: 45,
    4: 80,
    5: 125,
  };

  points.forEach((v, index) => {
    points[index] += scores['tiles-total'][index];
    if (expansions.WHIMS) {
      points[index] += CITIES_POINTS[scores.cities[index]];
    }
  });

  return points;
};

// OLD_STUFF

// import {
//   CATEGORIES,
//   CATEGORIES_DJINNS,
//   CATEGORIES_DJINNS_AND_THIEVES,
//   CATEGORIES_ITEMS,
//   CATEGORIES_MERCH,
//   CATEGORIES_OSASIS,
//   CATEGORIES_TILES,
//   CATEGORIES_VILLAGES
// } from "../constants";

// /* ------------------   ACTION TYPES  ------------------ */

// const CLEAR_SCORER = "CLEAR_SCORER";
// const SET_ARTISANS_EXPANSION = "SET_ARTISANS_EXPANSION";
// const SET_CONTROLS = "SET_CONTROLS";
// const SET_DJINNS = "SET_DJINNS";
// const SET_DJINNS_POINTS = "SET_DJINNS_POINTS";
// const SET_HINT = "SET_HINT";
// const SET_MERCH_POINTS = "SET_MERCH_POINTS";
// const SET_NUM_PLAYERS = "SET_NUM_PLAYERS";
// const SET_OASIS_POINTS = "SET_OASIS_POINTS";
// const SET_PLAYERS_POINTS = "SET_PLAYERS_POINTS";
// const SET_PRECIOUS_ITEMS_POINTS = "SET_PRECIOUS_ITEMS_POINTS";
// const SET_PRECIOUS_ITEMS_QUANTITY = "SET_PRECIOUS_ITEMS_QUANTITY";
// const SET_SCREEN = "SET_SCREEN";
// const SET_THIEVES_EXPANSION = "SET_THIEVES_EXPANSION";
// const SET_TILES_POINTS = "SET_TILES_POINTS";
// const SET_TOTAL = "SET_TOTAL";
// const SET_VILLAGES_POINTS = "SET_VILLAGES_POINTS";
// const SET_WHIMS_EXPANSION = "SET_WHIMS_EXPANSION";

// /* --------------   ACTION CREATORS   -------------- */

// export const clearScorer = payload => dispatch =>
//   dispatch({ type: CLEAR_SCORER, payload });
// export const setControls = payload => dispatch =>
//   dispatch({ type: SET_CONTROLS, payload });
// export const setDjinns = payload => dispatch =>
//   dispatch({ type: SET_DJINNS, payload });
// export const setDjinnsPoints = payload => dispatch =>
//   dispatch({ type: SET_DJINNS_POINTS, payload });
// export const setHint = payload => dispatch =>
//   dispatch({ type: SET_HINT, payload });
// export const setMerchPoints = payload => dispatch =>
//   dispatch({ type: SET_MERCH_POINTS, payload });
// export const setOasisPoints = payload => dispatch =>
//   dispatch({ type: SET_OASIS_POINTS, payload });
// export const setPlayerPoints = payload => dispatch =>
//   dispatch({ type: SET_PLAYERS_POINTS, payload });
// export const setPreciousItemsPoints = payload => dispatch =>
//   dispatch({ type: SET_PRECIOUS_ITEMS_POINTS, payload });
// export const setPreciousItemsQuantity = payload => dispatch =>
//   dispatch({ type: SET_PRECIOUS_ITEMS_QUANTITY, payload });
// export const setScreen = payload => dispatch =>
//   dispatch({ type: SET_SCREEN, payload });
// export const setTilesPoints = payload => dispatch =>
//   dispatch({ type: SET_TILES_POINTS, payload });
// export const setTotal = payload => dispatch =>
//   dispatch({ type: SET_TOTAL, payload });
// export const setVillagesPoints = payload => dispatch =>
//   dispatch({ type: SET_VILLAGES_POINTS, payload });

// /* -----------------   REDUCERS   ------------------ */

// export const initialState = {
//   artisansExpansion: false,
//   controls: "",
//   djinns: [-1, -1, -1, -1, -1],
//   djinnsPoints: {},
//   hint: "",
//   merchPoints: {},
//   oasisPoints: {},
//   numPlayers: 0,
//   playerPoints: {},
//   preciousItemsPoints: {},
//   preciousItemsQuantity: [],
//   screen: "options",
//   thievesExpansion: false,
//   tilesPoints: {},
//   total: [],
//   villagesPoints: {},
//   whimsExpansion: false
// };

// export default function reducer(prevState = initialState, action) {
//   const newState = Object.assign({}, prevState);

//   switch (action.type) {
//     case SET_ARTISANS_EXPANSION:
//       newState.artisansExpansion = action.payload;
//       break;

//     case SET_CONTROLS:
//       newState.controls = action.payload;
//       break;

//     case SET_DJINNS:
//       newState.djinns = action.payload;
//       break;

//     case SET_DJINNS_POINTS:
//       newState.djinnsPoints = action.payload;
//       break;

//     case SET_HINT:
//       newState.hint = action.payload;
//       break;

//     case SET_MERCH_POINTS:
//       newState.merchPoints = action.payload;
//       break;

//     case SET_NUM_PLAYERS:
//       newState.numPlayers = action.payload;
//       break;

//     case SET_OASIS_POINTS:
//       newState.oasisPoints = action.payload;
//       break;

//     case SET_PLAYERS_POINTS:
//       newState.playerPoints = action.payload;
//       break;

//     case SET_PRECIOUS_ITEMS_POINTS:
//       newState.preciousItemsPoints = action.payload;
//       break;

//     case SET_PRECIOUS_ITEMS_QUANTITY:
//       newState.preciousItemsQuantity = action.payload;
//       break;

//     case SET_SCREEN:
//       newState.screen = action.payload;
//       break;

//     case SET_THIEVES_EXPANSION:
//       newState.thievesExpansion = action.payload;
//       break;

//     case SET_TILES_POINTS:
//       newState.tilesPoints = action.payload;
//       break;

//     case SET_TOTAL:
//       newState.total = action.payload;
//       break;

//     case SET_VILLAGES_POINTS:
//       newState.villagesPoints = action.payload;
//       break;

//     case SET_WHIMS_EXPANSION:
//       newState.whimsExpansion = action.payload;
//       break;

//     default:
//       return prevState;
//   }

//   return newState;
// }

// /* ---------------   DISPATCHERS   ----------------- */

// export const calculateScore = () => (dispatch, getState) => {
//   const playerPoints = Object.assign({}, getState().scorer.playerPoints);
//   const djinns = [...getState().scorer.djinns];
//   const whimsExpansion = getState().scorer.whimsExpansion;
//   const oasisPoints = Object.assign({}, getState().scorer.oasisPoints);
//   const total = new Array(getState().scorer.total.length).fill(0);
//   const maxArtisans = Math.max.apply(null, playerPoints.artisans);

//   CATEGORIES.forEach(category => {
//     playerPoints[category].forEach((value, i) => {
//       // 2 points per artisan and elder
//       if (category === "artisans" || category === "elders") {
//         total[i] += value * 2;
//       }
//       // if not using whims expansion, 3 points per oasis
//       else if (!whimsExpansion && category === "oasisTotal") {
//         total[i] += value * 3;

//         // Special Djinn Haurvatat: palm trees are worth 2 extra victory points
//         if (djinns[1] === i) {
//           total[i] += value * 2;
//         }
//       }
//       // if not using whims expansion, 5 points per village
//       else if (!whimsExpansion && category === "villagesTotal") {
//         total[i] += value * 5;
//       } else {
//         if (category === "oasisTotal") console.log("HERE", value);
//         total[i] += value;
//       }

//       // Compute Viziers Bonus: Award +10 points per player you strictly have more viziers than.
//       if (category === "viziers") {
//         playerPoints.viziers.forEach(meeples => {
//           if (value > meeples) {
//             total[i] += 10;
//           }
//         });

//         // Special Djinn: Jaafar - viziers are worth extra 1 point
//         if (djinns[2] === i) {
//           total[i] += value;
//         }
//       }

//       // Special Djinn: Ptah - artisans are worth extra 2 points
//       if (category === "artisans" && djinns[3] === i) {
//         total[i] += value * 2;
//       }

//       // Special Djinn: Shamhat - elders are worth extra 2 points
//       if (category === "elders" && djinns[4] === i) {
//         total[i] += value * 2;
//       }

//       // Special Djinn Haurvatat with Whims Expansion
//       if (category === "oasisTotal" && whimsExpansion && djinns[1] === i) {
//         const oasisQuantity = oasisPoints.oasis[i] + oasisPoints.oasisLake[i];
//         total[i] += oasisQuantity * 2;
//       }
//     });

//     // Compute Artisans Bonus: Award 10 points to the player with strictly more artisans than the others
//     if (category === "artisans") {
//       const hasMax = [];
//       playerPoints.artisans.forEach((meeples, i) => {
//         if (meeples === maxArtisans) {
//           hasMax.push(i);
//         }
//       });
//       if (hasMax.length === 1) {
//         total[hasMax[0]] += maxArtisans;
//       }
//     }
//   });

//   dispatch(setTotal(total));
// };

// export const calculateDjinnsAndThieves = () => (dispatch, getState) => {
//   const playerPoints = Object.assign({}, getState().scorer.playerPoints);
//   const djinnsPoints = Object.assign({}, getState().scorer.djinnsPoints);

//   const newDjinnsTotalArray = new Array(playerPoints.djinnsTotal.length).fill(
//     0
//   );

//   for (let key in djinnsPoints) {
//     if (djinnsPoints.hasOwnProperty(key)) {
//       for (let i = 0; i < djinnsPoints[key].length; i++) {
//         newDjinnsTotalArray[i] += djinnsPoints[key][i];
//       }
//     }
//   }

//   playerPoints.djinnsTotal = newDjinnsTotalArray;

//   dispatch(setPlayerPoints(playerPoints));
// };

// export const calculateOasisAndVillages = () => (dispatch, getState) => {
//   const playerPoints = Object.assign({}, getState().scorer.playerPoints);
//   const oasisPoints = Object.assign({}, getState().scorer.oasisPoints);
//   const newOasisTotalArray = new Array(playerPoints.oasisTotal.length).fill(0);

//   for (let key in oasisPoints) {
//     if (oasisPoints.hasOwnProperty(key)) {
//       for (let i = 0; i < oasisPoints[key].length; i++) {
//         // 6 points per tree next to a great lake
//         if (key === "oasisLake") {
//           newOasisTotalArray[i] += oasisPoints[key][i] * 6;
//         } else {
//           newOasisTotalArray[i] += oasisPoints[key][i] * 3;
//         }
//       }
//     }
//   }

//   playerPoints.oasisTotal = newOasisTotalArray;

//   const villagesPoints = Object.assign({}, getState().scorer.villagesPoints);
//   const newVillagesTotalArray = new Array(
//     playerPoints.villagesTotal.length
//   ).fill(0);

//   for (let key in villagesPoints) {
//     if (villagesPoints.hasOwnProperty(key)) {
//       for (let i = 0; i < villagesPoints[key].length; i++) {
//         // 10 points per tree next to a great lake
//         if (key === "villagesLake") {
//           newVillagesTotalArray[i] += villagesPoints[key][i] * 10;
//         } else {
//           newVillagesTotalArray[i] += villagesPoints[key][i] * 5;
//         }
//       }
//     }
//   }

//   playerPoints.villagesTotal = newVillagesTotalArray;

//   dispatch(setPlayerPoints(playerPoints));
// };

// export const calculateMerch = () => (dispatch, getState) => {
//   const playerPoints = Object.assign({}, getState().scorer.playerPoints);
//   const merchPoints = Object.assign({}, getState().scorer.merchPoints);

//   const newMerchArray = new Array(playerPoints.merch.length).fill(0);

//   const POINTS_PER_SET = [0, 1, 3, 7, 13, 21, 30, 40, 50, 60];

//   // Iterate through merchPoints and create array per player
//   const merchArrays = {};

//   for (let key in merchPoints) {
//     if (merchPoints.hasOwnProperty(key)) {
//       for (let i = 0; i < newMerchArray.length; i++) {
//         if (merchArrays[i] === undefined) {
//           merchArrays[i] = [];
//         }
//         merchArrays[i].push(merchPoints[key][i]);
//       }
//     }
//   }

//   // Merch Scoring
//   for (let key in merchArrays) {
//     if (merchArrays.hasOwnProperty(key)) {
//       // Reverse sort
//       merchArrays[key] = merchArrays[key].sort((a, b) => b > a);

//       while (merchArrays[key].length > 0) {
//         // Remove zeroes
//         merchArrays[key] = merchArrays[key].filter(a => a > 0);
//         // Count length and award points according to POINST_PER_SET
//         newMerchArray[key] += POINTS_PER_SET[merchArrays[key].length];
//         // Decrease one on each element
//         merchArrays[key] = merchArrays[key].map(a => --a);
//       }
//     }
//   }

//   playerPoints.merch = newMerchArray;

//   dispatch(setPlayerPoints(playerPoints));
// };

// export const calculatePreciousItems = () => (dispatch, getState) => {
//   const playerPoints = Object.assign({}, getState().scorer.playerPoints);
//   const preciousItemsPoints = Object.assign(
//     {},
//     getState().scorer.preciousItemsPoints
//   );

//   const newPreciousItemsArray = new Array(
//     playerPoints.preciousItems.length
//   ).fill(0);
//   const itemsQuantity = new Array(playerPoints.preciousItems.length).fill(0);

//   for (let key in preciousItemsPoints) {
//     if (preciousItemsPoints.hasOwnProperty(key)) {
//       for (let i = 0; i < preciousItemsPoints[key].length; i++) {
//         if (key === "jewelry") {
//           newPreciousItemsArray[i] += preciousItemsPoints[key][i] * 5;
//         } else if (key === "treasure") {
//           newPreciousItemsArray[i] += preciousItemsPoints[key][i] * 7;
//         } else if (key === "crown") {
//           newPreciousItemsArray[i] += preciousItemsPoints[key][i] * 9;
//         }
//         itemsQuantity[i] += preciousItemsPoints[key][i];
//       }
//     }
//   }

//   playerPoints.preciousItems = newPreciousItemsArray;

//   dispatch(setPlayerPoints(playerPoints));
//   dispatch(setPreciousItemsQuantity(itemsQuantity));
// };

// export const calculateTiles = () => (dispatch, getState) => {
//   const playerPoints = Object.assign({}, getState().scorer.playerPoints);
//   const tilesPoints = Object.assign({}, getState().scorer.tilesPoints);
//   const newTilesTotalArray = new Array(playerPoints.tilesTotal.length).fill(0);

//   const fabulousCitiesPoints = [0, 5, 20, 45, 80, 125];

//   for (let key in tilesPoints) {
//     if (tilesPoints.hasOwnProperty(key)) {
//       for (let i = 0; i < tilesPoints[key].length; i++) {
//         // if fabulous city, calculate differently
//         if (key === "cities") {
//           if (tilesPoints[key][i] > 5) {
//             console.warn(
//               "For Fabulous Cities input the number of tiles, not the total points"
//             );
//           }
//           newTilesTotalArray[i] += fabulousCitiesPoints[tilesPoints[key][i]];
//         } else {
//           newTilesTotalArray[i] += tilesPoints[key][i];
//         }
//       }
//     }
//   }

//   playerPoints.tilesTotal = newTilesTotalArray;

//   dispatch(setPlayerPoints(playerPoints));
// };

// export const newDjinnsPoints = () => (dispatch, getState) => {
//   // Creates an array of zeroes in the size of the number of players
//   const numPlayers = getState().scorer.numPlayers;
//   const placeholder = new Array(numPlayers).fill(0);

//   const djinnsPoints = {};

//   for (let i = 0; i < CATEGORIES_DJINNS_AND_THIEVES.length; i++) {
//     djinnsPoints[CATEGORIES_DJINNS_AND_THIEVES[i]] = [...placeholder];
//   }

//   dispatch(setDjinnsPoints(djinnsPoints));

//   dispatch(setDjinns([-1, -1, -1, -1, -1]));
// };

// export const newMerchPoints = () => (dispatch, getState) => {
//   // Creates an array of zeroes in the size of the number of players
//   const numPlayers = getState().scorer.numPlayers;
//   const placeholder = new Array(numPlayers).fill(0);

//   const merchPoints = {};

//   for (let i = 0; i < CATEGORIES_MERCH.length; i++) {
//     merchPoints[CATEGORIES_MERCH[i]] = [...placeholder];
//   }

//   dispatch(setMerchPoints(merchPoints));
// };

// export const newOasisPoints = () => (dispatch, getState) => {
//   // Creates an array of zeroes in the size of the number of players
//   const numPlayers = getState().scorer.numPlayers;
//   const placeholder = new Array(numPlayers).fill(0);

//   const oasisPoints = {};

//   for (let i = 0; i < CATEGORIES_OSASIS.length; i++) {
//     oasisPoints[CATEGORIES_OSASIS[i]] = [...placeholder];
//   }

//   dispatch(setOasisPoints(oasisPoints));
// };

// export const newPreciousItemsPoints = () => (dispatch, getState) => {
//   // Creates an array of zeroes in the size of the number of players
//   const numPlayers = getState().scorer.numPlayers;
//   const placeholder = new Array(numPlayers).fill(0);

//   const preciousItemsPoints = {};

//   for (let i = 0; i < CATEGORIES_ITEMS.length; i++) {
//     preciousItemsPoints[CATEGORIES_ITEMS[i]] = [...placeholder];
//   }

//   dispatch(setPreciousItemsPoints(preciousItemsPoints));

//   dispatch(setPreciousItemsQuantity([...placeholder]));
// };

// export const newTilesPoints = () => (dispatch, getState) => {
//   // Creates an array of zeroes in the size of the number of players
//   const numPlayers = getState().scorer.numPlayers;
//   const placeholder = new Array(numPlayers).fill(0);

//   const tilesPoints = {};

//   for (let i = 0; i < CATEGORIES_TILES.length; i++) {
//     tilesPoints[CATEGORIES_TILES[i]] = [...placeholder];
//   }

//   dispatch(setTilesPoints(tilesPoints));
// };

// export const newVillagePoints = () => (dispatch, getState) => {
//   // Creates an array of zeroes in the size of the number of players
//   const numPlayers = getState().scorer.numPlayers;
//   const placeholder = new Array(numPlayers).fill(0);

//   const villagesPoints = {};

//   for (let i = 0; i < CATEGORIES_VILLAGES.length; i++) {
//     villagesPoints[CATEGORIES_VILLAGES[i]] = [...placeholder];
//   }

//   dispatch(setVillagesPoints(villagesPoints));
// };

// export const setExpansions = evt => (dispatch, getState) => {
//   const expName = evt.target.value;

//   let typeAction;
//   let payload;

//   if (expName === "Artisans") {
//     typeAction = "SET_ARTISANS_EXPANSION";
//     payload = !getState().scorer.artisansExpansion;
//   } else if (expName === "Thieves") {
//     typeAction = "SET_THIEVES_EXPANSION";
//     payload = !getState().scorer.thievesExpansion;
//   } else if (expName === "Whims") {
//     typeAction = "SET_WHIMS_EXPANSION";
//     payload = !getState().scorer.whimsExpansion;
//   }

//   return dispatch({ type: typeAction, payload });
// };

// export const setNumPlayers = evt => dispatch => {
//   const payload = +evt.target.value;
//   dispatch({ type: SET_NUM_PLAYERS, payload });
//   // TO-DO: setNewSession to false in the app reducer ???
//   dispatch(setControls("start"));
// };

// export const setScorer = () => (dispatch, getState) => {
//   // Creates an array of zeroes in the size of the number of players
//   const numPlayers = getState().scorer.numPlayers;
//   const placeholder = new Array(numPlayers).fill(0);

//   // Add Basic Scorer Categories
//   const playerPoints = {};

//   for (let i = 0; i < CATEGORIES.length; i++) {
//     playerPoints[CATEGORIES[i]] = [...placeholder];
//   }

//   dispatch(setPlayerPoints(playerPoints));

//   // Add Djinns and Thieves Modal Categories
//   dispatch(newDjinnsPoints());

//   // Add Precious Items Modal Categories
//   dispatch(newPreciousItemsPoints());

//   // Add Merch Modal Categories
//   dispatch(newMerchPoints());

//   // Add Oasis Modal
//   dispatch(newOasisPoints());

//   // Add Villages Modal
//   dispatch(newVillagePoints());

//   // Add Tiles Modal
//   dispatch(newTilesPoints());

//   // Add Total
//   const total = [...placeholder];
//   dispatch(setTotal(total));
// };

// export const updateCell = evt => (dispatch, getState) => {
//   const [screen, category, player] = evt.target.name.split("-");
//   const value = evt.target.value;

//   let pointsObject;
//   if (screen === "scorer") {
//     pointsObject = Object.assign({}, getState().scorer.playerPoints);
//   } else if (screen === "merch") {
//     pointsObject = Object.assign({}, getState().scorer.merchPoints);
//   } else if (screen === "preciousItems") {
//     pointsObject = Object.assign({}, getState().scorer.preciousItemsPoints);
//   } else if (screen === "djinnsTotal") {
//     pointsObject = Object.assign({}, getState().scorer.djinnsPoints);
//   } else if (screen === "oasisTotal") {
//     pointsObject = Object.assign({}, getState().scorer.oasisPoints);
//   } else if (screen === "tilesTotal") {
//     pointsObject = Object.assign({}, getState().scorer.tilesPoints);
//   } else if (screen === "villagesTotal") {
//     pointsObject = Object.assign({}, getState().scorer.villagesPoints);
//   }

//   if (pointsObject[category] === undefined)
//     console.warn("Category does not exist");

//   // Add points
//   pointsObject[category][+player] = +value;

//   // Dispatch
//   if (screen === "scorer") {
//     dispatch(setPlayerPoints(pointsObject));
//   } else if (screen === "merch") {
//     dispatch(setMerchPoints(pointsObject));
//   } else if (screen === "preciousItems") {
//     dispatch(setPreciousItemsPoints(pointsObject));
//   } else if (screen === "djinnsTotal") {
//     dispatch(setDjinnsPoints(pointsObject));
//   } else if (screen === "oasisTotal") {
//     dispatch(setOasisPoints(pointsObject));
//   } else if (screen === "tilesTotal") {
//     dispatch(setTilesPoints(pointsObject));
//   } else if (screen === "villagesTotal") {
//     dispatch(setVillagesPoints(pointsObject));
//   }
// };

// export const updateRadioDjinn = evt => (dispatch, getState) => {
//   const djinn = evt.target.name.split("-")[1];
//   const playerId = evt.target.id.split("-")[1];

//   const index = CATEGORIES_DJINNS.indexOf(djinn);

//   if (index < 0) return;

//   const djinnsArray = [...getState().scorer.djinns];

//   djinnsArray[index] = +playerId;

//   dispatch(setDjinns(djinnsArray));
// };

// export const updateScreen = newScreen => dispatch => {
//   if (
//     [
//       "merch",
//       "djinnsTotal",
//       "oasis",
//       "preciousItems",
//       "villages",
//       "oasisTotal",
//       "villagesTotal",
//       "tilesTotal"
//     ].indexOf(newScreen) !== -1
//   ) {
//     dispatch(setControls("clear-ok"));
//   }

//   dispatch(setScreen(newScreen));
// };

// export const controller = evt => (dispatch, getState) => {
//   const EVENT_NAME = evt.target.name;
//   const CURRENT_SCREEN = getState().scorer.screen;

//   console.log("EVENT_NAME", EVENT_NAME);
//   console.log("CURRENT_SCREEN", CURRENT_SCREEN);

//   if (EVENT_NAME === "start") {
//     dispatch(setScorer());
//     dispatch(setScreen("scorer"));
//     dispatch(setControls("back-clear-score"));
//   } else if (EVENT_NAME === "score") {
//     dispatch(calculateScore());
//     // dispatch(setScreen('results'));
//     // dispatch(setControls('done'));
//   } else if (EVENT_NAME === "confirm" && CURRENT_SCREEN === "merch") {
//     dispatch(calculateMerch());
//     dispatch(setScreen("scorer"));
//     dispatch(setControls("back-clear-score"));
//   } else if (EVENT_NAME === "confirm" && CURRENT_SCREEN === "preciousItems") {
//     dispatch(calculatePreciousItems());
//     dispatch(setScreen("scorer"));
//     dispatch(setControls("back-clear-score"));
//   } else if (EVENT_NAME === "confirm" && CURRENT_SCREEN === "djinnsTotal") {
//     dispatch(calculateDjinnsAndThieves());
//     dispatch(setScreen("scorer"));
//     dispatch(setControls("back-clear-score"));
//   } else if (
//     EVENT_NAME === "confirm" &&
//     (CURRENT_SCREEN === "oasisTotal" || CURRENT_SCREEN === "villagesTotal")
//   ) {
//     dispatch(calculateOasisAndVillages());
//     dispatch(setScreen("scorer"));
//     dispatch(setControls("back-clear-score"));
//   } else if (EVENT_NAME === "confirm" && CURRENT_SCREEN === "tilesTotal") {
//     dispatch(calculateTiles());
//     dispatch(setScreen("scorer"));
//     dispatch(setControls("back-clear-score"));
//   } else if (EVENT_NAME === "clear") {
//     // Hack: Switches to score than back to the previous one
//     dispatch(setScreen("scorer"));

//     if (CURRENT_SCREEN === "merch") {
//       dispatch(newMerchPoints());
//     }

//     if (CURRENT_SCREEN === "preciousItems") {
//       dispatch(newPreciousItemsPoints());
//     }

//     if (CURRENT_SCREEN === "djinnsTotal") {
//       dispatch(newDjinnsPoints());
//     }

//     if (CURRENT_SCREEN === "oasisTotal" || CURRENT_SCREEN === "villagesTotal") {
//       dispatch(newVillagePoints());
//       dispatch(newOasisPoints());
//     }

//     if (CURRENT_SCREEN === "tilesTotal") {
//       dispatch(newTilesPoints());
//     }

//     dispatch(setScreen(CURRENT_SCREEN));
//   } else if (EVENT_NAME === "clear-all" && CURRENT_SCREEN === "scorer") {
//     dispatch(setScorer());
//   }
// };
