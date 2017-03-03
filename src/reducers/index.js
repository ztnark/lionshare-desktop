import { combineReducers } from 'redux';
import PriceReducer from './PriceReducer';

const rootReducer = combineReducers({
  prices: PriceReducer,
});

export default rootReducer;
