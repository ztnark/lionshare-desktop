import { AsyncStorage } from 'react-native';
import { CURRENCIES } from '../utils/currencies';

export default function(state = {view: 'prices', visibleCurrencies: CURRENCIES}, action) {
  // switch (action.type) {
  // case FETCH_PRICES:
  //   return [ formatData(action.payload.data.data), ...state ];
  // case RECEIVE_MESSAGE:
  //   return [ updatePrice(action.message, state), ...state];
  // }

  return state;
}
