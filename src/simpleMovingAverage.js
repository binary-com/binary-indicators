import { sequence } from 'binary-utils';
import { sum, takeLast } from './math';

type CandleField = 'open' | 'high' | 'low' | 'close';

type SimpleMovingAverageConfig = {
    periods: number,
    field?: CandleField,
    pipSize?: number,
};

const simpleMovingAverage = (data: Candle[], config: SimpleMovingAverageConfig): number => {
    const { periods, field } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const vals = takeLast(data, periods, field);

    return sum(vals) / periods;
};

export const simpleMovingAverageArray = (data: Candle[], config: SimpleMovingAverageConfig): number[] => {
    const { periods, pipSize = 2 } = config;
    return sequence(data.length - periods + 1)
        .map((x, i) =>
            +(simpleMovingAverage(data.slice(i, i + periods), config).toFixed(pipSize))
        );
};

export default simpleMovingAverage;
