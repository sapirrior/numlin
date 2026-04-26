import { TypedArray } from '../core/dtype.js';

export function vectorAddScalar(a: TypedArray, scalar: number, out: TypedArray, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] + scalar;
    out[i + 1] = a[i + 1] + scalar;
    out[i + 2] = a[i + 2] + scalar;
    out[i + 3] = a[i + 3] + scalar;
  }
  for (; i < length; i++) {
    out[i] = a[i] + scalar;
  }
}

export function vectorSubtractScalar(a: TypedArray, scalar: number, out: TypedArray, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] - scalar;
    out[i + 1] = a[i + 1] - scalar;
    out[i + 2] = a[i + 2] - scalar;
    out[i + 3] = a[i + 3] - scalar;
  }
  for (; i < length; i++) {
    out[i] = a[i] - scalar;
  }
}

export function vectorMultiplyScalar(a: TypedArray, scalar: number, out: TypedArray, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] * scalar;
    out[i + 1] = a[i + 1] * scalar;
    out[i + 2] = a[i + 2] * scalar;
    out[i + 3] = a[i + 3] * scalar;
  }
  for (; i < length; i++) {
    out[i] = a[i] * scalar;
  }
}
