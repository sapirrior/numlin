import { TypedArray } from '../core/dtype.js';

export function matrixMultiply(
  a: TypedArray,
  b: TypedArray,
  out: TypedArray,
  m: number,
  n: number,
  p: number
): void {
  out.fill(0);
  for (let i = 0; i < m; i++) {
    const i_n = i * n;
    const i_p = i * p;
    
    let k = 0;
    // Unroll k by 4 for instruction level parallelism
    for (; k <= n - 4; k += 4) {
      const a_ik0 = a[i_n + k];
      const a_ik1 = a[i_n + k + 1];
      const a_ik2 = a[i_n + k + 2];
      const a_ik3 = a[i_n + k + 3];
      
      const k0_p = k * p;
      const k1_p = (k + 1) * p;
      const k2_p = (k + 2) * p;
      const k3_p = (k + 3) * p;
      
      for (let j = 0; j < p; j++) {
        out[i_p + j] += a_ik0 * b[k0_p + j] + 
                        a_ik1 * b[k1_p + j] + 
                        a_ik2 * b[k2_p + j] + 
                        a_ik3 * b[k3_p + j];
      }
    }
    
    // Cleanup k
    for (; k < n; k++) {
      const a_ik = a[i_n + k];
      const k_p = k * p;
      for (let j = 0; j < p; j++) {
        out[i_p + j] += a_ik * b[k_p + j];
      }
    }
  }
}

export function matrixTranspose(
  a: TypedArray,
  out: TypedArray,
  rows: number,
  cols: number
): void {
  for (let i = 0; i < rows; i++) {
    const i_cols = i * cols;
    for (let j = 0; j < cols; j++) {
      out[j * rows + i] = a[i_cols + j];
    }
  }
}
