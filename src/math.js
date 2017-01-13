export const takeField = (arr: any[], field?: string): any[] =>
    arr.map((x: any) => field ? x[field] : x);

export const takeLast = (arr: any[], n: number, field?: string): any[] =>
    takeField(arr
        .slice(n > arr.length ? 0 : arr.length - n, arr.length), field);

export const sum = (data: number[]): number =>
    data.reduce((acc: number, x) => acc + x);

export const mean = (data: number[]): number =>
    data.reduce((a, b) => a + b) / data.length;

export const stddev = (data: number[]): number => {
    const dataMean = mean(data);
    const sqDiff = data.map(n => Math.pow(n - dataMean, 2));
    const avgSqDiff = mean(sqDiff);
    return Math.sqrt(avgSqDiff);
};
