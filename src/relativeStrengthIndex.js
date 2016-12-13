import { sequence } from 'binary-utils';
import { takeField } from './math';

type CandleField = 'open' | 'high' | 'low' | 'close';

type RelativeStrengthIndexConfig = {
    periods: number,
    field?: CandleField,
    pipSize?: number,
};

const calcGain = (q1, q2) => q2 > q1 ? q2 - q1 : 0;
const calcLoss = (q1, q2) => q2 < q1 ? q1 - q2 : 0;

const calcFirstAvgDiff = (vals, comp, periods) => {
    let prev;
    return vals.reduce((r, q, i) => {
        if (i === 1) {
            prev = r;
        }
        const diff = comp(prev, q);
        prev = q;
        return diff + (i === 1 ? 0 : r);
    }) / periods;
};


const calcSecondAvgDiff = (vals, comp, periods, initAvg) => {
    let prev;
    if (vals.length === 1) { // There is no data to calc avg
        return initAvg;
    }
    return vals.reduce((r, q, i) => {
        if (i === 1) {
            prev = r;
        }
        const diff = comp(prev, q);
        prev = q;
        const prevAvg = i === 1 ? initAvg : r;
        return ((prevAvg * (periods - 1)) + diff) / periods;
    });
};

const relativeStrengthIndex = (data: Candle[], config: RelativeStrengthIndexConfig): number => {
    const { periods, field } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    if (data.length === periods) {
        return 0;
    }

    const vals = takeField(data.slice(0, periods + 1), field);
    // include last element from above to calc diff
    const restSeq = takeField(data.slice(periods, data.length), field);

    const initAvgGain = calcFirstAvgDiff(vals, calcGain, periods);
    const initAvgLoss = calcFirstAvgDiff(vals, calcLoss, periods);

    const avgGain = calcSecondAvgDiff(restSeq, calcGain, periods, initAvgGain);
    const avgLoss = calcSecondAvgDiff(restSeq, calcLoss, periods, initAvgLoss);

    if (avgGain === 0) {
        return 0;
    } else if (avgLoss === 0) {
        return 100;
    }

    const RS = avgGain / avgLoss;

    return 100 - (100 / (1 + (RS)));
};

export const relativeStrengthIndexArray = (data: Candle[], config: RelativeStrengthIndexConfig): number[] => {
    const { periods, pipSize = 2 } = config;
    return sequence(data.length - periods)
        .map((x, i) =>
        +(relativeStrengthIndex(data.slice(0, i + periods + 1), config).toFixed(pipSize))
        );
};

export default relativeStrengthIndex;
