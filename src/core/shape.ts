export type Shape = number[];

export function calculateLength(shape: Shape): number {
  if (shape.length === 0) return 0;
  return shape.reduce((acc, dim) => acc * dim, 1);
}

export function areShapesEqual(a: Shape, b: Shape): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function validateShape(shape: Shape): void {
  for (const dim of shape) {
    if (!Number.isInteger(dim) || dim < 0) {
      throw new Error(`Invalid shape dimension: ${dim}`);
    }
  }
}

/**
 * NumPy-style broadcasting compatibility check.
 * Two dimensions are compatible when:
 * 1. they are equal, or
 * 2. one of them is 1.
 */
export function canBroadcast(a: Shape, b: Shape): boolean {
  const lenA = a.length;
  const lenB = b.length;
  const maxLen = Math.max(lenA, lenB);

  for (let i = 0; i < maxLen; i++) {
    const dimA = a[lenA - 1 - i] ?? 1;
    const dimB = b[lenB - 1 - i] ?? 1;

    if (dimA !== dimB && dimA !== 1 && dimB !== 1) {
      return false;
    }
  }
  return true;
}

export function getBroadcastShape(a: Shape, b: Shape): Shape {
  const lenA = a.length;
  const lenB = b.length;
  const maxLen = Math.max(lenA, lenB);
  const result: Shape = new Array(maxLen);

  for (let i = 0; i < maxLen; i++) {
    const dimA = a[lenA - 1 - i] ?? 1;
    const dimB = b[lenB - 1 - i] ?? 1;
    result[maxLen - 1 - i] = Math.max(dimA, dimB);
  }

  return result;
}
