type RelativeStrengthIndexConfig = {
    periods: number,
    field: 'open' | 'high' | 'low' | 'close',
    levels: number[],
};

export default (data: Candle[], config: RelativeStrengthIndexConfig) => {
    // TODO
};
