/**
 * Created by edgar on 11/01/2017.
 */
import { CALCULATE_PRICE, CALCULATE_VOLATILITY } from '../config/CONSTANTS';

import {black76, black76imp} from '../data/black76';

export default function calcReducer(state = {result:{volatility:0, price:0, errorMessages:[]}}, action) {

  const type = action.type;

  if (type === CALCULATE_VOLATILITY) {
    const {input} = action.payload;
    const volatility = black76imp('c', input, 102, 100, 0.005, 1.0);
    console.log("volatility claculated");
    console.log(volatility);
    return {
      ...state, result:{...state.result, volatility, price:input}
    }
  }
  if (type === CALCULATE_PRICE) {
    const {input} = action.payload;
    const price = black76('c', 'price', 102, 100, 0.005, 1.0, input);
    console.log("price claculated");
    console.log(price);
    return {
      ...state, result:{...state.result, price, volatility:input}
    }
  }
  return state;

}