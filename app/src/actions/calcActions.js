/**
 * Created by edgar on 11/01/2017.
 */
import { CALCULATE_VOLATILITY, CALCULATE_PRICE } from '../config/CONSTANTS';

export function calculateVolatility(input) {
  return {
    type:CALCULATE_VOLATILITY,
    payload:{input}
  }
}


export function calculatePrice(input) {
  return {
    type:CALCULATE_PRICE,
    payload:{input}
  }
}