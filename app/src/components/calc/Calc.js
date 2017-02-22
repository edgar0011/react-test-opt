/**
 * Created by edgar on 11/01/2017.
 */
import React from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';

import BasicInput from '../ui/BasicInput';

import * as calcActions from '../../actions/calcActions';


@connect((store)=> {
  return {calculations: store.calculations}
}, {calculateVolatility: calcActions.calculateVolatility, calculatePrice: calcActions.calculatePrice})
export default class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result:{volatility:0, price:0, errorMessages:[]},
      lastInput:null,
      valid:false
    };

    this.onChangeHandler1 = this.onChangeHandler1.bind(this);
    this.onChangeHandler2 = this.onChangeHandler2.bind(this);

    this.formatters = [(value, prevValue) => {
      if (isNaN(Number(value))) {
        value = prevValue;
      }
      if (isNaN(Number(value)) || Number(value) < 0) {
        value = prevValue;
      }

      const val2Str = parseFloat(value.toString());
      return !!val2Str ? (isNaN(val2Str) ? '' : val2Str) : '';
    }]
  }

  submitHandler(event) {
    //this.setState({emphasized:!this.state.emphasized});
  }



  onChangeHandler1(basicInputState) {
      this.props.calculatePrice(this.textBasicInput1.state.value);
      this.setState({lastInput:this.textBasicInput1});
  }

  onChangeHandler2(basicInputState) {
    this.props.calculateVolatility(this.textBasicInput2.state.value);
    this.setState({lastInput:this.textBasicInput2});
  }

  render() {
    const title = 'Todo';

    const errorMessages = this.state.result.errorMessages.map((errorMessage, index) => {
      return (
        <li class="list-group-item" key={'errorMessages' + index}>
          <span class="float-left" >{errorMessages.text}</span>
        </li>
      )
    });

    const disabledAdd1 = this.textBasicInput1 ? !this.textBasicInput1.state.value : false;
    const disabledAdd2 = this.textBasicInput2 ? !this.textBasicInput2.state.value : false;

    console.log(this.props.calculations);
    const {result} = this.props.calculations;
    const {valid} = result;

    if (this.state.lastInput && this.state.lastInput === this.textBasicInput1) {
      console.log("should update textBasicInput2");
    }

    if (this.state.lastInput && this.state.lastInput === this.textBasicInput2) {
      console.log("should update textBasicInput1");
    }

    return (
      <div>
        <h3>{title}</h3>

        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <BasicInput ref={(input) => { this.textBasicInput1 = input; }}
                          onChangeHandler={this.onChangeHandler1}
                          changeBounce="100" value={result.volatility}
                          formatters={this.formatters}

              />
            </div>
            <div class="col-md-6">
              <BasicInput ref={(input) => { this.textBasicInput2 = input; }}
                          onChangeHandler={this.onChangeHandler2}
                          changeBounce="100" value={result.price}
                          formatters={this.formatters}

              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              {errorMessages && errorMessages.length>0 && <ul class="list-group col-4">{errorMessages}</ul>}
              <span>Volatility: {result.volatility}</span>
              <span>Price: {result.price}</span>
            </div>
            <div class="col-md-6">
              <Button color="primary" onClick={this.submitHandler} disabled={!valid}>Submit</Button>

            </div>
          </div>
        </div>

      </div>
    )
  }
}