import smoothedMovingAverage from '../smoothedMovingAverage';

describe('smoothedMovingAverage', () => {
    it('single value with periods of 1 equals the value', () => {
        const result = smoothedMovingAverage([1], { periods: 1 });
        expect(result).toEqual(1);
    });

    it('whole data sample', () => {
        const result = smoothedMovingAverage([1, 2, 3], { periods: 3 });
        expect(result).toEqual(2);
    });

    it('part of whole', () => {
        const data = [1, 2, 3, 4, 5, 6];
        const result = smoothedMovingAverage(data, { periods: 4 });
        expect(result).toEqual(3.84);
    });
});
