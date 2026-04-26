import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Broadcasting System', () => {
  test('Row-wise Broadcasting: Matrix (M, N) + Vector (N)', () => {
    // 2x3 Matrix
    const m = nl.matrix([
      [1, 2, 3],
      [4, 5, 6]
    ]);
    // 1x3 Vector
    const v = nl.vector([10, 20, 30]);
    
    const res = m.add(v);
    
    // Expected:
    // [1+10, 2+20, 3+30] -> [11, 22, 33]
    // [4+10, 5+20, 6+30] -> [14, 25, 36]
    assert.deepStrictEqual(res.toArray2D(), [
      [11, 22, 33],
      [14, 25, 36]
    ]);
  });

  test('Column-wise Broadcasting: Matrix (M, N) * Matrix (M, 1)', () => {
    // 2x3 Matrix
    const m = nl.matrix([
      [1, 2, 3],
      [4, 5, 6]
    ]);
    // 2x1 Matrix
    const col = nl.matrix([[10], [100]], [2, 1]);
    
    const res = m.multiply(col);
    
    // Expected:
    // [1*10, 2*10, 3*10]     -> [10, 20, 30]
    // [4*100, 5*100, 6*100] -> [400, 500, 600]
    assert.deepStrictEqual(res.toArray2D(), [
      [10, 20, 30],
      [400, 500, 600]
    ]);
  });

  test('1D Broadcasting: Vector (N) - Vector (1)', () => {
    const v1 = nl.vector([10, 20, 30]);
    const v2 = nl.vector([5]); // Length 1
    
    const res = v1.subtract(v2);
    assert.deepStrictEqual(Array.from(res.toArray()), [5, 15, 25]);
  });

  test('Incompatible Broadcasting throws error', () => {
    const m = nl.matrix([[1, 2], [3, 4]]); // 2x2
    const v = nl.vector([1, 2, 3]); // 1x3
    
    assert.throws(() => m.add(v), /not broadcast-compatible/);
  });
});
