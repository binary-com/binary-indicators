import { expect } from 'chai';
import exponentialMovingAverage, { weightingMultiplier } from '../exponentialMovingAverage';

describe('weightingMultiplier', () => {
    it('can be calculated', () => {
        expect(weightingMultiplier(10)).to.be.within(0.1818, 0.1819);
        expect(weightingMultiplier(20)).to.be.within(0.0952, 0.0953);
    });
});

describe('exponentialMovingAverage', () => {

});

const data = [22.27, 22.19, 22.08, 22.17, 22.18, 22.13, 22.23, 22.43, 22.24, 22.29,
    22.15, 22.39, 22.38, 22.61, 23.36, 24.05, 23.75, 23.83, 23.95, 23.63, 23.82,
    23.87, 23.65, 23.19, 23.10, 23.33, 22.68, 23.10, 22.40, 22.17];

const sma10days = [22.22, 22.21, 22.23, 22.26, 22.31, 22.42, 22.61, 22.77, 22.91,
    23.08, 23.21, 23.38, 23.53, 23.65, 23.71, 23.69, 23.61, 23.51, 23.43, 23.28, 23.13];

const ema10days = [22.22, 22.21, 22.24, 22.27, 22.33, 22.52, 22.80, 22.97, 23.13,
    23.28, 23.34, 23.43, 23.51, 23.54, 23.47, 23.40, 23.39, 23.26, 23.23, 23.08, 22.92];
