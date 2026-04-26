import nl from '../src/numlin.js';
import { performance } from 'perf_hooks';

function benchmark(name: string, fn: () => void, iterations: number = 100, warmup: number = 10) {
  // Warmup
  for (let i = 0; i < warmup; i++) {
    fn();
  }

  const times: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }

  const avg = times.reduce((a, b) => a + b, 0) / iterations;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log(`${name}:`);
  console.log(`  Avg: ${avg.toFixed(4)} ms`);
  console.log(`  Min: ${min.toFixed(4)} ms`);
  console.log(`  Max: ${max.toFixed(4)} ms`);
  console.log('');
}

const SIZE = 1000000;
const v1 = nl.random.vector(SIZE);
const v2 = nl.random.vector(SIZE);

benchmark('Vector Add (1M elements)', () => {
  v1.add(v2);
});

benchmark('Vector Dot Product (1M elements)', () => {
  v1.dot(v2);
});

const M_SIZE = 200;
const m1 = nl.random.matrix(M_SIZE, M_SIZE);
const m2 = nl.random.matrix(M_SIZE, M_SIZE);

benchmark('Matrix Multiply (200x200)', () => {
  m1.dot(m2);
});

const m3 = nl.random.matrix(1000, 1000);
benchmark('Matrix Transpose (1000x1000)', () => {
  m3.transpose();
});

const v1_32 = nl.random.vector(SIZE, 'float32');
const v2_32 = nl.random.vector(SIZE, 'float32');

benchmark('Vector Add Float32 (1M elements)', () => {
  v1_32.add(v2_32);
});

benchmark('Vector Add Float64 (1M elements)', () => {
  v1.add(v2);
});

benchmark('Statistics Sum (1M elements)', () => {
  nl.statistics.sum(v1);
});
