// import data from './LibraryList.json';
//
// export default () => data;
import _ from 'lodash';
import { currencyColors } from '../utils/currencies';

import { FETCH_PRICES, RECEIVE_MESSAGE } from '../actions';

const formatData = (rateData) => {
  var data = [];
  var rates = getRates(rateData);
  var changes = getChanges(rateData);
    _.map(rateData, (value, key) => {
      const color = currencyColors[key];
      const labels = [];
      const historic = [];
      for (const rate of value) {
        historic.push(parseFloat(rate));
        labels.push('');
      }

      data.push({
        color,
        symbol: key,
        price: rates[key],
        change: changes[key] * 100,
        chartData: {
          labels,
          datasets: [{
            radius: 0,
            borderColor: color,
            data: historic,
          }],
        },
        highestPrice: highestPrice(key, rateData),
        lowestPrice: lowestPrice(key, rateData),
        // marketCap: marketCap(key),
      });
    });
  return data;
}

const highestPrice = (currency, rateData) => {
  let highestPrice = 0.0;
  highestPrice = Math.max(...rateData[currency]);
  return highestPrice;
}

const getRates = (rateData) => {
  let data;
  data = {};
  _.map(rateData, (value, key) => {
    data[key] = value.slice(-1)[0];
  });
  return data;
}

const getChanges = (rateData) => {
  let data;
  data = {};
  _.map(rateData, (value, key) => {
    const change = (value.slice(-1)[0] - value[0]) / value[0];
    data[key] = change;
  });
  return data;
}

const lowestPrice = (currency, rateData) => {
  return Math.min(...rateData[currency]);
}

const marketCap = (currency) => {
  return numeral(marketData[currency]).format('0.0a');
}

const updatePrice = (message, state) => {
  var rateData = state[0]
  const data = JSON.parse(message);
  const cryptoCurrency = data.cryptoCurrency;
  var index = _.findIndex(rateData, function(obj) {
    return obj.symbol === cryptoCurrency
  })
  const price = parseFloat(data.price);
  rateData[index].price = price;
  return rateData;
}

export default function(state = [[]], action) {
  switch (action.type) {
  case FETCH_PRICES:
    return [ formatData(action.payload.data.data), ...state ];
  case RECEIVE_MESSAGE:
    return [ updatePrice(action.message, state), ...state];
  }

  return state;
}
