export const deleteLocalStorage = () => {
  console.warn('Deleting expired data from localStorage...');
  window.localStorage.setItem('five-tribes-app', null);
};

export const loadLocalStorage = () => {
  console.warn('Fetching from localStorage...');
  const data = window.localStorage.getItem('five-tribes-app');
  return JSON.parse(data);
};

export const saveLocalStorage = data => {
  console.warn('Saving to localStorage...');
  data.timestamp = Date.now();
  window.localStorage.setItem('five-tribes-app', JSON.stringify(data));
};
