export type DType = 'float64' | 'float32' | 'int32' | 'uint32' | 'uint8';

export const DTypeInfo = {
  float64: { bytes: 8, TypedArray: Float64Array },
  float32: { bytes: 4, TypedArray: Float32Array },
  int32: { bytes: 4, TypedArray: Int32Array },
  uint32: { bytes: 4, TypedArray: Uint32Array },
  uint8: { bytes: 1, TypedArray: Uint8Array },
} as const;

export type TypedArray = Float64Array | Float32Array | Int32Array | Uint32Array | Uint8Array;

/**
 * Type promotion rules:
 * - Mixing floats always results in float64 if one is float64.
 * - Mixing signed and unsigned ints results in float64 to prevent sign/overflow issues.
 * - Ints + Floats = Floats.
 */
const promotionTable: Record<DType, Record<DType, DType>> = {
  float64: {
    float64: 'float64', float32: 'float64', int32: 'float64', uint32: 'float64', uint8: 'float64'
  },
  float32: {
    float64: 'float64', float32: 'float32', int32: 'float32', uint32: 'float32', uint8: 'float32'
  },
  int32: {
    float64: 'float64', float32: 'float32', int32: 'int32', uint32: 'float64', uint8: 'int32'
  },
  uint32: {
    float64: 'float64', float32: 'float32', int32: 'float64', uint32: 'uint32', uint8: 'uint32'
  },
  uint8: {
    float64: 'float64', float32: 'float32', int32: 'int32', uint32: 'uint32', uint8: 'uint8'
  }
};

export function promoteTypes(a: DType, b: DType): DType {
  return promotionTable[a][b];
}

export function getTypedArrayConstructor(dtype: DType) {
  return DTypeInfo[dtype].TypedArray;
}
