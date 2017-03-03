import _ from 'lodash';
import numeral from 'numeral';
import { observable, computed, action, autorun } from 'mobx';
import ReconnectingWebsocket from 'reconnecting-websocket';
import { AsyncStorage } from 'react-native';

import { currencyColors } from '../utils/currencies';

var localStorage = AsyncStorage;

const PRICES_STORE_KEY = 'PRICES_STORE_KEY';

export default class PricesStore {
  rateData = {};
  marketData = {};
  period = 'day';
  isLoaded = false;
  error = null;

  /* computed */

  get rates() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.rateData, (value, key) => {
        data[key] = value.slice(-1)[0];
      });
    }
    return data;
  }

  get changes() {
    let data;
    if (this.isLoaded) {
      data = {};
      _.map(this.rateData, (value, key) => {
        const change = (value.slice(-1)[0] - value[0]) / value[0];
        data[key] = change;
      });
    }
    return data;
  }

  get priceListData() {
    let data;
    if (this.isLoaded) {
      data = [];
      _.map(this.rateData, (value, key) => {
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
          price: this.rates[key],
          change: this.changes[key] * 100,
          chartData: {
            labels,
            datasets: [{
              radius: 0,
              borderColor: color,
              data: historic,
            }],
          },
          highestPrice: this.highestPrice(key),
          lowestPrice: this.lowestPrice(key),
          marketCap: this.marketCap(key),
        });
      });
    }

    return data;
  }

  /* actions */

  fetchData = async () => {
      const rateRes = await fetch(`https://api.lionshare.capital/api/prices?period=${ this.period }`);
      const rateData = await rateRes.json();
      this.rateData = rateData.data;

      const marketRes = await fetch(`https://api.lionshare.capital/api/markets`);
      const marketData = await marketRes.json();
      this.marketData = marketData.data;
      this.isLoaded = true;
      this.error = null;
  }

  updatePrice = (message) => {
    const data = JSON.parse(message.data);
    const cryptoCurrency = data.cryptoCurrency;
    const price = parseFloat(data.price);
    if (this.isLoaded) {
      const index = this.rateData[cryptoCurrency].length - 1;
      this.rateData[cryptoCurrency][index] = price;
    }
  }

  connectToWebsocket = () => {
    this.websocket = new ReconnectingWebsocket('wss://api.lionshare.capital', [], {});
    this.websocket.addEventListener('message', this.updatePrice);
  }

  selectPeriod = (period) => {
    this.period = period;
    this.fetchData();
  }

  fromJSON = (jsonData) => {
    const parsed = this;
    this.rateData = parsed.rateData;
    this.marketData = parsed.marketData;
    if (parsed.period) this.period = parsed.period;
    this.isLoaded = true;
  }

  /* other */

  toJSON = () => (
    JSON.stringify({
      rateData: this.rateData,
      marketData: this.marketData,
      period: this.period,
    })
  )

  highestPrice = (currency) => {
    let highestPrice = 0.0;
    if (this.isLoaded) {
      highestPrice = Math.max(...this.rateData[currency]);
    }
    return highestPrice;
  }

  lowestPrice = (currency) => {
    const lowestPrice = 0.0;
    if (this.isLoaded) {
      return Math.min(...this.rateData[currency]);
    }
    return lowestPrice;
  }

  marketCap = (currency) => {
    const marketCap = 0.0;
    if (this.isLoaded) {
      return numeral(this.marketData[currency]).format('0.0a');
    }
    return marketCap;
  }

  convert = (amount, currency) => {
    return amount * this.rates[currency];
  }

  change = (amount, currency) => {
    return this.convert(amount, currency) * this.changes[currency];
  }

  constructor() {
    // Rehydrate store from persisted data
    const data = localStorage.getItem(PRICES_STORE_KEY);
    if (data) this.fromJSON(data);


    this.fetchData();
    this.connectToWebsocket();

    // Update price data once every hour,
    // because we use 12 buckets for 24hrs and update
    // them from the websocket messages, there is no need
    // to update more frequently than this.
    const interval = 60 * 60 * 1000;
    setInterval(() => {
      this.fetchData();
    }, interval);
  }
}
