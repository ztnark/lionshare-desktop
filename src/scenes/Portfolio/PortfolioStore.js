import { observable, computed, action, asMap, autorun } from 'mobx';
import _ from 'lodash';

import { currencyData } from '../../utils/currencies';
import { formatNumber } from '../../utils/formatting';

const PORTFOLIO_KEY = 'PORTFOLIO_KEY';

class PortfolioStore {
  balances = asMap({});
  changes = asMap({});
  editMode = 'crypto';
  editedBalances = asMap({}); // Temporary when user enters edit mode

  isEditing = false;
  hideOnboarding = false;

  /* computed */

  get activeBalances() {
    return this.isEditing ? this.editedBalances : this.balances;
  }

  get totalBalance() {
    let value = 0.0;

    if (this.editMode === 'crypto') {
      // When editing in crypto, or exited edit more
      this.activeBalances.forEach((amount, currency) => {
        value += this.prices.convert(amount, currency);
      });
    } else {
      // When editing in USD - and we can just sum up all
      this.activeBalances.forEach((amount, _currency) => {
        value += amount;
      });
    }

    return value;
  }

  get totalChange() {
    let value = 0.0;
    this.balances.forEach((amount, currency) => {
      value += this.prices.change(amount, currency);
    });
    return value;
  }

  get assetListData() {
    const currencies = this.balances.keys();
    return currencies.map(currency => {
      const balance = this.balances.get(currency);
      const nativeBalance = this.prices.convert(balance, currency);
      const change = this.prices.change(balance, currency);

      return {
        ...currencyData(currency), // Generic currency data (name, symbol, color)
        balance,
        nativeBalance,
        change,
      };
    });
  }

  get userDataReady() {
    return this.balances.keys().length > 0;
  }

  get allowSave() {
    return this.editedBalances.keys().length > 0 &&
      this.totalBalance > 0.0;
  }

  get doughnutData() {
    const data = {
      datasets: [{
        borderWidth: 0,
        data: [0.01],
        backgroundColor: ['rgba(255, 255, 255, 0.20)'],
        hoverBackgroundColor: ['rgba(255, 255, 255, 0.20)'],
      }],
    };
    if (this.userDataReady || this.isEditing) {
      this.activeBalances.forEach((amount, currency) => {
        data.datasets[0].data.push(this.prices.convert(amount, currency));
        data.datasets[0].backgroundColor.push(currencyData(currency).color);
        data.datasets[0].hoverBackgroundColor.push(currencyData(currency).color);
      });
    }
    return data;
  }

  get fiatCurrency() {
    return 'USD';
  }

  get showEditCancel() {
    return this.userDataReady;
  }

  get showOnboarding() {
    return this.totalBalance <= 0.0 && !this.hideOnboarding;
  }

  /* actions */

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
    this.editedBalances.clear();
    this.editMode = 'crypto';
    if (this.isEditing) {
      this.editedBalances.merge(this.balances);
    }
  }

  toggleEditMode = () => {
    if (this.editMode === 'crypto') {
      this.editMode = 'fiat';
      this.editedBalances.forEach((amount, currency) => {
        this.editedBalances.set(currency, this.prices.convert(amount, currency));
      });
    } else {
      this.editMode = 'crypto';
      this.editedBalances.forEach((amount, currency) => {
        this.editedBalances.set(currency, amount / this.prices.convert(1.00, currency));
      });
    }
  }

  updateBalance = (event) => {
    const { name, value } = event.target;
    if (value) {
      this.editedBalances.set(name, _.round(parseFloat(value), 2));
    } else {
      this.editedBalances.delete(name);
    }
  }

  saveEdit = () => {
    if (this.editMode === 'fiat') this.toggleEditMode();

    // Clean empty values
    this.editedBalances.keys().forEach(currency => {
      if (this.editedBalances.get(currency) <= 0.0) this.editedBalances.delete(currency);
    });

    this.balances.clear();
    this.balances.merge(this.editedBalances);
    this.toggleEdit();
  }

  toggleOnboarding = () => {
    this.hideOnboarding = true;
  }

  fromJSON = (jsonData) => {
    const parsed = JSON.parse(jsonData);
    if (parsed.balances) {
      // Only set balances that are also visible, disregard others
      const balances = {};
      asMap(parsed.balances).forEach((amount, currency) => {
        if (this.ui.visibleCurrencies.includes(currency)) {
          balances[currency] = amount;
        }
      });
      this.balances.merge(balances);

      // Don't show balance again if the user has already set values
      if (this.totalBalance > 0) this.hideOnboarding = true;
    }
  }

  /* other */

  toJSON = () => (
    JSON.stringify({
      balances: this.balances,
    })
  )

  constructor(options) {
    // General store references
    this.prices = options.prices;
    this.ui = options.ui;

    // Rehydrate store from persisted datatry {
    try {
      const value = AsyncStorage.getItem(PORTFOLIO_KEY);
      if (value !== null){
        // We have data!!
        this.fromJSON(value);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }

    // If user doens't have assets defined,
    // enter edit mode until they do
    if (!this.userDataReady) {
      this.isEditing = true;
    }

    // ipcRenderer.on('priceSetting', (_event, setting) => {
    //   if (setting) {
    //     ipcRenderer.send('priceUpdate', formatNumber(this.totalChange, 'USD', {
    //       directionSymbol: true,
    //       minPrecision: true,
    //     }));
    //   } else {
    //     ipcRenderer.send('priceUpdate', '');
    //   }
    // });

    autorun(() => {
      // Persist store to localStorage
      try {
        AsyncStorage.setItem(PORTFOLIO_KEY, this.toJSON());
      } catch (error) {
        // Error saving data
      }
      // Taskbar change updates
      const trayChange = formatNumber(this.totalChange, 'USD', {
        directionSymbol: true,
        minPrecision: true,
      });
    });
  }
}

export default PortfolioStore;
