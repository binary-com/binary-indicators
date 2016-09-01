import { expect } from 'chai';
import simpleMovingAverage from '../simpleMovingAverage';

describe('simpleMovingAverage', () => {
    it('calcs', () => {
        const result = simpleMovingAverage([11, 12, 13, 14, 15, 16, 17], { period: 5 });
        expect(result).to.deep.equal([13, 14, 15]);
    });
});
