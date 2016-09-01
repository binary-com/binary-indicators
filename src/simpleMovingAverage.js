type SimpleMovingAverageConfig = {
    period: number,
    field: 'open' | 'high' | 'low' | 'close',
};

export default (data: Candle[], config: SimpleMovingAverageConfig): number => {
    const { period, field } = config;

    if (data.length < period) throw new Error("Can't calculate yet");

    // sum of last config.period / config

    return data[field];
};
