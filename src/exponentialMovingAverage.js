import { sequence } from 'binary-utils';
import { sum, takeLast, weightingMultiplier } from './math';

type CandleField = 'open' | 'high' | 'low' | 'close';

type ExponentialMovingAverageConfig = {
    periods: number,
    field?: CandleField,
};

const exponentialMovingAverage = (data: Candle[], config: ExponentialMovingAverageConfig): number => {
    const { periods, field } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const vals = takeLast(data, periods, field);

    if (data.length === periods) {
      return sum(vals) / periods;
    }

    const prev = exponentialMovingAverage(data.slice(0, data.length - 1), config);

    return (vals.slice(-1)[0] - prev) * weightingMultiplier + prev;
};

export const exponentialMovingAverageArray = (data: Candle[], config: ExponentialMovingAverageConf): number[] => {
    const { periods } = config;
    return sequence(data.length - periods + 1)
        .map((x, i) =>
            exponentialMovingAverage(data.slice(i, i + periods), config)
        );
};

export default exponentialMovingAverage;
