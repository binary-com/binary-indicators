type BollingerBandConfig = {
    periods: number,
    field: 'open' | 'high' | 'low' | 'close',
    type: 'SMA' | 'WMA' | 'EMA' | 'TEMA' | 'TRIMA',
    stdDevUp: number,
    stdDevDown: number
};

export default (data, config: BollingerBandConfig) => {
    // TODO
};
