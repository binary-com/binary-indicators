import exponentialMovingAverage, { exponentialMovingAverageArray } from '../exponentialMovingAverage';

describe('exponentialMovingAverage', () => {
    it('single value with periods of 1 equals the value', () => {
        const result = exponentialMovingAverage([1], { periods: 1 });
        expect(result).toEqual(1);
    });

    it('whole data sample', () => {
        const result = exponentialMovingAverage([1, 2, 3], { periods: 3 });
        // const roundedResult = roundResult(result);
        expect(result).toEqual(2.25);
    });

    it('wuut2', () => {
        const data = [1, 2, 3, 4, 5];
        const result = exponentialMovingAverageArray(data, { periods: 3 });
        expect(result).toEqual([2.25, 3.25, 4.25]);
    });

    it('real world', () => {
        const data = [22.27, 22.19, 22.08, 22.17, 22.18, 22.13, 22.23, 22.43, 22.24, 22.29,
            22.15, 22.39, 22.38, 22.61, 23.36, 24.05, 23.75, 23.83, 23.95, 23.63, 23.82,
            23.87, 23.65, 23.19, 23.10, 23.33, 22.68, 23.10, 22.40, 22.17];
        const ema10days = [22.25, 22.22, 22.24, 22.28, 22.34, 22.52, 22.81,
            23.01, 23.13, 23.29, 23.33, 23.45, 23.53, 23.58, 23.61,
            23.61, 23.52, 23.38, 23.34, 23.13, 22.98];
        const result = exponentialMovingAverageArray(data, { periods: 10 });
        const roundedResult = result.map(x => Math.round(x * 100) / 100);
        expect(roundedResult).toEqual(ema10days);
    });
});
