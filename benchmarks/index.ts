import nl from '../src/numlin.js';
import { performance } from 'perf_hooks';

function benchmark(name: string, fn: () => void, iterations: number = 100, warmup: number = 10) {
  for (let i = 0; i < warmup; i++) fn();
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
  console.log(`  Max: ${max.toFixed(4)} ms\n`);
}

const SIZE = 1_000_000;
const v1 = nl.random.vector(SIZE);
const v2 = nl.random.vector(SIZE);

console.log('--- Vector & Scalar Benchmarks ---');
benchmark('Vector Add (Standard)', () => { v1.add(v2); });
benchmark('Vector Add (In-Place)', () => { v1.add_(v2); });
benchmark('Vector Dot Product', () => { v1.dot(v2); });
benchmark('Vector Greater-Than Mask', () => { v1.greater(0.5); });
benchmark('Vector Clip', () => { v1.clip(0.2, 0.8); });

console.log('--- Matrix Benchmarks ---');
const M_SIZE = 200;
const m1 = nl.random.matrix(M_SIZE, M_SIZE);
const m2 = nl.random.matrix(M_SIZE, M_SIZE);
const v_row = nl.random.vector(M_SIZE);

benchmark('Matrix Multiply (200x200)', () => { m1.dot(m2); });
benchmark('Matrix Transpose (1000x1000)', () => { 
  const bigM = nl.random.matrix(1000, 1000);
  bigM.transpose(); 
}, 20, 2);
benchmark('Matrix-Vector Broadcasting (Row-wise)', () => { m1.add(v_row); });

console.log('--- Advanced Statistics ---');
benchmark('Statistics Sum (1M elements)', () => { nl.statistics.sum(v1); });
benchmark('Statistics Mean (1M elements)', () => { nl.statistics.mean(v1); });
benchmark('Statistics Variance (Welford)', () => { nl.statistics.variance(v1); });
benchmark('Statistics ArgMax', () => { nl.statistics.argmax(v1); });

console.log('--- DType Performance Comparison ---');
const v1_32 = nl.random.vector(SIZE, 'float32');
const v2_32 = nl.random.vector(SIZE, 'float32');
benchmark('Vector Add Float32', () => { v1_32.add(v2_32); });
benchmark('Vector Add Float64', () => { v1.add(v2); });
