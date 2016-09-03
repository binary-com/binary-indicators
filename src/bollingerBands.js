import { sequence } from 'binary-utils';
import { stddev } from './math';
import simpleMovingAverage from './simpleMovingAverage';

type BollingerBandConfig = {
    periods: number,
    field: 'open' | 'high' | 'low' | 'close',
    type: 'SMA' | 'WMA' | 'EMA' | 'TEMA' | 'TRIMA',
    stdDevUp: number,
    stdDevDown: number
};

const bollingerBands = (data: Candle[], config: BollingerBandConfig): number[] => {
    const { periods = 20, field, stdDevUp = 2, stdDevDown = 2 } = config;
    const middle = simpleMovingAverage(data, { periods, field });
    const stdDev = stddev(data);
    const upper = middle + stdDev * stdDevUp;
    const lower = middle - stdDev * stdDevDown;

    return [middle, upper, lower];
};

export const bollingerBandsArray = (data: Candle[], config: BollingerBandConfig): number[] => {
    const { periods } = config;
    return sequence(data.length - periods + 1)
        .map((x, i) =>
            bollingerBands(data.slice(i, i + periods), config)
        );
};

export default bollingerBands;
