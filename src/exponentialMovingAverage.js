import simpleMovingAverage from './simpleMovingAverage';

type CandleKeys = 'open' | 'high' | 'low' | 'close';

type ExponentialMovingAverageConfig = {
    periods: number,
    field: CandleKeys,
};

export const weightingMultiplier = (periods: number): number =>
    (2 / (periods + 1));

export default (data, config: ExponentialMovingAverageConfig) => {
    const { periods } = config;
    const sma = simpleMovingAverage(data, config);

    const multiplier = weightingMultiplier(periods);

    const prevEMA = EMA(previousDay);
    const ema = close - prevEMA * multiplier + prevEMA;
};
