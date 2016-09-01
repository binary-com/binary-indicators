type ExponentialMovingAverageConfig = {
    periods: number,
    field: 'open' | 'high' | 'low' | 'close',
};

export const weightingMultiplier = (periods: number): number =>
    (2 / (periods + 1));

export default (data, config) => {
    // First, calculate the simple moving average.
    // An exponential moving average (EMA) has to start somewhere so a simple moving
    //  average is used as the previous period's EMA in the first calculation.

    // Second, calculate the weighting multiplier.

    // Third, calculate the exponential moving average.
    // The formula below is for a 10-day EMA.
};
