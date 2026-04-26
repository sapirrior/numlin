import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Data Integrity', () => {
  test('Deep Copy', () => {
    const v = nl.vector([1, 2, 3]);
    const c = v.copy();
    v.data[0] = 99;
    assert.strictEqual(c.data[0], 1, 'Copy should not be affected by changes to original');
  });

  test('Vector Slicing', () => {
    const v = nl.vector([0, 1, 2, 3, 4, 5]);
    const s = v.slice(1, 4); // [1, 2, 3]
    assert.deepStrictEqual(Array.from(s.toArray()), [1, 2, 3]);
  });

  test('Matrix Row Slicing', () => {
    const m = nl.matrix([
      [1, 2],
      [3, 4],
      [5, 6]
    ]);
    
    // Normal slice
    assert.deepStrictEqual(m.slice(1, 3).toArray2D(), [[3, 4], [5, 6]]);
    
    // Negative indices
    assert.deepStrictEqual(m.slice(-1).toArray2D(), [[5, 6]]);
    
    // Out of bounds clamping
    assert.deepStrictEqual(m.slice(0, 99).toArray2D(), [[1, 2], [3, 4], [5, 6]]);
  });
});
