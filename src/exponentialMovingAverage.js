import { takeField, mean } from './math';

type CandleField = 'open' | 'high' | 'low' | 'close';

type ExponentialMovingAverageConfig = {
    periods: number,
    field?: CandleField,
    pipSize?: number,
};

const exponentialMovingAverage = (data: Candle[], config: ExponentialMovingAverageConfig, initVal: number = 0): number => {
    const { periods, field, pipSize = 2 } = config;

    const weightingMultiplier = (2 / (periods + 1));

    const vals = takeField(data, field);

    if (initVal) {
        return ((vals[0] - initVal) * weightingMultiplier + initVal);
    }

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const meanVal = mean(takeField(data.slice(0, periods), field));

    return +(vals.slice(periods)
        .reduce((prev, e) => (e - prev) * weightingMultiplier + prev, meanVal)).toFixed(pipSize);
};

export const exponentialMovingAverageArray = (data: Candle[], config: ExponentialMovingAverageConfig): number[] => {
    const { periods } = config;

    let initVal = exponentialMovingAverage(data.slice(0, periods), config);

    return data.slice(periods - 1).map((x, i) =>
        !i ? initVal :
        (initVal = exponentialMovingAverage([x], config, initVal))
    );
};

export default exponentialMovingAverage;
