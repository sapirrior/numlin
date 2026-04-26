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
