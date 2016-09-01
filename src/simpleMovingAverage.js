type SimpleMovingAverageConfig = {
    periods: number,
    field: 'open' | 'high' | 'low' | 'close',
};

// const extractData = (data: Candle[], config: SimpleMovingAverageConfig): number[] =>

const takeLast = (arr, n) =>
    arr.slice(arr.length - n, arr.length);

const fieldMapper = (field: ?string) =>
    field ? x => x[field] : x => x;

const sum = (data: number): number =>
    data.reduce((acc: number, x) => acc + x);

const simpleMovingAverageSingle = (data: Candle[], config: SimpleMovingAverageConfig): number => {
    const { periods, field } = config;

    if (data.length < periods) {
        throw new Error('Periods longer than data length');
    }

    const vals = takeLast(data, periods).map(fieldMapper(field));

    return sum(vals) / periods;
};

export default (data: Candle[], config: SimpleMovingAverageConfig): number =>
    simpleMovingAverageSingle(data, config, 123);
