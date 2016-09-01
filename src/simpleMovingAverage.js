import { sequence } from 'binary-utils';

type SimpleMovingAverageConfig = {
    periods: number,
    field: 'open' | 'high' | 'low' | 'close',
};

const takeLast = (arr, n) =>
    arr.slice(arr.length - n, arr.length);

const sum = (data: number[]): number =>
    data.reduce((acc: number, x) => acc + x);

const simpleMovingAverage = (data: Candle[], config: SimpleMovingAverageConfig): number => {
    const { periods, field } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const vals = takeLast(data, periods).map((x: any) => field ? x[field] : x);

    return sum(vals) / periods;
};

export const simpleMovingAverageArray = (data: Candle[], config: SimpleMovingAverageConfig): number[] => {
    const { periods } = config;
    return sequence(data.length - periods + 1)
        .map((x, i) =>
            simpleMovingAverage(data.slice(i, i + periods), config)
        );
};

export default simpleMovingAverage;
