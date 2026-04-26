import { NDArray } from './ndarray.js';
import { DType, TypedArray, getTypedArrayConstructor, promoteTypes } from '../core/dtype.js';
import { vectorAdd, vectorSubtract, vectorMultiply, vectorDot } from '../kernels/vector.js';
import { vectorAddScalar, vectorSubtractScalar, vectorMultiplyScalar } from '../kernels/scalar.js';
import { vectorGreaterScalar, vectorLessScalar, vectorEqualScalar, vectorClip } from '../kernels/logic.js';
import { canBroadcast, areShapesEqual } from '../core/shape.js';
import { Matrix } from './matrix.js';

export class Vector extends NDArray {
  constructor(data: number[] | TypedArray, dtype: DType = 'float64') {
    super(data, dtype, [Array.isArray(data) ? data.length : (data as TypedArray).length]);
  }

  private _performOp(
    other: Vector | number, 
    opName: 'add' | 'subtract' | 'multiply',
    inPlace: boolean = false
  ): Vector {
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
    } else {
      const otherArr = other as NDArray;
      if (areShapesEqual(this.shape, otherArr.shape)) {
        if (opName === 'add') vectorAdd(this.data, otherArr.data, outData, this.length);
        else if (opName === 'subtract') vectorSubtract(this.data, otherArr.data, outData, this.length);
        else vectorMultiply(this.data, otherArr.data, outData, this.length);
      } else if (canBroadcast(this.shape, otherArr.shape)) {
        const val = otherArr.data[0];
        if (opName === 'add') vectorAddScalar(this.data, val, outData, this.length);
        else if (opName === 'subtract') vectorSubtractScalar(this.data, val, outData, this.length);
        else vectorMultiplyScalar(this.data, val, outData, this.length);
      } else {
        throw new Error(`Shapes [${this.shape}] and [${otherArr.shape}] are not broadcast-compatible`);
      }
    }
    return canDoInPlace ? this : new Vector(outData, resDType);
  }

  add(other: Vector | number): Vector { return this._performOp(other, 'add'); }
  subtract(other: Vector | number): Vector { return this._performOp(other, 'subtract'); }
  multiply(other: Vector | number): Vector { return this._performOp(other, 'multiply'); }

  add_(other: Vector | number): Vector { return this._performOp(other, 'add', true); }
  subtract_(other: Vector | number): Vector { return this._performOp(other, 'subtract', true); }
  multiply_(other: Vector | number): Vector { return this._performOp(other, 'multiply', true); }

  dot(other: Vector): number {
    return vectorDot(this.data, other.data, this.length);
  }

  reshape(rows: number, cols: number): Matrix {
    if (rows * cols !== this.length) {
      throw new Error(`Cannot reshape vector of length ${this.length} into ${rows}x${cols}`);
    }
    return new Matrix(this.data, [rows, cols], this.dtype);
  }

  copy(): Vector {
    return new Vector(this._cloneBuffer(), this.dtype);
  }

  slice(start: number, end?: number): Vector {
    const slicedData = this.data.slice(start, end);
    return new Vector(slicedData, this.dtype);
  }

  greater(scalar: number): Vector {
    const outData = new Uint8Array(this.length);
    vectorGreaterScalar(this.data, scalar, outData, this.length);
    return new Vector(outData, 'uint8');
  }

  less(scalar: number): Vector {
    const outData = new Uint8Array(this.length);
    vectorLessScalar(this.data, scalar, outData, this.length);
    return new Vector(outData, 'uint8');
  }

  equal(scalar: number): Vector {
    const outData = new Uint8Array(this.length);
    vectorEqualScalar(this.data, scalar, outData, this.length);
    return new Vector(outData, 'uint8');
  }

  clip(min: number, max: number): Vector {
    const Constructor = getTypedArrayConstructor(this.dtype);
    const outData = new Constructor(this.length);
    vectorClip(this.data, min, max, outData, this.length);
    return new Vector(outData, this.dtype);
  }

  clip_(min: number, max: number): Vector {
    vectorClip(this.data, min, max, this.data, this.length);
    return this;
  }
}
