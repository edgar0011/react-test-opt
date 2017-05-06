import calcReducer from '../app/src/reducers/calcReducer';
import { CALCULATE_VOLATILITY, CALCULATE_PRICE } from '../app/src/config/CONSTANTS';

import { expect, assert } from 'chai';

describe('calcReducer', () => {
	describe('CALCULATE_VOLATILITY', () => {
		it('should CALCULATE_VOLATILITY', () => {
			const initialState = {result:{volatility:0, price:0, errors:[]}};
			const action = {
				type: CALCULATE_VOLATILITY,
				payload: {input:22}
			};
			const nextState = calcReducer(initialState, action);

			expect(nextState.result.volatility).to.be.above(0.511);

	  });

    it('should not CALCULATE_VOLATILITY', () => {
      const initialState = {result:{volatility:0, price:0, errors:[]}};
      const action = {
        type: CALCULATE_VOLATILITY,
        payload: {input:1}
      };
      const nextState = calcReducer(initialState, action);

      expect(nextState.result.volatility).to.be.NaN;

    });
  });

  describe('CALCULATE_PRICE', () => {
    it('should CALCULATE_PRICE', () => {
      const initialState = {result:{volatility:0, price:0, errors:[]}};
      const action = {
        type: CALCULATE_PRICE,
        payload: {input:0.1}
      };
      const nextState = calcReducer(initialState, action);

      expect(nextState.result.price).to.be.above(5.0808085);

    });

    it('should NOT CALCULATE_PRICE', () => {
      const initialState = {result:{volatility:0, price:0, errors:[]}};
      const action = {
        type: CALCULATE_PRICE,
        payload: {input:0}
      };
      const nextState = calcReducer(initialState, action);

      expect(nextState.result.price).to.be.NaN;

    });
  });
});
