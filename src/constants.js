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
    name: 'items',
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
    name: 'djinns-total',
    order: 6,
    icon: 'djinn-total',
    type: 'input',
    hint: 'Total points from djinns cards (excluding bonuses)',
  },
};

export const CATEGORY_TILES = {
  1: {
    name: 'tiles-total',
    order: 1,
    icon: 'tiles-total',
    type: 'input',
    hint: 'Input the total points from tiles for each player',
  },
};

export const CATEGORY_WHIMS_TILES = {
  2: {
    name: 'cities',
    order: 2,
    icon: 'cities',
    type: 'input',
    hint: 'Input the number of Fabulous Cities tiles each player controls',
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

export const CATEGORY_WHIMS_OASIS = {
  1: {
    name: 'oasis-total',
    order: 1,
    icon: 'oasis-total',
    type: 'input',
    hint: 'Input the number of palm trees each player owns',
  },
  2: {
    name: 'oasis-lake-total',
    order: 2,
    icon: 'oasis-lake-total',
    type: 'input',
    hint: 'Input how many of those palm trees are next to the Great Lake',
  },
};

export const CATEGORY_WHIMS_VILLAGES = {
  1: {
    name: 'villages-total',
    order: 1,
    icon: 'villages-total',
    type: 'input',
    hint: 'Input the number of palaces each player owns',
  },
  2: {
    name: 'villages-lake-total',
    order: 2,
    icon: 'villages-lake-total',
    type: 'input',
    hint: 'Input how many of those palaces are next to the Great Lake',
  },
};

export const CATEGORY_PRECIOUS_ITEMS = {
  1: {
    name: 'item-jewelry',
    order: 1,
    icon: 'item-jewelry',
    type: 'input',
    hint: 'Input the number of jewelry tokens each player owns',
  },
  2: {
    name: 'item-treasure',
    order: 2,
    icon: 'item-treasure',
    type: 'input',
    hint: 'Input the number of treasure tokens each player owns',
  },
  3: {
    name: 'item-crown',
    order: 3,
    icon: 'item-crown',
    type: 'input',
    hint: 'Input the number of crown tokens each player owns',
  },
};

export const CATEGORY_BONUS_BASE = {
  1: {
    name: 'bonus-viziers',
    order: 1,
    icon: 'bonus-viziers',
    type: 'input',
    hint: 'Total bonus points granted by viziers and Jaafar',
  },
  3: {
    name: 'bonus-elders',
    order: 3,
    icon: 'bonus-elders',
    type: 'input',
    hint: 'Total bonus points granted by Shamhat',
  },
  4: {
    name: 'bonus-oasis',
    order: 4,
    icon: 'bonus-oasis',
    type: 'input',
    hint: 'Total bonus points granted by Haurvatat',
  },
};

export const CATEGORY_BONUS_ARTISANS = {
  2: {
    name: 'bonus-artisans',
    order: 2,
    icon: 'bonus-artisans',
    type: 'input',
    hint: 'Total bonus points granted by artisans and Ptah',
  },
  5: {
    name: 'bonus-items',
    order: 5,
    icon: 'bonus-items',
    type: 'input',
    hint: 'Total bonus points granted by Geb',
  },
};

export const CATEGORY_TOTAL = {
  1: {
    name: 'total',
    order: 1,
    icon: 'total',
    type: 'input',
  },
};

export const TILES_BASE_LIST = [
  ...new Array(4).fill(4), // Big Markets
  ...new Array(5).fill(5), // Villages
  ...new Array(8).fill(6), // Small Markets
  ...new Array(4).fill(6), // Sacred places
  ...new Array(6).fill(8), // Oasis
  ...new Array(1).fill(10), // Sacred place
  ...new Array(1).fill(12), // Sacred place
  ...new Array(1).fill(15), // Sacred place
];

export const TILES_ARTISANS_LIST = [
  ...new Array(3).fill(5), // Workshops
  ...new Array(2).fill(10), // Specialized Markets
];

export const TILES_WHIMS_LIST = [
  ...new Array(5).fill('5+'), // Fabulous Cities
];
