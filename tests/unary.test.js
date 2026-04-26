import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Unary Operations', () => {
  test('Square Root', () => {
    const v = nl.vector([4, 9, 16]);
    assert.deepStrictEqual(Array.from(nl.sqrt(v).toArray()), [2, 3, 4]);
  });

  test('Exponential', () => {
    const v = nl.vector([1, 2]);
    const res = nl.exp(v).toArray();
    assert.ok(Math.abs(res[0] - Math.exp(1)) < 1e-10);
  });

  test('Logarithm', () => {
    const v = nl.vector([Math.E, Math.E * Math.E]);
    const res = nl.log(v).toArray();
    assert.ok(Math.abs(res[0] - 1) < 1e-10);
    assert.ok(Math.abs(res[1] - 2) < 1e-10);
  });
});
