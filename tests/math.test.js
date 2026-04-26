import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Advanced Math (uFuncs)', () => {
  test('nl.exp', () => {
    const v = nl.vector([1, 2, 3]);
    const res = nl.exp(v).toArray();
    assert.ok(Math.abs(res[0] - Math.exp(1)) < 1e-10);
    assert.ok(Math.abs(res[1] - Math.exp(2)) < 1e-10);
  });

  test('nl.log', () => {
    const v = nl.vector([1, 2, 3]);
    const res = nl.log(nl.exp(v)).toArray();
    for (let i = 0; i < 3; i++) {
      assert.ok(Math.abs(res[i] - (i + 1)) < 1e-10);
    }
  });

  test('nl.sqrt', () => {
    const v = nl.vector([4, 9, 16]);
    assert.deepStrictEqual(Array.from(nl.sqrt(v).toArray()), [2, 3, 4]);
  });
});
