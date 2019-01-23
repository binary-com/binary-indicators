import { takeField } from './math';
import { exponentialMovingAverageArray } from './exponentialMovingAverage';

type CandleField = 'open' | 'high' | 'low' | 'close';

type MacdConfig = {
    fastEmaPeriod: number,
    slowEmaPeriod: number,
    signalEmaPeriod: number,
    field?: CandleField,
    pipSize: number,
};

type MacdEntry = number[];

const paddingLeft = (data: any[], length: number): any[] => {
    const arr = [];
    arr.length = length - data.length;
    arr.fill(0);
    return [...arr, ...data];
};

const macdArray = (data: Candle[], config: MacdConfig): MacdEntry[] => {
    const { field, fastEmaPeriod = 12, slowEmaPeriod = 26,
        signalEmaPeriod = 9, pipSize = 2 } = config;

    const vals = takeField(data, field);

    const length = vals.length;

    const fastEmaArray = paddingLeft(
        exponentialMovingAverageArray(
            vals,
            { periods: fastEmaPeriod, pipSize: 20, field }
        // -------------------------- ^ set pipSize to 20 to prevent rounding
        )
        , length);
    const slowEmaArray = paddingLeft(
        exponentialMovingAverageArray(
            vals,
            { periods: slowEmaPeriod, pipSize: 20, field }
        )
        , length);

    const macdCalcArray = paddingLeft(
        slowEmaArray.map(
            (x, i) => +(fastEmaArray[i] - x).toFixed(pipSize)
        )
        , length);

    const signalEmaArray = paddingLeft(
        exponentialMovingAverageArray(
            macdCalcArray.slice(slowEmaPeriod - 1),
            { periods: signalEmaPeriod, pipSize: 20, field }
        )
        , length);

    return macdCalcArray.map((x, i) =>
        [+(x - signalEmaArray[i]).toFixed(pipSize), x, +(signalEmaArray[i].toFixed(pipSize))])
        .slice(slowEmaPeriod + signalEmaPeriod - 2)
    ;
};

export default macdArray;
