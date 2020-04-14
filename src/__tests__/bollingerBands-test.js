import bollingerBands, { bollingerBandsArray } from '../bollingerBands';

const roundResult = (result: number[]): number[] => [
    Math.round(result[0] * 100) / 100,
    Math.round(result[1] * 100) / 100,
    Math.round(result[2] * 100) / 100,
];

describe('bollingerBands', () => {
    it('single value with periods of 1 equals the value', () => {
        const result = bollingerBands([5], { periods: 1 });
        expect(result).toEqual([5, 5, 5]);
    });

    it('whole data sample', () => {
        const result = bollingerBands([1, 2, 3], { periods: 3 });
        const roundedResult = roundResult(result);
        expect(roundedResult).toEqual([2, 3.63, 0.37]);
    });

    it('can extract field', () => {
        const data = [
            { close: 1 },
            { close: 2 },
            { close: 3 },
        ];
        const result = bollingerBands(data, { periods: 3, field: 'close' });
        const roundedResult = roundResult(result);
        expect(roundedResult).toEqual([2, 3.63, 0.37]);
    });

    it('fractions', () => {
        const data = [28.93, 28.48, 28.44, 28.91, 28.48];
        const result = bollingerBands(data, { periods: 5 });
        const roundedResult = roundResult(result);
        expect(roundedResult).toEqual([28.65, 29.09, 28.20]);
    });

    it('throws if periods is longer than data length', () => {
        expect(() => bollingerBands([1, 2, 3], { periods: 5 })).toThrow();
    });

    it('array', () => {
        const data = [1, 2, 5, 8, 10];
        const expected = [
            [2.67, 6.07, -0.73],
            [5, 9.90, 0.10],
            [7.67, 11.78, 3.56],
        ];
        const result = bollingerBandsArray(data, { periods: 3 });
        const roundedResult = result.map(x => roundResult(x));
        expect(roundedResult).toEqual(expected);
    });

    it('real world', () => {
        const data = [
            86.16, 89.09, 88.78, 90.32, 89.07, 91.15, 89.44, 89.18, 86.93, 87.68,
            86.96, 89.43, 89.32, 88.72, 87.45, 87.26, 89.50, 87.90, 89.13, 90.70,
            92.90, 92.98, 91.80, 92.66, 92.68, 92.30, 92.77, 92.54, 92.95, 93.20,
            91.07, 89.83, 89.74, 90.40, 90.74, 88.02, 88.09, 88.84, 90.78, 90.54, 91.39, 90.65];

        const middleBand = [
            88.71, 89.05, 89.24, 89.39, 89.51, 89.69, 89.75, 89.91, 90.08, 90.38,
            90.66, 90.86, 90.88, 90.90, 90.99, 91.15, 91.19, 91.12, 91.17, 91.25, 91.24, 91.17, 91.05];

        const upperBand = [
            91.29, 91.95, 92.61, 92.93, 93.31, 93.73, 93.90, 94.26, 94.56, 94.79,
            95.04, 94.91, 94.90, 94.89, 94.86, 94.67, 94.55, 94.68, 94.57, 94.53, 94.53, 94.37, 94.15];

        const lowerBand = [
            86.13, 86.14, 85.87, 85.85, 85.70, 85.65, 85.59, 85.56, 85.60, 85.98,
            86.27, 86.82, 86.86, 86.91, 87.12, 87.63, 87.83, 87.56, 87.76, 87.97, 87.95, 87.96, 87.95];

        const wholeBand = middleBand.map((x, i) => [middleBand[i], upperBand[i], lowerBand[i]]);

        const result = bollingerBandsArray(data, { periods: 20 });
        const roundedResult = result.map(x => roundResult(x));

        expect(roundedResult).toEqual(wholeBand);
    });
});
