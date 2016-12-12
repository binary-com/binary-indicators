import relativeStrengthIndex from '../relativeStrengthIndex';

describe('relativeStrengthIndex', () => {
    it.skip('data with length less than or equal to periods is equal to 0', () => {
        const result = relativeStrengthIndex([1], { periods: 1 });
        expect(result).toEqual(0);
    });

    it.skip('ascending data (all wins) is equal to 0', () => {
        const result = relativeStrengthIndex([1, 2, 3, 4], { periods: 3 });
        expect(result).toEqual(0);
    });

    it.skip('descending data (all losses) is equal to 100', () => {
        const result = relativeStrengthIndex([4, 3, 2, 1], { periods: 3 });
        expect(result).toEqual(100);
    });

    it.skip('small data set', () => {
        const data = [1, 2, 3, 3.5, 2, 5];
        const result = relativeStrengthIndex(data, { periods: 3 });
        expect(result).toEqual([1, 1.5, 2.25, 3.125, 4.063]);
    });

    it.skip('real world', () => {
      const data = [
            44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.10, 45.42,
            45.84, 46.08, 45.89, 46.03, 45.61, 46.28, 46.28, 46.00, 46.03, 46.41,
            46.22, 45.64, 46.21, 46.25, 45.71, 46.45, 45.78, 45.35, 44.03, 44.18,
            44.22, 44.57, 43.42, 42.66, 43.13,
        ];
        const result = relativeStrengthIndex(data, { periods: 14 });
        expect(result).toEqual([
            70.53, 66.32, 66.55, 69.41, 66.36, 57.97, 62.93, 63.26, 56.06, 62.38,
            54.71, 50.42, 39.99, 41.46, 41.87, 45.46, 37.30, 33.08, 37.77,
        ]);
    });
});
