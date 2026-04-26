import { Vector } from './vector.js';
import { Matrix } from './matrix.js';
import { vectorMin, vectorMax, vectorArgMin, vectorArgMax } from '../kernels/extrema.js';

export const statistics = {
  sum: (arr: Vector | Matrix): number => {
    let sum0 = 0;
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    const data = arr.data;
    const len = data.length;
    if (len === 0) return 0;
    
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
    if (arr.length === 0) return NaN;
    return statistics.sum(arr) / arr.length;
  },

  variance: (arr: Vector | Matrix): number => {
    const data = arr.data;
    const n = data.length;
    if (n === 0) return NaN;
    if (n === 1) return 0;
    
    let count = 0;
    let mean = 0;
    let m2 = 0;
    for (let i = 0; i < n; i++) {
      count++;
      const x = data[i];
      const delta = x - mean;
      mean += delta / count;
      const delta2 = x - mean;
      m2 += delta * delta2;
    }
    return m2 / n;
  },

  std: (arr: Vector | Matrix): number => {
    return Math.sqrt(statistics.variance(arr));
  },

  min: (arr: Vector | Matrix): number => {
    return vectorMin(arr.data, arr.length);
  },

  max: (arr: Vector | Matrix): number => {
    return vectorMax(arr.data, arr.length);
  },

  argmin: (arr: Vector | Matrix): number => {
    return vectorArgMin(arr.data, arr.length);
  },

  argmax: (arr: Vector | Matrix): number => {
    return vectorArgMax(arr.data, arr.length);
  }
};
