import { takeField, mean } from './math';

type CandleField = 'open' | 'high' | 'low' | 'close';

type ExponentialMovingAverageConfig = {
    periods: number,
    field?: CandleField,
    pipSize?: number,
};

const ema = (vals: [], periods: number, m) => {
    const weightingMultiplier = (2 / (periods + 1));
    return vals.length === 1 ?
        (vals[0] - m) * weightingMultiplier + m :
        vals.reduce((prev, e) => (e - prev) * weightingMultiplier + prev, m);
};

const exponentialMovingAverage = (data: Candle[], config: ExponentialMovingAverageConfig): number => {
    const { periods, field } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const vals = takeField(data.slice(periods), field);

    const initVal = mean(takeField(data.slice(0, periods), field));

    return ema(vals, periods, initVal);
};

export const exponentialMovingAverageArray = (data: Candle[], config: ExponentialMovingAverageConfig): number[] => {
    const { periods, pipSize = 2 } = config;
    let initVal = +(exponentialMovingAverage(data.slice(0, periods), config).toFixed(pipSize));
    return data.slice(periods - 1).map((x, i) =>
        !i ? initVal :
        +((initVal = ema([x], periods, initVal)).toFixed(pipSize))
    );
};

export default exponentialMovingAverage;
