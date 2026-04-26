import { TypedArray } from '../core/dtype.js';

export function vectorAdd(
  a: TypedArray,
  b: TypedArray,
  out: TypedArray,
  length: number
): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] + b[i];
    out[i + 1] = a[i + 1] + b[i + 1];
    out[i + 2] = a[i + 2] + b[i + 2];
    out[i + 3] = a[i + 3] + b[i + 3];
  }
  for (; i < length; i++) {
    out[i] = a[i] + b[i];
  }
}

export function vectorSubtract(
  a: TypedArray,
  b: TypedArray,
  out: TypedArray,
  length: number
): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] - b[i];
    out[i + 1] = a[i + 1] - b[i + 1];
    out[i + 2] = a[i + 2] - b[i + 2];
    out[i + 3] = a[i + 3] - b[i + 3];
  }
  for (; i < length; i++) {
    out[i] = a[i] - b[i];
  }
}

export function vectorMultiply(
  a: TypedArray,
  b: TypedArray,
  out: TypedArray,
  length: number
): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] * b[i];
    out[i + 1] = a[i + 1] * b[i + 1];
    out[i + 2] = a[i + 2] * b[i + 2];
    out[i + 3] = a[i + 3] * b[i + 3];
  }
  for (; i < length; i++) {
    out[i] = a[i] * b[i];
  }
}

export function vectorDot(
  a: TypedArray,
  b: TypedArray,
  length: number
): number {
  let sum0 = 0;
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  let i = 0;
  for (; i <= length - 4; i += 4) {
    sum0 += a[i] * b[i];
    sum1 += a[i + 1] * b[i + 1];
    sum2 += a[i + 2] * b[i + 2];
    sum3 += a[i + 3] * b[i + 3];
  }
  let sum = sum0 + sum1 + sum2 + sum3;
  for (; i < length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}
