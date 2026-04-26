import { Vector } from './vector.js';
import { Matrix } from './matrix.js';
import { DType, getTypedArrayConstructor } from '../core/dtype.js';

export const creation = {
  zeros: (shape: number | [number, number], dtype: DType = 'float64'): Vector | Matrix => {
    if (typeof shape === 'number') {
      const Constructor = getTypedArrayConstructor(dtype);
      return new Vector(new Constructor(shape), dtype);
    } else {
      const Constructor = getTypedArrayConstructor(dtype);
      return new Matrix(new Constructor(shape[0] * shape[1]), shape, dtype);
    }
  },

  ones: (shape: number | [number, number], dtype: DType = 'float64'): Vector | Matrix => {
    const arr = creation.zeros(shape, dtype);
    arr.data.fill(1);
    return arr;
  },

  eye: (n: number, m?: number, dtype: DType = 'float64'): Matrix => {
    const cols = m ?? n;
    const Constructor = getTypedArrayConstructor(dtype);
    const data = new Constructor(n * cols);
    for (let i = 0; i < Math.min(n, cols); i++) {
      data[i * cols + i] = 1;
    }
    return new Matrix(data, [n, cols], dtype);
  },

  arange: (start: number, stop?: number, step: number = 1, dtype: DType = 'float64'): Vector => {
    let _start = start;
    let _stop = stop;
    if (_stop === undefined) {
      _stop = start;
      _start = 0;
    }
    const length = Math.max(Math.ceil((_stop - _start) / step), 0);
    const Constructor = getTypedArrayConstructor(dtype);
    const data = new Constructor(length);
    let i = 0;
    for (; i <= length - 4; i += 4) {
      data[i] = _start + i * step;
      data[i + 1] = _start + (i + 1) * step;
      data[i + 2] = _start + (i + 2) * step;
      data[i + 3] = _start + (i + 3) * step;
    }
    for (; i < length; i++) {
      data[i] = _start + i * step;
    }
    return new Vector(data, dtype);
  },

  linspace: (start: number, stop: number, num: number = 50, dtype: DType = 'float64'): Vector => {
    const Constructor = getTypedArrayConstructor(dtype);
    const data = new Constructor(num);
    if (num <= 0) return new Vector(data, dtype);
    if (num === 1) {
      data[0] = start;
      return new Vector(data, dtype);
    }
    const step = (stop - start) / (num - 1);
    let i = 0;
    for (; i <= num - 4; i += 4) {
      data[i] = start + i * step;
      data[i + 1] = start + (i + 1) * step;
      data[i + 2] = start + (i + 2) * step;
      data[i + 3] = start + (i + 3) * step;
    }
    for (; i < num; i++) {
      data[i] = start + i * step;
    }
    return new Vector(data, dtype);
  }
};
