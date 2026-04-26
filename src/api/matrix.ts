import { NDArray } from './ndarray.js';
import { DType, TypedArray, getTypedArrayConstructor, promoteTypes } from '../core/dtype.js';
import { vectorAdd, vectorSubtract, vectorMultiply } from '../kernels/vector.js';
import { matrixMultiply, matrixTranspose } from '../kernels/matrix.js';
import { vectorAddScalar, vectorSubtractScalar, vectorMultiplyScalar } from '../kernels/scalar.js';
import { vectorGreaterScalar, vectorLessScalar, vectorEqualScalar, vectorClip } from '../kernels/logic.js';
import { 
  broadcastAddRow, broadcastAddCol, 
  broadcastSubtractRow, broadcastSubtractCol, 
  broadcastMultiplyRow, broadcastMultiplyCol 
} from '../kernels/broadcast.js';
import { canBroadcast, getBroadcastShape, areShapesEqual } from '../core/shape.js';
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

  private _performOp(
    other: Matrix | Vector | number, 
    opName: 'add' | 'subtract' | 'multiply',
    inPlace: boolean = false
  ): Matrix {
    const isScalar = typeof other === 'number';
    const otherDType = isScalar ? this.dtype : (other as NDArray).dtype;
    const resDType = promoteTypes(this.dtype, otherDType);
    
    const canDoInPlace = inPlace && resDType === this.dtype;
    const Constructor = getTypedArrayConstructor(resDType);
    const outData = canDoInPlace ? this.data : new Constructor(this.length);

    if (isScalar) {
      const val = other as number;
      if (opName === 'add') vectorAddScalar(this.data, val, outData, this.length);
      else if (opName === 'subtract') vectorSubtractScalar(this.data, val, outData, this.length);
      else vectorMultiplyScalar(this.data, val, outData, this.length);
      return canDoInPlace ? this : new Matrix(outData, [this.rows, this.cols], resDType);
    }

    const otherArr = other as NDArray;
    if (areShapesEqual(this.shape, otherArr.shape)) {
      if (opName === 'add') vectorAdd(this.data, otherArr.data, outData, this.length);
      else if (opName === 'subtract') vectorSubtract(this.data, otherArr.data, outData, this.length);
      else vectorMultiply(this.data, otherArr.data, outData, this.length);
      return canDoInPlace ? this : new Matrix(outData, [this.rows, this.cols], resDType);
    }

    if (!canBroadcast(this.shape, otherArr.shape)) {
      throw new Error(`Shapes [${this.shape}] and [${otherArr.shape}] are not broadcast-compatible`);
    }

    const resShape = getBroadcastShape(this.shape, otherArr.shape);
    if (inPlace && !areShapesEqual(this.shape, resShape)) {
      throw new Error('In-place operation not possible when broadcasting to a larger shape');
    }

    // Optimized 2D Broadcasting Paths
    if (otherArr instanceof Vector && otherArr.length === this.cols) {
      if (opName === 'add') broadcastAddRow(this.data, otherArr.data, outData, this.rows, this.cols);
      else if (opName === 'subtract') broadcastSubtractRow(this.data, otherArr.data, outData, this.rows, this.cols);
      else broadcastMultiplyRow(this.data, otherArr.data, outData, this.rows, this.cols);
    } else if (otherArr instanceof Matrix && otherArr.cols === 1 && otherArr.rows === this.rows) {
      if (opName === 'add') broadcastAddCol(this.data, otherArr.data, outData, this.rows, this.cols);
      else if (opName === 'subtract') broadcastSubtractCol(this.data, otherArr.data, outData, this.rows, this.cols);
      else broadcastMultiplyCol(this.data, otherArr.data, outData, this.rows, this.cols);
    } else {
      throw new Error(`Broadcasting between [${this.shape}] and [${otherArr.shape}] is not yet optimized.`);
    }

    return canDoInPlace ? this : new Matrix(outData, resShape as [number, number], resDType);
  }

  add(other: Matrix | Vector | number): Matrix { return this._performOp(other, 'add'); }
  subtract(other: Matrix | Vector | number): Matrix { return this._performOp(other, 'subtract'); }
  multiply(other: Matrix | Vector | number): Matrix { return this._performOp(other, 'multiply'); }

  add_(other: Matrix | Vector | number): Matrix { return this._performOp(other, 'add', true); }
  subtract_(other: Matrix | Vector | number): Matrix { return this._performOp(other, 'subtract', true); }
  multiply_(other: Matrix | Vector | number): Matrix { return this._performOp(other, 'multiply', true); }

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

  copy(): Matrix {
    return new Matrix(this._cloneBuffer(), [this.rows, this.cols], this.dtype);
  }

  slice(rowStart: number, rowEnd?: number): Matrix {
    const startRow = rowStart < 0 ? Math.max(0, this.rows + rowStart) : Math.min(this.rows, rowStart);
    let endRow = rowEnd === undefined ? this.rows : (rowEnd < 0 ? this.rows + rowEnd : rowEnd);
    endRow = Math.max(startRow, Math.min(this.rows, endRow));

    const start = startRow * this.cols;
    const end = endRow * this.cols;
    const slicedData = this.data.slice(start, end);
    const newRows = endRow - startRow;
    return new Matrix(slicedData, [newRows, this.cols], this.dtype);
  }

  greater(scalar: number): Matrix {
    const outData = new Uint8Array(this.length);
    vectorGreaterScalar(this.data, scalar, outData, this.length);
    return new Matrix(outData, [this.rows, this.cols], 'uint8');
  }

  less(scalar: number): Matrix {
    const outData = new Uint8Array(this.length);
    vectorLessScalar(this.data, scalar, outData, this.length);
    return new Matrix(outData, [this.rows, this.cols], 'uint8');
  }

  equal(scalar: number): Matrix {
    const outData = new Uint8Array(this.length);
    vectorEqualScalar(this.data, scalar, outData, this.length);
    return new Matrix(outData, [this.rows, this.cols], 'uint8');
  }

  clip(min: number, max: number): Matrix {
    const Constructor = getTypedArrayConstructor(this.dtype);
    const outData = new Constructor(this.length);
    vectorClip(this.data, min, max, outData, this.length);
    return new Matrix(outData, [this.rows, this.cols], this.dtype);
  }

  clip_(min: number, max: number): Matrix {
    vectorClip(this.data, min, max, this.data, this.length);
    return this;
  }

  toArray2D(): number[][] {
    const arr: number[][] = [];
    for (let i = 0; i < this.rows; i++) {
      arr.push(Array.from(this.data.slice(i * this.cols, (i + 1) * this.cols)));
    }
    return arr;
  }
}
