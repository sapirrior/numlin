import { Vector } from './api/vector.js';
import { Matrix } from './api/matrix.js';
import { statistics } from './api/statistics.js';
import { random } from './api/random.js';
import { creation } from './api/creation.js';
import { DType, TypedArray, getTypedArrayConstructor } from './core/dtype.js';
import { vectorSqrt, vectorExp, vectorLog } from './kernels/unary.js';

const nl = {
  // Creation
  vector: (data: number[] | TypedArray, dtype: DType = 'float64') => new Vector(data, dtype),
  matrix: (data: number[][] | number[] | TypedArray, shape?: [number, number], dtype: DType = 'float64') => new Matrix(data, shape, dtype),
  array: (data: any, dtype: DType = 'float64') => {
    if (Array.isArray(data)) {
      if (Array.isArray(data[0])) {
        return new Matrix(data, undefined, dtype);
      }
      return new Vector(data, dtype);
    }
    throw new Error('Unsupported data format for nl.array');
  },
  zeros: creation.zeros,
  ones: creation.ones,
  eye: creation.eye,
  arange: creation.arange,
  linspace: creation.linspace,

  // Math
  sqrt: (arr: Vector | Matrix): any => {
    const Constructor = getTypedArrayConstructor(arr.dtype);
    const outData = new Constructor(arr.length);
    vectorSqrt(arr.data, outData, arr.length);
    if (arr instanceof Vector) return new Vector(outData, arr.dtype);
    return new Matrix(outData, (arr as Matrix).shape as [number, number], arr.dtype);
  },
  exp: (arr: Vector | Matrix): any => {
    const Constructor = getTypedArrayConstructor(arr.dtype);
    const outData = new Constructor(arr.length);
    vectorExp(arr.data, outData, arr.length);
    if (arr instanceof Vector) return new Vector(outData, arr.dtype);
    return new Matrix(outData, (arr as Matrix).shape as [number, number], arr.dtype);
  },
  log: (arr: Vector | Matrix): any => {
    const Constructor = getTypedArrayConstructor(arr.dtype);
    const outData = new Constructor(arr.length);
    vectorLog(arr.data, outData, arr.length);
    if (arr instanceof Vector) return new Vector(outData, arr.dtype);
    return new Matrix(outData, (arr as Matrix).shape as [number, number], arr.dtype);
  },

  statistics,
  random
};

export default nl;
export { nl };
