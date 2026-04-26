import { TypedArray } from '../core/dtype.js';

export function vectorSqrt(a: TypedArray, out: TypedArray, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = Math.sqrt(a[i]);
    out[i + 1] = Math.sqrt(a[i + 1]);
    out[i + 2] = Math.sqrt(a[i + 2]);
    out[i + 3] = Math.sqrt(a[i + 3]);
  }
  for (; i < length; i++) {
    out[i] = Math.sqrt(a[i]);
  }
}

export function vectorExp(a: TypedArray, out: TypedArray, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = Math.exp(a[i]);
    out[i + 1] = Math.exp(a[i + 1]);
    out[i + 2] = Math.exp(a[i + 2]);
    out[i + 3] = Math.exp(a[i + 3]);
  }
  for (; i < length; i++) {
    out[i] = Math.exp(a[i]);
  }
}

export function vectorLog(a: TypedArray, out: TypedArray, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = Math.log(a[i]);
    out[i + 1] = Math.log(a[i + 1]);
    out[i + 2] = Math.log(a[i + 2]);
    out[i + 3] = Math.log(a[i + 3]);
  }
  for (; i < length; i++) {
    out[i] = Math.log(a[i]);
  }
}
