import { expect } from 'chai';
import simpleMovingAverage from '../simpleMovingAverage';

describe('simpleMovingAverage', () => {
    it('single value with periods of 1 equals the value', () => {
        const result = simpleMovingAverage([1], { periods: 1 });
        expect(result).to.equal(1);
    });

    it('whole data sample', () => {
        const result = simpleMovingAverage([1, 2, 3], { periods: 3 });
        expect(result).to.equal(2);
    });

    it('fractions', () => {
        const data = [28.93, 28.48, 28.44, 28.91, 28.48];
        const result = simpleMovingAverage(data, { periods: 5 });
        expect(result).to.be.within(28.64, 28.65);
    });

    it('throws if periods is longer than data length', () => {
        expect(() =>
            simpleMovingAverage([1, 2, 3], { periods: 5 })
        ).to.throw();
    });

    it('part of whole', () => {
        const result = simpleMovingAverage([1, 2, 3, 4, 5], { periods: 3 });
        expect(result).to.deep.equal(4);
    });

    it.skip('longer stuff', () => {
        const result = simpleMovingAverage([11, 12, 13, 14, 15, 16, 17], { periods: 5 });
        expect(result).to.deep.equal([13, 14, 15]);
    });

    it('can extract field', () => {
        const data = [
            { close: 1 },
            { close: 2 },
            { close: 3 },
        ];
        const result = simpleMovingAverage(data, { periods: 3, field: 'close' });
        expect(result).to.equal(2);
    });
});
