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

`numlin` supports both ES Modules and CommonJS.

### ES Modules (recommended)
```typescript
import nl from 'numlin';

const v = nl.vector([1, 2, 3]);
```

### CommonJS
```javascript
const { nl } = require('numlin');

const v = nl.vector([1, 2, 3]);
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
