import { Vector } from './vector.js';
import { Matrix } from './matrix.js';

export const statistics = {
  sum: (arr: Vector | Matrix): number => {
    let sum0 = 0;
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    const data = arr.data;
    const len = data.length;
    let i = 0;
    for (; i <= len - 4; i += 4) {
      sum0 += data[i];
      sum1 += data[i + 1];
      sum2 += data[i + 2];
      sum3 += data[i + 3];
    }
    let sum = sum0 + sum1 + sum2 + sum3;
    for (; i < len; i++) {
      sum += data[i];
    }
    return sum;
  },
  mean: (arr: Vector | Matrix): number => {
    return statistics.sum(arr) / arr.length;
  }
};
