import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Logic & Clipping', () => {
  test('Vector Comparisons (greater, less, equal)', () => {
    const v = nl.vector([1, 5, 10]);
    
    const gt = v.greater(5);
    assert.strictEqual(gt.dtype, 'uint8');
    assert.deepStrictEqual(Array.from(gt.toArray()), [0, 0, 1]);

    const lt = v.less(6);
    assert.deepStrictEqual(Array.from(lt.toArray()), [1, 1, 0]);

    const eq = v.equal(5);
    assert.deepStrictEqual(Array.from(eq.toArray()), [0, 1, 0]);
  });

  test('Matrix Clipping', () => {
    const m = nl.matrix([[-10, 0], [5, 20]]);
    const clipped = m.clip(0, 10);
    
    assert.deepStrictEqual(clipped.toArray2D(), [
      [0, 0],
      [5, 10]
    ]);
  });

  test('In-place Clipping clip_', () => {
    const v = nl.vector([-5, 5, 15]);
    v.clip_(0, 10);
    assert.deepStrictEqual(Array.from(v.toArray()), [0, 5, 10]);
  });
});
