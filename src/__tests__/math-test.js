import { expect } from 'chai';
import { mean, stddev, sum, takeLast, weightingMultiplier } from '../math';

describe('math', () => {
    it('mean', () => {
        expect(mean([1, 2, 3])).to.equal(2);
        expect(mean([3, 2, 1])).to.equal(2);
    });

    it('stddev', () => {
        expect(stddev([1])).to.equal(0);
        expect(stddev([1, 2, 3])).to.be.within(0.8164, 0.8165);
        expect(stddev([3, 2, 1])).to.be.within(0.8164, 0.8165);

        const data20 = [91.80, 92.66, 92.68, 92.30, 92.77, 92.54, 92.95, 93.20, 91.07,
            89.83, 89.74, 90.40, 90.74, 88.02, 88.09, 88.84, 90.78, 90.54, 91.39, 90.65];
        expect(stddev(data20)).to.be.within(1.54, 1.55);
    });

    it('sum', () => {
        expect(sum([1, 2, 3])).to.equal(6);
        expect(sum([3, 2, 1])).to.equal(6);
        expect(sum([-10, 10, 0])).to.equal(0);
    });

    it('takeLast', () => {
        expect(takeLast([1], 1)).to.deep.equal([1]);
        expect(takeLast([1, 2, 3], 2)).to.deep.equal([2, 3]);
        expect(takeLast([1, 2, 3], 5)).to.deep.equal([1, 2, 3]);
        expect(takeLast([{ close: 123 }], 1, 'close')).to.deep.equal([123]);
    });

    it('weightingMultiplier', () => {
        expect(weightingMultiplier(10)).to.be.within(0.1818, 0.1819);
        expect(weightingMultiplier(20)).to.be.within(0.0952, 0.0953);
    });
});
