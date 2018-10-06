export const NUM_PLAYERS = [1, 2, 3, 4, 5];

export const COLORS = ['CYAN', 'PINK', 'BLACK', 'ORANGE', 'BROWN'];

export const EXPANSIONS = ['ARTISANS', 'THIEVES', 'WHIMS'];

export const HISTORY_CHAIN = {
  setup: 'home',
  scorer: 'setup',
};

export const CATEGORY_BASE = {
  1: {
    name: 'coins',
    order: 1,
    icon: 'coins',
    type: 'input',
    hint: "Input the total value of each player's coins",
  },
  2: {
    name: 'viziers',
    order: 2,
    icon: 'viziers',
    type: 'input',
    hint: 'Input the number of yellow meeples (Viziers)',
  },
  4: {
    name: 'elders',
    order: 4,
    icon: 'elders',
    type: 'input',
    hint: 'Input the number of white meeples (Elders)',
  },
  5: {
    name: 'djinns',
    order: 5,
    icon: 'djinns',
    type: 'button',
    link: 'scorer-djinns',
    hint: 'Total points from djinns cards (excluding bonuses)',
  },
  7: {
    name: 'tiles',
    order: 7,
    icon: 'tiles',
    type: 'button',
    link: 'scorer-tiles',
    hint: 'Total of tiles points',
  },
  9: {
    name: 'oasis',
    order: 9,
    icon: 'oasis',
    type: 'input',
    hint: 'Input the number of palm trees each player owns',
  },
  10: {
    name: 'villages',
    order: 10,
    icon: 'villages',
    type: 'input',
    hint: 'Input the number of palaces each player owns',
  },
  12: {
    name: 'merch',
    order: 12,
    icon: 'merch',
    type: 'button',
    link: 'scorer-merch',
    hint: 'Total merchandising points',
  },
};

export const CATEGORY_ARTISANS = {
  3: {
    name: 'artisans',
    order: 3,
    icon: 'artisans',
    type: 'input',
    hint: 'Input the number of purple meeples (Artisans)',
  },
  8: {
    name: 'tent',
    order: 8,
    icon: 'tent',
    type: 'input',
    hint:
      'Input number of red tiles surrounding your tent, including its own tile',
  },
  11: {
    name: 'precious-items',
    order: 11,
    icon: 'precious-items',
    type: 'button',
    link: 'scorer-precious-items',
    hint: 'Total precious items points',
  },
};

export const CATEGORY_THIEVES = {
  6: {
    name: 'thieves',
    order: 6,
    icon: 'thieves',
    type: 'input',
    hint: 'Input the total number of thieves points',
  },
};

export const CATEGORY_WHIMS = {
  7: {
    name: 'tiles',
    order: 7,
    icon: 'tiles-cities',
    type: 'button',
    link: 'scorer-tiles',
    hint: 'Total of tiles points including Fabulous Cities',
  },
  9: {
    name: 'oasis',
    order: 9,
    icon: 'oasis-lake',
    type: 'button',
    link: 'scorer-oasis',
    hint: 'Input the number of palm trees each player owns',
  },
  10: {
    name: 'villages',
    order: 10,
    icon: 'villages-lake',
    type: 'button',
    link: 'scorer-villages',
    hint: 'Input the number of palaces each player owns',
  },
};

export const CATEGORY_BONUS = {
  13: {
    name: 'bonus',
    order: 13,
    icon: 'bonus',
    type: 'button',
    link: 'scorer-bonus',
    hint: 'Total bonus points awarded by djinns',
  },
};

export const CATEGORY_BASE_DJINNS = {
  2: {
    name: 'djinn-haurvatat',
    order: 2,
    icon: 'djinn-haurvatat',
    type: 'radio',
    hint: 'Select the player who owns Haurvatat',
  },
  3: {
    name: 'djinn-jaafar',
    order: 3,
    icon: 'djinn-jaafar',
    type: 'radio',
    hint: 'Select the player who owns Jaafar',
  },
  5: {
    name: 'djinn-shamhat',
    order: 5,
    icon: 'djinn-shamhat',
    type: 'radio',
    hint: 'Select the player who owns Shamhat',
  },
  6: {
    name: 'djinns',
    order: 6,
    icon: 'djinn-total',
    type: 'input',
    hint: 'Total points from djinns cards (excluding bonuses)',
  },
};

export const CATEGORY_ARTISANS_DIJNNS = {
  1: {
    name: 'djinn-geb',
    order: 1,
    icon: 'djinn-geb',
    type: 'radio',
    hint: 'Select the player who owns Geb',
  },
  4: {
    name: 'djinn-ptah',
    order: 4,
    icon: 'djinn-ptah',
    type: 'radio',
    hint: 'Select the player who owns Ptah',
  },
};

// OLD STUFF

export const CATEGORIES = [
  'coins',
  'viziers',
  'artisans',
  'elders',
  'djinnsTotal',
  'tilesTotal',
  'oasisTotal',
  'villagesTotal',
  'preciousItems',
  'merch',
];

export const CATEGORIES_DJINNS = [
  'geb',
  'haurvatat',
  'jaafar',
  'ptah',
  'shamhat',
];

export const CATEGORIES_DJINNS_AND_THIEVES = ['djinns', 'thieves'];

export const CATEGORIES_ITEMS = ['jewelry', 'treasure', 'crown'];

export const CATEGORIES_MERCH = [
  'fish',
  'wheat',
  'pottery',
  'spices',
  'papyrus',
  'fabric',
  'ivory',
  'gems',
  'gold',
];

export const CATEGORIES_OSASIS = ['oasis', 'oasisLake'];

export const CATEGORIES_OASIS_AND_VILLAGES = [
  'oasis',
  'villages',
  'oasisLake',
  'villagesLake',
];

export const CATEGORIES_TILES = ['tiles', 'tent', 'cities'];

export const CATEGORIES_VILLAGES = ['villages', 'villagesLake'];

export const HINTS = {
  coins: 'Input the total value of coins.',
  viziers: 'Input the number of Viziers (yellow meeples).',
  artisans: 'Input the number of Artisans (purple meeples).',
  elders: 'Input the number of Elders (white meeples).',
  djinnsTotal: 'Total Djinns (and Thieves) points.',
  tiles: 'Input the number points of tiles, tents and great cities.',
  oasisTotal: 'Input the number of palm trees.',
  villagesTotal: 'Input the number of palaces.',
  preciosItems: 'Total Precious Items points.',
  merch: 'Total Merchandising Points',
};
