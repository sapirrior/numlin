# numlin

Numerical computing library for TypeScript and Node.js.

## Overview

`numlin` is a numerical library implemented in TypeScript. It provides a set of tools for vector and matrix operations, statistics, and mathematical utilities optimized for JIT execution environments. By utilizing JavaScript `TypedArrays`, `numlin` provides low-latency operations and predictable memory overhead.

## Features

- **Optimized Kernels**: Kernels use loop unrolling and instruction-level parallelism to improve CPU throughput.
- **Memory Management**: Uses a decoupled `DataBuffer` architecture for zero-copy views, reshapes, and flattens.
- **DType Support**: Supports `float64`, `float32`, `int32`, `uint32`, and `uint8` with automatic type promotion.
- **Zero Dependencies**: Pure TypeScript implementation with no external runtime dependencies.
- **ES Modules**: Supports ES Modules and standard Node.js integration.

## Installation

```bash
npm install numlin
```

## Usage

```typescript
import nl from 'numlin';

// Vector Operations
const v1 = nl.vector([1, 2, 3]);
const v2 = nl.vector([4, 5, 6]);
const v3 = v1.add(v2); // [5, 7, 9]

// Matrix Operations
const m1 = nl.matrix([[1, 2], [3, 4]]);
const m2 = nl.matrix([[5, 6], [7, 8]]);
const res = m1.dot(m2); // [[19, 22], [43, 50]]

// Advanced Manipulation
const reshaped = nl.arange(6).reshape(2, 3);
const flattened = reshaped.flatten();
```

## API Reference

### Creation
- `nl.vector(data, dtype?)`: Create a 1D array.
- `nl.matrix(data, shape?, dtype?)`: Create a 2D array.
- `nl.zeros(shape, dtype?)`: Initialize with zeros.
- `nl.ones(shape, dtype?)`: Initialize with ones.
- `nl.arange(start, stop?, step?)`: Create a range of values.
- `nl.linspace(start, stop, num)`: Create linearly spaced values.

### Mathematics
- `nl.sqrt(x)`, `nl.exp(x)`, `nl.log(x)`: Unary mathematical operations.
- `nl.statistics.sum(x)`: Total sum.
- `nl.statistics.mean(x)`: Arithmetic mean.

### Randomization
- `nl.random.vector(length, dtype?)`: Random vector generation.
- `nl.random.matrix(rows, cols, dtype?)`: Random matrix generation.

## Performance

`numlin` is designed for performance. Kernels avoid object creation and array methods (like `.map` or `.reduce`) in hot paths to facilitate JIT optimization.

To run benchmarks:
```bash
npm run benchmark
```

## Testing

Verified with a test suite covering edge cases, type promotion, and memory integrity:
```bash
npm test
```

## License

MIT
