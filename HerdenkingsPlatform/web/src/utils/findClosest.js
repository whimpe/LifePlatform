export const findClosest = (arr, target) => {
    let min;
    let chosen = 0;
    for (let i in arr) {
       min = Math.abs(arr[chosen] - target);
       if (Math.abs(arr[i] - target) < min) {
          chosen = i;
       };
    };
    return chosen;
 };