import { DataBuffer } from '../core/memory.js';
import { DType, TypedArray } from '../core/dtype.js';
import { Shape } from '../core/shape.js';

export abstract class NDArray {
  protected readonly buffer: DataBuffer;

  constructor(data: TypedArray | number[], dtype: DType, shape: Shape) {
    this.buffer = new DataBuffer(data, dtype, shape);
  }

  get data(): TypedArray {
    return this.buffer.data;
  }

  get dtype(): DType {
    return this.buffer.dtype;
  }

  get shape(): Shape {
    return this.buffer.shape;
  }

  get length(): number {
    return this.buffer.length;
  }

  toArray(): number[] {
    return Array.from(this.data);
  }
}
