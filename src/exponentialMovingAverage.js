import { sequence } from 'binary-utils';
import { takeLast, weightingMultiplier } from './math';

type CandleField = 'open' | 'high' | 'low' | 'close';

type ExponentialMovingAverageConfig = {
    periods: number,
    field?: CandleField,
    pipSize?: number,
};

const ema = (vals: [], periods: number) => {
    if (vals.length === 1) {
      return vals[0];
    }

    const prev = ema(vals.slice(0, vals.length - 1), periods);

    return (vals.slice(-1)[0] - prev) * weightingMultiplier(periods) + prev;
};

const exponentialMovingAverage = (data: Candle[], config: ExponentialMovingAverageConfig): number => {
    const { periods, field } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const vals = takeLast(data, periods, field);

    return ema(vals, periods);
};

export const exponentialMovingAverageArray = (data: Candle[], config: ExponentialMovingAverageConfig): number[] => {
    const { periods, pipSize = 2 } = config;
    return sequence(data.length - periods + 1)
        .map((x, i) =>
            +(exponentialMovingAverage(data.slice(i, i + periods), config).toFixed(pipSize))
        );
};

export default exponentialMovingAverage;
