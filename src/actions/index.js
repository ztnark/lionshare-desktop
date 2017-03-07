import axios from 'axios';

const ROOT_URL = `https://api.lionshare.capital/api/prices`;

export const FETCH_PRICES = 'FETCH_PRICES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const CHANGE_VIEW = 'CHANGE_VIEW';


export function fetchPrices(period) {
  const url = `${ROOT_URL}?period=${"day"}`;
  const request = axios.get(url);
  return {
    type: FETCH_PRICES,
    payload: request
  };
}

export function changeView(view) {
  console.log(view);
  return {
    type: CHANGE_VIEW,
    payload: view
  };
}
