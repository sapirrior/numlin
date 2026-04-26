import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Vector', () => {
  test('Arithmetic (Scalar)', () => {
    const v = nl.vector([1, 2, 3]);
    assert.deepStrictEqual(Array.from(v.add(10).toArray()), [11, 12, 13]);
    assert.deepStrictEqual(Array.from(v.multiply(3).toArray()), [3, 6, 9]);
  });

  test('In-place Arithmetic', () => {
    const v = nl.vector([1, 2, 3]);
    const res = v.add_(10);
    assert.strictEqual(res, v);
    assert.deepStrictEqual(Array.from(v.toArray()), [11, 12, 13]);
  });

  test('Dot Product', () => {
    const v1 = nl.vector([1, 2, 3]);
    const v2 = nl.vector([4, 5, 6]);
    assert.strictEqual(v1.dot(v2), 32);
  });

  test('Random Creation', () => {
    const rV = nl.random.vector(100);
    const mean = nl.statistics.mean(rV);
    assert.ok(mean > 0.4 && mean < 0.6);
  });
});
