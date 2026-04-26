import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Matrix', () => {
  test('Dot Product', () => {
    const A = nl.matrix([[1, 2], [3, 4]]);
    const B = nl.matrix([[5, 6], [7, 8]]);
    assert.deepStrictEqual(Array.from(A.dot(B).toArray()), [19, 22, 43, 50]);
  });

  test('Transpose', () => {
    const C = nl.matrix([[1, 2, 3], [4, 5, 6]]);
    const T = C.transpose();
    assert.deepStrictEqual(T.shape, [3, 2]);
    assert.deepStrictEqual(T.toArray2D(), [[1, 4], [2, 5], [3, 6]]);
  });

  test('In-place Arithmetic', () => {
    const m = nl.matrix([[1, 2], [3, 4]]);
    m.multiply_(2);
    assert.deepStrictEqual(m.toArray2D(), [[2, 4], [6, 8]]);
  });

  test('Manipulation (Reshape, Flatten)', () => {
    const v = nl.arange(6);
    const m = v.reshape(2, 3);
    assert.deepStrictEqual(m.shape, [2, 3]);
    assert.deepStrictEqual(m.flatten().length, 6);
  });

  test('Random Creation', () => {
    const m = nl.random.matrix(10, 10);
    assert.strictEqual(m.shape[0], 10);
    assert.strictEqual(m.shape[1], 10);
  });
});
