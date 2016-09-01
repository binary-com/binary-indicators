const sum = (arr: number[], valFunc) =>
    arr.reduce((acc, v) => acc + valFunc(v), 0);

export default data => {
    const n = data.length;
    const a = n * sum(data, v => v[0] * v[1]);
    const b = sum(data, v => v[0]) * sum(data, v => v[1]);
    const c = n * sum(data, v => v[0] ** 2);
    const d = sum(data, v => v[0]) ** 2;
    const slope = (a - b) / (c - d);
    console.log(n, a, b, c, d, slope);
    console.log(data[0][0], data[0][1], data[1][0], data[0][1] * slope);
};


export function linear (xData, yData, periods) {

    var		lineData = [],
            step1,
            step2 = 0,
            step3 = 0,
            step3a = 0,
            step3b = 0,
            step4 = 0,
            step5 = 0,
            step5a = 0,
            step6 = 0,
            step7 = 0,
            step8 = 0,
            step9 = 0,
            step10 = 0;


    // Step 1: The number of data points.
    step1 = xData.length;

    // Step 2: "step1" times the summation of all x-values multiplied by their corresponding y-values.
    // Step 3: Sum of all x-values times the sum of all y-values. 3a and b are used for storing data.
    // Step 4: "step1" times the sum of all squared x-values.
    // Step 5: The squared sum of all x-values. 5a stores data.
    // Step 6: Equation to calculate the slope of the regression line.
    // Step 7: The sum of all y-values.
    // Step 8: "step6" times the sum of all x-values (step5).
    // Step 9: The equation for the y-intercept of the trendline.
    for ( var i = 0; i < step1; i++) {
        step2 = (step2 + (xData[i] * yData[i]));
        step3a = (step3a + xData[i]);
        step3b = (step3b + yData[i]);
        step4 = (step4 + Math.pow(xData[i], 2));
        step5a = (step5a + xData[i]);
        step7 = (step7 + yData[i]);
    }
    step2 = (step1 * step2);
    step3 = (step3a * step3b);
    step4 = (step1 * step4);
    step5 = (Math.pow(step5a, 2));
    step6 = ((step2 - step3) / (step4 - step5));
    step8 = (step6 * step5a);
    step9 = ((step7 - step8) / step1);

    // Step 10: Plotting the trendline. Only two points are calulated.
    // The starting point.
    // This point will have values equal to the first X and Y value in the original dataset.
    lineData.push([xData[0] , yData[0]]);

    // Calculating the ending point.
    // The point X is equal the X in the original dataset.
    // The point Y is calculated using the function of a straight line and our variables found.
    step10 = ( ( step6 * xData[step1 - 1] ) + step9 );
    lineData.push([ ( xData[step1 - 1] ), step10 ]);

    return lineData;
}
