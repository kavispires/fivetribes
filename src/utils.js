import {
  CATEGORY_ARTISANS,
  CATEGORY_ARTISANS_DIJNNS,
  CATEGORY_BASE,
  CATEGORY_BASE_DJINNS,
  CATEGORY_THIEVES,
  CATEGORY_WHIMS,
  CATEGORY_WHIMS_OASIS,
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
  const hasThieves = expansions.THIEVES ? CATEGORY_THIEVES : {};
  const hasWhims = expansions.WHIMS ? CATEGORY_WHIMS : {};
  const main = Object.assign(
    {},
    CATEGORY_BASE,
    hasArtisans,
    hasThieves,
    hasWhims
  );

  // Build Djinns
  const hasArtisansDjinns = expansions.ARTISANS ? CATEGORY_ARTISANS_DIJNNS : {};
  const djinns = Object.assign({}, CATEGORY_BASE_DJINNS, hasArtisansDjinns);

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

  return {
    main: Object.values(main),
    djinns: Object.values(djinns),
    merch: Object.values(merch),
    oasis: Object.values(oasis),
  };
};
