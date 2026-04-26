import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import nl from '../dist/mjs/numlin.js';

describe('Statistics', () => {
  test('Sum and Mean', () => {
    const v = nl.vector([1, 2, 3, 4]);
    assert.strictEqual(nl.statistics.sum(v), 10);
    assert.strictEqual(nl.statistics.mean(v), 2.5);
  });

  test('Variance (Welford)', () => {
    const v = nl.vector([1, 2, 3, 4, 5]);
    assert.strictEqual(nl.statistics.variance(v), 2);
  });

  test('Standard Deviation', () => {
    const v = nl.vector([1, 2, 3, 4, 5]);
    assert.strictEqual(nl.statistics.std(v), Math.sqrt(2));
  });

  test('Numerical Stability (Welford)', () => {
    const largeVal = 1e9;
    const v = nl.vector([largeVal + 1, largeVal + 2, largeVal + 3]);
    const vari = nl.statistics.variance(v);
    assert.ok(Math.abs(vari - 2/3) < 1e-7);
  });

  test('Extrema (min, max, argmin, argmax)', () => {
    const v = nl.vector([10, -5, 20, 0, 15]);
    assert.strictEqual(nl.statistics.min(v), -5);
    assert.strictEqual(nl.statistics.max(v), 20);
    assert.strictEqual(nl.statistics.argmin(v), 1);
    assert.strictEqual(nl.statistics.argmax(v), 2);
  });

  test('Empty Set Handling', () => {
    const v = nl.vector([], 'float64');
    assert.ok(isNaN(nl.statistics.min(v)));
    assert.ok(isNaN(nl.statistics.mean(v)));
    assert.strictEqual(nl.statistics.argmin(v), -1);
  });
});
