import { NDArray } from './ndarray.js';
import { DType, TypedArray, getTypedArrayConstructor, promoteTypes } from '../core/dtype.js';
import { vectorAdd, vectorSubtract, vectorMultiply, vectorDot } from '../kernels/vector.js';
import { vectorAddScalar, vectorSubtractScalar, vectorMultiplyScalar } from '../kernels/scalar.js';
import { Matrix } from './matrix.js';

export class Vector extends NDArray {
  constructor(data: number[] | TypedArray, dtype: DType = 'float64') {
    super(data, dtype, [Array.isArray(data) ? data.length : (data as TypedArray).length]);
  }

  add(other: Vector | number): Vector {
    const resDType = typeof other === 'number' ? this.dtype : promoteTypes(this.dtype, other.dtype);
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = new Constructor(this.length);
    if (typeof other === 'number') {
      vectorAddScalar(this.data, other, outData, this.length);
    } else {
      vectorAdd(this.data, other.data, outData, this.length);
    }
    return new Vector(outData, resDType);
  }

  subtract(other: Vector | number): Vector {
    const resDType = typeof other === 'number' ? this.dtype : promoteTypes(this.dtype, other.dtype);
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = new Constructor(this.length);
    if (typeof other === 'number') {
      vectorSubtractScalar(this.data, other, outData, this.length);
    } else {
      vectorSubtract(this.data, other.data, outData, this.length);
    }
    return new Vector(outData, resDType);
  }

  multiply(other: Vector | number): Vector {
    const resDType = typeof other === 'number' ? this.dtype : promoteTypes(this.dtype, other.dtype);
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = new Constructor(this.length);
    if (typeof other === 'number') {
      vectorMultiplyScalar(this.data, other, outData, this.length);
    } else {
      vectorMultiply(this.data, other.data, outData, this.length);
    }
    return new Vector(outData, resDType);
  }

  dot(other: Vector): number {
    return vectorDot(this.data, other.data, this.length);
  }

  reshape(rows: number, cols: number): Matrix {
    if (rows * cols !== this.length) {
      throw new Error(`Cannot reshape vector of length ${this.length} into ${rows}x${cols}`);
    }
    // Shared memory: pass the same TypedArray
    return new Matrix(this.data, [rows, cols], this.dtype);
  }
}
