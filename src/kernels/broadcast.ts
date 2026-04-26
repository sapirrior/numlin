import { TypedArray } from '../core/dtype.js';

/**
 * Row-wise Broadcasting: Matrix (m, n) op Vector (n)
 * Each element of the vector is applied to every row of the matrix.
 */
export function broadcastAddRow(a: TypedArray, b: TypedArray, out: TypedArray, m: number, n: number): void {
  for (let i = 0; i < m; i++) {
    const offset = i * n;
    let j = 0;
    for (; j <= n - 4; j += 4) {
      out[offset + j] = a[offset + j] + b[j];
      out[offset + j + 1] = a[offset + j + 1] + b[j + 1];
      out[offset + j + 2] = a[offset + j + 2] + b[j + 2];
      out[offset + j + 3] = a[offset + j + 3] + b[j + 3];
    }
    for (; j < n; j++) {
      out[offset + j] = a[offset + j] + b[j];
    }
  }
}

export function broadcastSubtractRow(a: TypedArray, b: TypedArray, out: TypedArray, m: number, n: number): void {
  for (let i = 0; i < m; i++) {
    const offset = i * n;
    let j = 0;
    for (; j <= n - 4; j += 4) {
      out[offset + j] = a[offset + j] - b[j];
      out[offset + j + 1] = a[offset + j + 1] - b[j + 1];
      out[offset + j + 2] = a[offset + j + 2] - b[j + 2];
      out[offset + j + 3] = a[offset + j + 3] - b[j + 3];
    }
    for (; j < n; j++) {
      out[offset + j] = a[offset + j] - b[j];
    }
  }
}

export function broadcastMultiplyRow(a: TypedArray, b: TypedArray, out: TypedArray, m: number, n: number): void {
  for (let i = 0; i < m; i++) {
    const offset = i * n;
    let j = 0;
    for (; j <= n - 4; j += 4) {
      out[offset + j] = a[offset + j] * b[j];
      out[offset + j + 1] = a[offset + j + 1] * b[j + 1];
      out[offset + j + 2] = a[offset + j + 2] * b[j + 2];
      out[offset + j + 3] = a[offset + j + 3] * b[j + 3];
    }
    for (; j < n; j++) {
      out[offset + j] = a[offset + j] * b[j];
    }
  }
}

/**
 * Column-wise Broadcasting: Matrix (m, n) op Matrix (m, 1) or Vector (m)
 * Each element of the column vector is applied to every element in the corresponding row.
 */
export function broadcastAddCol(a: TypedArray, b: TypedArray, out: TypedArray, m: number, n: number): void {
  for (let i = 0; i < m; i++) {
    const offset = i * n;
    const val = b[i];
    let j = 0;
    for (; j <= n - 4; j += 4) {
      out[offset + j] = a[offset + j] + val;
      out[offset + j + 1] = a[offset + j + 1] + val;
      out[offset + j + 2] = a[offset + j + 2] + val;
      out[offset + j + 3] = a[offset + j + 3] + val;
    }
    for (; j < n; j++) {
      out[offset + j] = a[offset + j] + val;
    }
  }
}

export function broadcastSubtractCol(a: TypedArray, b: TypedArray, out: TypedArray, m: number, n: number): void {
  for (let i = 0; i < m; i++) {
    const offset = i * n;
    const val = b[i];
    let j = 0;
    for (; j <= n - 4; j += 4) {
      out[offset + j] = a[offset + j] - val;
      out[offset + j + 1] = a[offset + j + 1] - val;
      out[offset + j + 2] = a[offset + j + 2] - val;
      out[offset + j + 3] = a[offset + j + 3] - val;
    }
    for (; j < n; j++) {
      out[offset + j] = a[offset + j] - val;
    }
  }
}

export function broadcastMultiplyCol(a: TypedArray, b: TypedArray, out: TypedArray, m: number, n: number): void {
  for (let i = 0; i < m; i++) {
    const offset = i * n;
    const val = b[i];
    let j = 0;
    for (; j <= n - 4; j += 4) {
      out[offset + j] = a[offset + j] * val;
      out[offset + j + 1] = a[offset + j + 1] * val;
      out[offset + j + 2] = a[offset + j + 2] * val;
      out[offset + j + 3] = a[offset + j + 3] * val;
    }
    for (; j < n; j++) {
      out[offset + j] = a[offset + j] * val;
    }
  }
}
