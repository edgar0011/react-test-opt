/**
 * Created by edgar on 11/01/2017.
 */
import { CALCULATE_VOLATILITY, CALCULATE_PRICE, CALC_SUBMIT_INPUT,
  CALC_SUBMIT_LOADED, CALC_SUBMIT_LOADING, CALC_SUBMIT_FAILED } from '../config/CONSTANTS';

import {black76, black76imp} from '../data/black76';

export default function calcReducer(state = {result:{volatility:0, price:0, errors:[]}, lastInput:null, calcSubmit:{loading:false, errors:null, response:null}}, action) {

  const type = action.type;

  if (type === CALCULATE_VOLATILITY) {

    const {input} = action.payload;
    if (isNaN(input)) {
      return {
        ...state, result:{...state.result, valid:false, errors:["INPUT ERROR, PRICE is Not a Number"]}
      }
    }

    const volatility = black76imp('c', input, 102, 100, 0.005, 1.0);
    console.log("volatility claculated");
    console.log(volatility);
    const errors = [];
    if (isNaN(volatility)) {
      errors[0] = "CALCULATION ERROR, VOLATILITY is Not a Number"
    }
    return {
      ...state, lastInput:"price", result:{...state.result, volatility, price:input, valid:errors.length === 0, errors}
    }
  }
  if (type === CALCULATE_PRICE) {
    const {input} = action.payload;
    if (isNaN(input)) {
      return {
        ...state, result:{...state.result, valid:false, errors:["INPUT ERROR, VOLATILITY is Not as Number"]}
      }
    }

    const price = black76('c', 'price', 102, 100, 0.005, 1.0, input);
    console.log("price claculated");
    console.log(price);
    const errors = [];
    if (isNaN(price)) {
      errors[0] = "CALCULATION ERROR, PRICE is Not a Number"
    }
    return {
      ...state, lastInput:"volatility", result:{...state.result, price, volatility:input, valid:errors.length === 0, errors}
    }
  }

  if (type === CALC_SUBMIT_LOADING) {
    return {
      ...state, calcSubmit:{...state.calcSubmit, loading:true}
    }
  }

  if (type === CALC_SUBMIT_LOADED) {
    return {
      ...state, calcSubmit:{...state.calcSubmit, loading:false, response:action.payload}
    }
  }

  if (type === CALC_SUBMIT_FAILED) {
    return {
      ...state, calcSubmit:{...state.calcSubmit, loading:false, errors:action.payload}
    }
  }


  return state;

}