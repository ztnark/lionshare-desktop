import { AsyncStorage } from 'react-native';
import { CURRENCIES } from '../utils/currencies';

var localStorage = AsyncStorage;

const UI_STORE_KEY = 'UI_STORE_KEY';

const AVAILABLE_VIEWS = [
  'prices',
  'portfolio',
  'settings',
];

export default class Ui {
  view = AVAILABLE_VIEWS[0];
  visibleCurrencies = CURRENCIES.map(currency => currency.symbol);

  /* actions */

  changeView(view) {
    if (AVAILABLE_VIEWS.includes(view)) {
      this.view = view;
    }
  }

  toggleCurrency = (currency) => {
    if (this.visibleCurrencies.includes(currency)) {
      this.visibleCurrencies.remove(currency);
    } else {
      this.visibleCurrencies.push(currency);
    }
  }

  toggleCurrenciesAll = () => {
    this.toggleCurrenciesNone(); // Clear first
    CURRENCIES.forEach(currency => this.visibleCurrencies.push(currency.symbol));
  }

  toggleCurrenciesNone = () => {
    this.visibleCurrencies = [];
  }

  fromJSON = (jsonData) => {
    const parsed = jsonData;
    this.view = parsed.view;
    this.visibleCurrencies = parsed.visibleCurrencies;
  }

  /* other */

  toJSON = () => (
    JSON.stringify({
      view: this.view,
      visibleCurrencies: this.visibleCurrencies,
    })
  )

  constructor() {
    // Rehydrate store from persisted data
    localStorage.setItem(UI_STORE_KEY, this.toJSON());
    const data = localStorage.getItem(UI_STORE_KEY);
    // debugger;
    if (data) this.fromJSON(data);
  }
}
