import { NDArray } from './ndarray.js';
import { DType, TypedArray, getTypedArrayConstructor, promoteTypes } from '../core/dtype.js';
import { vectorAdd, vectorSubtract, vectorMultiply } from '../kernels/vector.js';
import { matrixMultiply, matrixTranspose } from '../kernels/matrix.js';
import { vectorAddScalar, vectorSubtractScalar, vectorMultiplyScalar } from '../kernels/scalar.js';
import { Vector } from './vector.js';

export class Matrix extends NDArray {
  public readonly rows: number;
  public readonly cols: number;

  constructor(data: number[][] | number[] | TypedArray, shape?: [number, number], dtype: DType = 'float64') {
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const rows = data.length;
      const cols = (data[0] as number[]).length;
      const flatData = (data as number[][]).flat();
      super(flatData, dtype, [rows, cols]);
      this.rows = rows;
      this.cols = cols;
    } else if (shape) {
      super(data as number[] | TypedArray, dtype, shape);
      this.rows = shape[0];
      this.cols = shape[1];
    } else {
      throw new Error('Shape must be provided for flat data');
    }
  }

  add(other: Matrix | number): Matrix {
    const resDType = typeof other === 'number' ? this.dtype : promoteTypes(this.dtype, other.dtype);
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = new Constructor(this.length);
    if (typeof other === 'number') {
      vectorAddScalar(this.data, other, outData, this.length);
    } else {
      vectorAdd(this.data, other.data, outData, this.length);
    }
    return new Matrix(outData, [this.rows, this.cols], resDType);
  }

  subtract(other: Matrix | number): Matrix {
    const resDType = typeof other === 'number' ? this.dtype : promoteTypes(this.dtype, other.dtype);
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = new Constructor(this.length);
    if (typeof other === 'number') {
      vectorSubtractScalar(this.data, other, outData, this.length);
    } else {
      vectorSubtract(this.data, other.data, outData, this.length);
    }
    return new Matrix(outData, [this.rows, this.cols], resDType);
  }

  multiply(other: Matrix | number): Matrix {
    const resDType = typeof other === 'number' ? this.dtype : promoteTypes(this.dtype, other.dtype);
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = new Constructor(this.length);
    if (typeof other === 'number') {
      vectorMultiplyScalar(this.data, other, outData, this.length);
    } else {
      vectorMultiply(this.data, other.data, outData, this.length);
    }
    return new Matrix(outData, [this.rows, this.cols], resDType);
  }

  dot(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(`Incompatible shapes for matrix multiplication: ${this.rows}x${this.cols} and ${other.rows}x${other.cols}`);
    }
    const resDType = promoteTypes(this.dtype, other.dtype);
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = new Constructor(this.rows * other.cols);
    matrixMultiply(this.data, other.data, outData, this.rows, this.cols, other.cols);
    return new Matrix(outData, [this.rows, other.cols], resDType);
  }

  transpose(): Matrix {
    const Constructor = getTypedArrayConstructor(this.dtype);
    const outData = new Constructor(this.length);
    matrixTranspose(this.data, outData, this.rows, this.cols);
    return new Matrix(outData, [this.cols, this.rows], this.dtype);
  }

  reshape(rows: number, cols: number): Matrix {
    if (rows * cols !== this.length) {
      throw new Error(`Cannot reshape matrix of size ${this.length} into ${rows}x${cols}`);
    }
    return new Matrix(this.data, [rows, cols], this.dtype);
  }

  flatten(): Vector {
    return new Vector(this.data, this.dtype);
  }

  toArray2D(): number[][] {
    const arr: number[][] = [];
    for (let i = 0; i < this.rows; i++) {
      arr.push(Array.from(this.data.slice(i * this.cols, (i + 1) * this.cols)));
    }
    return arr;
  }
}
