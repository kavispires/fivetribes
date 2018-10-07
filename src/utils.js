import _ from 'lodash';

import {
  CATEGORY_ARTISANS,
  CATEGORY_ARTISANS_DIJNNS,
  CATEGORY_BASE,
  CATEGORY_BASE_DJINNS,
  CATEGORY_PRECIOUS_ITEMS,
  CATEGORY_THIEVES,
  CATEGORY_TILES,
  CATEGORY_WHIMS,
  CATEGORY_WHIMS_OASIS,
  CATEGORY_WHIMS_TILES,
  CATEGORY_WHIMS_VILLAGES,
  TILES_ARTISANS_LIST,
  TILES_BASE_LIST,
  TILES_WHIMS_LIST,
  CATEGORY_BONUS_ARTISANS,
  CATEGORY_BONUS_BASE,
  CATEGORY_TOTAL,
} from './constants';

export const capitalize = string =>
  string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const deleteLocalStorage = () => {
  console.warn('Deleting expired data from localStorage...');
  window.localStorage.setItem('five-tribes-app', null);
};

export const loadLocalStorage = () => {
  console.warn('Fetching from localStorage...');
  const data = window.localStorage.getItem('five-tribes-app');
  return JSON.parse(data);
};

export const saveLocalStorage = state => {
  console.warn('Saving to localStorage...');

  const data = {};
  data.timestamp = Date.now();

  data.screen = state.app.screen;
  data.numPlayers = state.scorer.numPlayers;
  data.colors = state.scorer.colors;
  data.expansions = state.scorer.expansions;

  window.localStorage.setItem('five-tribes-app', JSON.stringify(data));
};

export const snakeToCamelCase = string =>
  string.replace(/(-\w)/g, m => m[1].toUpperCase());

export const buildCategories = expansions => {
  // Build Main
  const hasArtisans = expansions.ARTISANS ? CATEGORY_ARTISANS : {};
  const hasWhims = expansions.WHIMS ? CATEGORY_WHIMS : {};
  const main = Object.assign({}, CATEGORY_BASE, hasArtisans, hasWhims);

  // Build Djinns
  const hasArtisansDjinns = expansions.ARTISANS ? CATEGORY_ARTISANS_DIJNNS : {};
  const djinns = Object.assign({}, CATEGORY_BASE_DJINNS, hasArtisansDjinns);

  // Build Thieves
  const thieves = expansions.THIEVES ? CATEGORY_THIEVES : {};

  // Build Merch
  const merch = {};
  for (let i = 1; i <= 6; i++) {
    merch[i] = {
      name: `merch-set-${i}`,
      order: i,
      icon: `merch-set-${i}`,
      type: 'number',
      hint:
        'Input the total number of cards on each set (the game allows a maxinum of 6 sets)',
    };
  }

  // Build Oasis
  const oasis = Object.assign({}, CATEGORY_WHIMS_OASIS);

  // Build Villages
  const villages = Object.assign({}, CATEGORY_WHIMS_VILLAGES);

  // Build Precious Items
  const items = Object.assign({}, CATEGORY_PRECIOUS_ITEMS);

  // Build Tiles
  const hasWhimsTiles = expansions.WHIMS ? CATEGORY_WHIMS_TILES : {};
  const tiles = Object.assign({}, CATEGORY_TILES, hasWhimsTiles);

  // Build Bonus
  const hasArtisansBonus = expansions.ARTISANS ? CATEGORY_BONUS_ARTISANS : {};
  const bonus = Object.assign({}, CATEGORY_BONUS_BASE, hasArtisansBonus);

  // Build Total
  const total = Object.assign({}, CATEGORY_TOTAL);

  return {
    main: Object.values(main),
    djinns: Object.values(djinns),
    items: Object.values(items),
    merch: Object.values(merch),
    oasis: Object.values(oasis),
    thieves: Object.values(thieves),
    tiles: Object.values(tiles),
    villages: Object.values(villages),
    bonus: Object.values(bonus),
    total: Object.values(total),
  };
};

export const buildTiles = expansions => {
  // Get tile values
  const hasArtisans = expansions.ARTISANS ? [...TILES_ARTISANS_LIST] : [];
  const hasWhims = expansions.WHIMS ? [...TILES_WHIMS_LIST] : [];
  let tileValues = [...TILES_BASE_LIST, ...hasArtisans].sort((a, b) => a - b);
  tileValues = [...tileValues, ...hasWhims];
  // Define Tile class
  class Tile {
    constructor(id, value) {
      this.id = id;
      this.value = value;
      this.owner = null;
    }
  }
  const result = {};
  tileValues.forEach((value, index) => {
    result[index] = new Tile(index, value);
  });
  return result;
};

export const calculateResults = scorer => {
  // Define Player class
  class Player {
    constructor(color, total) {
      this.color = color;
      this.total = total;
      this.achievements = [];
      this.achievementsCount = 0;
    }
  }
  const players = {};
  // Create Players Objects
  scorer.colors.forEach((color, index) => {
    players[index] = new Player(color, scorer.scores.total[index]);
  });

  // Award achievements
  scorer.categories.main.forEach(category => {
    const { name } = category;
    const array = scorer.scores[name];
    const max = Math.max(...array);
    if (max > 0) {
      array.forEach((value, index) => {
        if (value === max) {
          players[index].achievements.push(name);
          players[index].achievementsCount += 1;
        }
      });
    }
  });

  return _.orderBy(players, ['total', 'achievementsCount'], ['desc', 'desc']);
};
