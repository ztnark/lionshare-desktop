import { AsyncStorage } from 'react-native';
import { CURRENCIES } from '../utils/currencies';

import { CHANGE_VIEW } from '../actions';


export default function(state = {view: 'prices', visibleCurrencies: CURRENCIES}, action) {
  switch (action.type) {
  case CHANGE_VIEW:
    state.view = action.payload;
    return state;
  }
  return state;
}
