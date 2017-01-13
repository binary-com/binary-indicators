import macd, { macdArray } from '../relativeStrengthIndex';

describe('macd', () => {
    it.skip('single value with periods of 1 equals the value', () => {
        const result = macd([1], { periods: 1 });
        expect(result).toEqual(1);
    });

    it.skip('whole data sample', () => {
        const result = macd([1, 2, 3], { periods: 3 });
        // const roundedResult = roundResult(result);
        expect(result).toEqual(1);
    });

    it.skip('wuut2', () => {
        const data = [1, 2, 3, 4, 5];
        const result = macd(data, { periods: 3 });
        expect(result).toEqual([1, 1.5, 2.25, 3.125, 4.063]);
    });

    it.skip('real world', () => {
        const data = [
            26540.93, 26574.93, 26498.49, 26547.23, 26696.79, 26553.01, 26423.47, 26348.64, 26521.14, 26176.58,
            26025.18, 25758.54, 25873.91, 25888.34, 25687.72, 25748.18, 25811.65, 26039.01, 23742.05, 23459.51,
            23691.97, 23705.46, 23968.65, 24363.23, 24610.81, 24177.28, 23619.18, 23363.12, 23615.49, 23731.44,
            23685.2, 23669.79, 23323.84, 23244.4, 23300.12, 23318.93, 23803.01, 23748.53, 23679.97, 23428.94,
            23707.92,
        ];
        const expectedMacd = [
            -598.12, -663.09, -685.44, -663.66, -619.29, -612.05, -643.92, -681.98, -683.9, -668.36,
            -652.25, -633.43, -639.06, -642.53, -633.48, -617.67, -559.62, -512.12, -474.53, -459.7,
            -420.59,
        ];
        const expectedSignal = [
            -282.46, -340.28, -398.72, -451.7, -498.15, -543.35, -594.01, -630.3, -650.16, -657.97,
            -656.76, -650.98, -648.25, -650.83, -653.21, -650.29, -636.7, -617.61, -596.08, -574.68,
            -551.03,
        ];

        const expected = expectedMacd.map((x, i) => [x, expectedSignal[i]]);

        const result = macdArray(data, { fastEmaPeriod: 12, slowEmaPeriod: 26, signalSmaPeriod: 9 });
        const roundedResult = result.map(x => Math.round(x * 100) / 100);
        expect(roundedResult).toEqual(expected);
    });
});
