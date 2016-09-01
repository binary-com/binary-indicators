type RelativeStrengthIndexConfig = {
    period: number,
    field: 'open' | 'high' | 'low' | 'close',
    levels: number[],
};

export default (data, config: RelativeStrengthIndexConfig) => {
    // TODO
};
