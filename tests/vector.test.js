import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Vector Arithmetic & Broadcasting', () => {
  test('Vector + Scalar', () => {
    const v = nl.vector([1, 2, 3]);
    assert.deepStrictEqual(Array.from(v.add(10).toArray()), [11, 12, 13]);
  });

  test('Vector - Scalar', () => {
    const v = nl.vector([1, 2, 3]);
    assert.deepStrictEqual(Array.from(v.subtract(1).toArray()), [0, 1, 2]);
  });

  test('Vector * Scalar', () => {
    const v = nl.vector([1, 2, 3]);
    assert.deepStrictEqual(Array.from(v.multiply(3).toArray()), [3, 6, 9]);
  });

  test('DType Promotion (int32 + float64)', () => {
    const vInt = nl.vector([1, 2], 'int32');
    const vFloat = nl.vector([1.5, 2.5], 'float64');
    const vRes = vInt.add(vFloat);
    assert.strictEqual(vRes.dtype, 'float64');
    assert.deepStrictEqual(Array.from(vRes.toArray()), [2.5, 4.5]);
  });
});

describe('Vector Statistics & Random', () => {
  test('Vector sum and mean', () => {
    const v = nl.vector([1, 2, 3, 4]);
    assert.strictEqual(nl.statistics.sum(v), 10);
    assert.strictEqual(nl.statistics.mean(v), 2.5);
  });

  test('Random vector distribution', () => {
    const rV = nl.random.vector(100);
    const mean = nl.statistics.mean(rV);
    assert.ok(mean > 0.4 && mean < 0.6, `Mean ${mean} should be around 0.5`);
  });
});
