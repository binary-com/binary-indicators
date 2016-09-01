import { expect } from 'chai';
import exponentialMovingAverage, { weightingMultiplier } from '../exponentialMovingAverage';

describe('weightingMultiplier', () => {
    it('can be calculated', () => {
        expect(weightingMultiplier(10)).to.be.within(0.1818, 0.1819);
    });
});

describe('exponentialMovingAverage', () => {

});
