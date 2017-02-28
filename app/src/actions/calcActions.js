/**
 * Created by edgar on 11/01/2017.
 */
import { CALCULATE_VOLATILITY, CALCULATE_PRICE, CALC_SUBMIT_INPUT,
  CALC_SUBMIT_LOADED, CALC_SUBMIT_LOADING, CALC_SUBMIT_FAILED } from '../config/CONSTANTS';

import CalcService from '../dataApi/CalcService'

const calcService = new CalcService();

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

export function submitInput(input, type) {
  /*return {
    type:CALC_SUBMIT_INPUT,
    payload:{input, type}
  }*/

  return (dispatch) => {
    dispatch(calcSubmitLoading());

    const data = {
      "quoteType": type,
      "quote": input
    };

    return calcService.submitCalculation(data)
      .then(response => {
        //setTimeout(()=> {
        dispatch(calcSubmitLoaded(response.data));
        //}, 5000);

      }, errors => {
        dispatch(calcSubmitFailed(errors));
      });
  }
}

export function calcSubmitLoaded(result) {
  return  {
    type: CALC_SUBMIT_LOADED,
    payload:result
  }
}

export function calcSubmitLoading() {
  return  {
    type: CALC_SUBMIT_LOADING
  }
}
export function calcSubmitFailed(errors) {
  return  {
    type: CALC_SUBMIT_FAILED,
    payload:errors
  }
}