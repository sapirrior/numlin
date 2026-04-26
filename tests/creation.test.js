import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Creation & DTypes', () => {
  test('Vector float64 creation', () => {
    const v = nl.vector([1, 2, 3], 'float64');
    assert.deepStrictEqual(Array.from(v.toArray()), [1, 2, 3]);
    assert.strictEqual(v.dtype, 'float64');
  });

  test('Vector uint8 creation and overflow', () => {
    const v = nl.vector([1, 2, 256, -1], 'uint8');
    assert.deepStrictEqual(Array.from(v.toArray()), [1, 2, 0, 255]);
    assert.strictEqual(v.dtype, 'uint8');
  });

  test('Matrix 2D creation', () => {
    const m = nl.matrix([[1, 2], [3, 4]]);
    assert.deepStrictEqual(m.toArray2D(), [[1, 2], [3, 4]]);
    assert.deepStrictEqual(m.shape, [2, 2]);
  });
});

describe('Creation Utilities', () => {
  test('nl.zeros', () => {
    assert.deepStrictEqual(Array.from(nl.zeros(3).toArray()), [0, 0, 0]);
    assert.deepStrictEqual(Array.from(nl.zeros([2, 2]).toArray()), [0, 0, 0, 0]);
  });

  test('nl.ones', () => {
    assert.deepStrictEqual(Array.from(nl.ones(3).toArray()), [1, 1, 1]);
  });

  test('nl.eye', () => {
    assert.deepStrictEqual(nl.eye(2).toArray2D(), [[1, 0], [0, 1]]);
  });

  test('nl.arange', () => {
    assert.deepStrictEqual(Array.from(nl.arange(0, 10, 2).toArray()), [0, 2, 4, 6, 8]);
  });

  test('nl.linspace', () => {
    assert.deepStrictEqual(Array.from(nl.linspace(0, 1, 5).toArray()), [0, 0.25, 0.5, 0.75, 1]);
    assert.deepStrictEqual(Array.from(nl.linspace(0, 1, 1).toArray()), [0]);
  });
});
