import { sequence } from 'binary-utils';
import { stddev, takeLast } from './math';
import simpleMovingAverage from './simpleMovingAverage';

type CandleField = 'open' | 'high' | 'low' | 'close';
type SmaType = 'SMA' | 'WMA' | 'EMA' | 'TEMA' | 'TRIMA';

type BollingerBandConfig = {
    periods: number,
    field?: CandleField,
    type: SmaType,
    stdDevUp: number,
    stdDevDown: number,
    pipSize: number,
};

type BollingerBandEntry = number[];

const bollingerBands = (data: Candle[], config: BollingerBandConfig): BollingerBandEntry => {
    const { periods = 20, field, stdDevUp = 2, stdDevDown = 2, pipSize = 2 } = config;
    const vals = takeLast(data, periods, field);
    const middle = simpleMovingAverage(vals, { periods });
    const stdDev = stddev(vals);
    const upper = middle + stdDev * stdDevUp;
    const lower = middle - stdDev * stdDevDown;

    return [
        +(middle.toFixed(pipSize)),
        +(upper.toFixed(pipSize)),
        +(lower.toFixed(pipSize)),
    ];
};

export const bollingerBandsArray = (data: Candle[], config: BollingerBandConfig): BollingerBandEntry[] => {
    const { periods } = config;
    return sequence(data.length - periods + 1)
        .map((x, i) =>
            bollingerBands(data.slice(i, i + periods), config)
        );
};

export default bollingerBands;
