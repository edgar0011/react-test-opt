/**
 * Created by edgar on 11/01/2017.
 */
import React from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';

import BasicInput from '../ui/BasicInput';

import * as calcActions from '../../actions/calcActions';

import classNames from 'classnames';


@connect((store)=> {
  return {calculations: store.calculations}
}, {calculateVolatility: calcActions.calculateVolatility, calculatePrice: calcActions.calculatePrice, submitCalculation: calcActions.submitInput})
export default class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeHandler1 = this.onChangeHandler1.bind(this);
    this.onChangeHandler2 = this.onChangeHandler2.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    this.formatters = [(value, prevValue) => {
      if (isNaN(Number(value))) {
        value = prevValue;
      }
      if (isNaN(Number(value)) || Number(value) < 0) {
        value = prevValue;
      }

      /*const val2Str = parseFloat(value.toString());
      return !!val2Str ? (isNaN(val2Str) ? '' : val2Str) : '';*/

      const valid = new RegExp('[0-9.]+').test(value.toString());
      return valid ? value : '';
    }]
  }

  submitHandler(event) {
    //this.setState({emphasized:!this.state.emphasized});
    const {lastInput, result} = this.props.calculations;

    this.props.submitCalculation(lastInput === 'price' ? result.price : result.volatility, lastInput);
  }



  onChangeHandler1(basicInputState) {
      this.props.calculatePrice(this.textBasicInput1.state.value);
  }

  onChangeHandler2(basicInputState) {
    this.props.calculateVolatility(this.textBasicInput2.state.value);
  }

  render() {
    const title = 'Calculation';

    console.log("this.props.calculations", this.props.calculations);

    const {lastInput, result, calcSubmit} = this.props.calculations;

    const {valid, price, volatility, errors} = result;

    const priceCardClass = classNames({
      'card alert': true,
      'alert-info': lastInput === 'price',
      'alert-success': lastInput === 'volatility' && !errors.length
    });
    const volaCardClass = classNames({
      'card alert': true,
      'alert-info': lastInput === 'volatility',
      'alert-success': lastInput === 'price' && !errors.length
    });

    const errorsElems = errors.map((error, index) => {
      return (
        <li class="list-group-item alert alert-danger" key={'errors' + index}>
          <span class="float-left" >{error}</span>
        </li>
      )
    });

    return (
      <div>
        <h3>{title}</h3>
        LOADING: {calcSubmit.loading ? 'TRUE' : 'FALSE'}
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <label>Volatility</label>
              <BasicInput ref={(input) => { this.textBasicInput1 = input; }}
                          onChangeHandler={this.onChangeHandler1}
                          changeBounce="100" value={volatility}
                          formatters={this.formatters}
                          class="form-control"

              />
            </div>
            <div class="col-md-3">
              <label>Price</label>
              <BasicInput ref={(input) => { this.textBasicInput2 = input; }}
                          onChangeHandler={this.onChangeHandler2}
                          changeBounce="100" value={price}
                          formatters={this.formatters}
                          class="form-control"

              />
            </div>
          </div>
          <div class="row" style={{height:'20px'}}></div>
          <div class="row">
            <div class="col-md-6">
              {errorsElems && errorsElems.length>0 && <ul class="list-group">{errorsElems}</ul>}
              <div class={volaCardClass}>Volatility: {result.volatility}</div><span class="fa fa-ok"></span>
              <div class={priceCardClass}>Price: {result.price}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <Button color="primary" onClick={this.submitHandler} disabled={!valid}>Submit</Button>

            </div>
          </div>
        </div>

      </div>
    )
  }
}