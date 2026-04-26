import { TypedArray } from '../core/dtype.js';

export function vectorMin(a: TypedArray, length: number): number {
  if (length === 0) return NaN;
  let min = a[0];
  for (let i = 1; i < length; i++) {
    if (a[i] < min) min = a[i];
  }
  return min;
}

export function vectorMax(a: TypedArray, length: number): number {
  if (length === 0) return NaN;
  let max = a[0];
  for (let i = 1; i < length; i++) {
    if (a[i] > max) max = a[i];
  }
  return max;
}

export function vectorArgMin(a: TypedArray, length: number): number {
  if (length === 0) return -1;
  let min = a[0];
  let idx = 0;
  for (let i = 1; i < length; i++) {
    if (a[i] < min) {
      min = a[i];
      idx = i;
    }
  }
  return idx;
}

export function vectorArgMax(a: TypedArray, length: number): number {
  if (length === 0) return -1;
  let max = a[0];
  let idx = 0;
  for (let i = 1; i < length; i++) {
    if (a[i] > max) {
      max = a[i];
      idx = i;
    }
  }
  return idx;
}
