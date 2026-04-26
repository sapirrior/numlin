import { DType, TypedArray, getTypedArrayConstructor } from './dtype.js';
import { Shape, calculateLength, validateShape } from './shape.js';

export class DataBuffer {
  public readonly data: TypedArray;
  public readonly dtype: DType;
  public readonly shape: Shape;
  public readonly length: number;

  constructor(data: TypedArray | number[], dtype: DType, shape: Shape) {
    validateShape(shape);
    const expectedLength = calculateLength(shape);
    
    this.dtype = dtype;
    this.shape = [...shape];
    this.length = expectedLength;

    if (Array.isArray(data)) {
      const Constructor = getTypedArrayConstructor(dtype);
      this.data = new Constructor(data);
    } else {
      this.data = data;
    }

    if (this.data.length !== this.length) {
      throw new Error(`Data length (${this.data.length}) does not match shape length (${this.length})`);
    }
  }
}
