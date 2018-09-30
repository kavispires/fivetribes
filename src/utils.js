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
