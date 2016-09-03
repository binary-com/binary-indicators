import simpleMovingAverage from './simpleMovingAverage';

type CandleKeys = 'open' | 'high' | 'low' | 'close';

type ExponentialMovingAverageConfig = {
    periods: number,
    field: CandleKeys,
};

const EMA = (previousDay: number): number => 1;

export default (data: Candle[], config: ExponentialMovingAverageConfig) => {
    const { periods } = config;
    const sma = simpleMovingAverage(data, config);

    const multiplier = weightingMultiplier(periods);

    // const prevEMA = EMA(previousDay);
    // const ema = close - prevEMA * multiplier + prevEMA;

    return 0;
};
