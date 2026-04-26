import { Vector } from './vector.js';
import { Matrix } from './matrix.js';
import { DType, getTypedArrayConstructor } from '../core/dtype.js';

export const random = {
  vector: (length: number, dtype: DType = 'float64'): Vector => {
    const Constructor = getTypedArrayConstructor(dtype);
    const data = new Constructor(length);
    let i = 0;
    for (; i <= length - 4; i += 4) {
      data[i] = Math.random();
      data[i + 1] = Math.random();
      data[i + 2] = Math.random();
      data[i + 3] = Math.random();
    }
    for (; i < length; i++) {
      data[i] = Math.random();
    }
    return new Vector(data, dtype);
  },
  matrix: (rows: number, cols: number, dtype: DType = 'float64'): Matrix => {
    const Constructor = getTypedArrayConstructor(dtype);
    const len = rows * cols;
    const data = new Constructor(len);
    let i = 0;
    for (; i <= len - 4; i += 4) {
      data[i] = Math.random();
      data[i + 1] = Math.random();
      data[i + 2] = Math.random();
      data[i + 3] = Math.random();
    }
    for (; i < len; i++) {
      data[i] = Math.random();
    }
    return new Matrix(data, [rows, cols], dtype);
  }
};
