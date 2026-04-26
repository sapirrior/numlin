import { TypedArray } from '../core/dtype.js';

export function vectorGreaterScalar(a: TypedArray, scalar: number, out: Uint8Array, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] > scalar ? 1 : 0;
    out[i + 1] = a[i + 1] > scalar ? 1 : 0;
    out[i + 2] = a[i + 2] > scalar ? 1 : 0;
    out[i + 3] = a[i + 3] > scalar ? 1 : 0;
  }
  for (; i < length; i++) {
    out[i] = a[i] > scalar ? 1 : 0;
  }
}

export function vectorLessScalar(a: TypedArray, scalar: number, out: Uint8Array, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] < scalar ? 1 : 0;
    out[i + 1] = a[i + 1] < scalar ? 1 : 0;
    out[i + 2] = a[i + 2] < scalar ? 1 : 0;
    out[i + 3] = a[i + 3] < scalar ? 1 : 0;
  }
  for (; i < length; i++) {
    out[i] = a[i] < scalar ? 1 : 0;
  }
}

export function vectorEqualScalar(a: TypedArray, scalar: number, out: Uint8Array, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = a[i] === scalar ? 1 : 0;
    out[i + 1] = a[i + 1] === scalar ? 1 : 0;
    out[i + 2] = a[i + 2] === scalar ? 1 : 0;
    out[i + 3] = a[i + 3] === scalar ? 1 : 0;
  }
  for (; i < length; i++) {
    out[i] = a[i] === scalar ? 1 : 0;
  }
}

export function vectorClip(a: TypedArray, min: number, max: number, out: TypedArray, length: number): void {
  let i = 0;
  for (; i <= length - 4; i += 4) {
    out[i] = Math.min(Math.max(a[i], min), max);
    out[i + 1] = Math.min(Math.max(a[i + 1], min), max);
    out[i + 2] = Math.min(Math.max(a[i + 2], min), max);
    out[i + 3] = Math.min(Math.max(a[i + 3], min), max);
  }
  for (; i < length; i++) {
    out[i] = Math.min(Math.max(a[i], min), max);
  }
}
