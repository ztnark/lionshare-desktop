import { combineReducers } from 'redux';
import PriceReducer from './PriceReducer';
import Ui from './UiReducer';

const rootReducer = combineReducers({
  prices: PriceReducer,
  ui: Ui
});

export default rootReducer;
