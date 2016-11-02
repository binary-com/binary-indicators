import linearTrendline, { linear } from '../linearTrendline';

describe('linearTrendline', () => {
    it.skip('real', () => {
        const result = linearTrendline([[1, 3], [2, 5], [3, 6.5]]);
        expect(result).toEqual([[0, 0], [0, 0]]);
    });

    it.skip('empty list', () => {
        const result = linear([], []);
        expect(result).toEqual([[0, 0], [0, 0]]);
    });

    it('empty list', () => {
        const result = linear([1], [1]);
        expect(result).toEqual([[1, 1], [1, NaN]]);
    });

    it('todo 1', () => {
        const result = linear([1, 2, 3], [1, 2, 3]);
        expect(result).toEqual([[1, 1], [3, 3]]);
    });

    it('todo 2', () => {
        const result = linear([3, 5, 6.5], [1, 2, 3]);
        expect(result).toEqual([[3, 1], [6.5, 2.9459459459459456]]);
    });

    it('todo 3', () => {
        const result = linear([5, 1, 3], [1, 2, 3]);
        expect(result).toEqual([[5, 1], [3, 2]]);
    });
});
