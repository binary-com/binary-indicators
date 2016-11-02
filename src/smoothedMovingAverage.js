import simpleMovingAverage from './simpleMovingAverage';
import { readField } from './math';

type CandleField = 'open' | 'high' | 'low' | 'close';

type SmoothedMovingAverageConfig = {
    periods: number,
    field?: CandleField,
    pipSize?: number,
};

const smoothedMovingAverage = (data: Candle[], config: SmoothedMovingAverageConfig): number => {
    const { periods, field, pipSize = 2 } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const vals = readField(data, field);
    let smma = simpleMovingAverage(vals.slice(0, periods), { periods });

    for (const close of vals.slice(periods)) {
        const prevSum = smma * periods;
        smma = ((prevSum - smma) + close) / periods;
    }

    return +smma.toFixed(pipSize);
};

export default smoothedMovingAverage;
