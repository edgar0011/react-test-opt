
import ServiceBase from './ServiceBase';

import {CALCULATION_URL} from '../config/URLS';

export default class CalcService extends ServiceBase {

  constructor(){
    super(arguments);
  }

  submitCalculation(data) {
    return super.post(CALCULATION_URL, data, {withCredentials: true, headers: {'Content-Type':'application/json'}});
  }

}