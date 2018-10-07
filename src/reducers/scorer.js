import { COLORS } from '../constants';
import { saveLocalStorage, buildCategories, buildTiles } from '../utils';

/* ------------------   ACTION TYPES  ------------------ */

const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';
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

export const setActiveCategory = payload => dispatch =>
  dispatch({ type: SET_ACTIVE_CATEGORY, payload });
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
  activeCategory: '',
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
    case SET_ACTIVE_CATEGORY:
      newState.activeCategory = action.payload;
      break;

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
  // Reset total
  scores.total = new Array(scores.merch.length).fill(0);

  // Calculate Artisans and Elders points
  scores.eldersTotal = [...scores.elders];
  if (expansions.ARTISANS) {
    scores.artisansTotal = [...scores.artisans];
  }

  if (totalCategories.length === 0) {
    totalCategories = [...categories.main, ...categories.bonus];
  }
  totalInterval = setInterval(() => {
    scores.total = scores.total.map(
      (prev, index) => prev + scores[totalCategories[count].name][index]
    );
    dispatch(setActiveCategory(totalCategories[count].name));
    dispatch(setScores(scores));
    count++;
    if (count >= totalCategories.length) {
      clearInterval(totalInterval);
      count = 0;
      dispatch(setActiveCategory(''));
      dispatch(setSubscreen('scorer-result'));
    }
  }, 500);
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
  const points = new Array(scores.tiles.length).fill(0);

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
