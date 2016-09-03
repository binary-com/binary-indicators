export const weightingMultiplier = (periods: number): number =>
    (2 / (periods + 1));

export const mean = (data: number[]): number =>
    data.reduce((a, b) => a + b) / data.length;

export const stddev = (data: number[]): number => {
    const dataMean = mean(data);
    const sqDiff = data.map(n => Math.pow(n - dataMean, 2));
    const avgSqDiff = mean(sqDiff);
    return Math.sqrt(avgSqDiff);
};
