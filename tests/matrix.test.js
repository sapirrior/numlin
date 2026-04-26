import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Matrix Operations', () => {
  test('Matrix dot product', () => {
    const A = nl.matrix([[1, 2], [3, 4]]);
    const B = nl.matrix([[5, 6], [7, 8]]);
    assert.deepStrictEqual(Array.from(A.dot(B).toArray()), [19, 22, 43, 50]);
  });

  test('Matrix transpose', () => {
    const C = nl.matrix([[1, 2, 3], [4, 5, 6]]);
    const T = C.transpose();
    assert.deepStrictEqual(T.shape, [3, 2]);
    assert.deepStrictEqual(T.toArray2D(), [[1, 4], [2, 5], [3, 6]]);
  });

  test('Matrix dot dimension mismatch', () => {
    const A = nl.matrix([[1, 2], [3, 4]]);
    const D = nl.matrix([[1], [2], [3]]);
    assert.throws(() => A.dot(D), /Incompatible shapes/);
  });
});

describe('Matrix Manipulation', () => {
  test('Reshape and Shared Memory', () => {
    const v = nl.arange(6);
    const m = v.reshape(2, 3);
    assert.deepStrictEqual(m.shape, [2, 3]);
    assert.deepStrictEqual(m.toArray2D(), [[0, 1, 2], [3, 4, 5]]);
    
    // Zero-copy check
    v.data[0] = 99;
    assert.strictEqual(m.data[0], 99);
  });

  test('Flatten', () => {
    const m = nl.matrix([[1, 2], [3, 4]]);
    const v = m.flatten();
    assert.deepStrictEqual(Array.from(v.toArray()), [1, 2, 3, 4]);
  });

  test('Invalid Reshape', () => {
    const v = nl.arange(6);
    assert.throws(() => v.reshape(2, 2), /Cannot reshape/);
  });
});
