# numlin

[![npm version](https://img.shields.io/npm/v/numlin.svg)](https://www.npmjs.com/package/numlin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/numlin.svg)](https://www.npmjs.com/package/numlin)

**numlin** is a zero-dependency numerical computing library for TypeScript and Node.js. It implements kernels designed for the V8 JavaScript engine.

## 🚀 Key Features

- **Kernels**: Loops with 4x unrolling and Instruction Level Parallelism (ILP).
- **Universal Broadcasting**: NumPy-style broadcasting for arithmetic between vectors and matrices.
- **Stable Statistics**: Implementation of Welford's Online Algorithm for variance and std dev.
- **Memory Management**: In-place operations (e.g., `add_`) and zero-copy views (`reshape`, `flatten`).
- **Logic & Clipping**: Comparison masks and value range restriction.
- **Slicing**: Boundary-clamped, negative-index-supporting slicing for vectors and matrices.
- **Type System**: DType promotion (float64, int32, uint32, uint8) for mathematical consistency.

## 📦 Installation

```bash
npm install numlin
```

## 🛠 Usage

### Basic Operations
```javascript
import nl from 'numlin';

const a = nl.vector([1, 2, 3]);
const b = nl.vector([4, 5, 6]);

// Standard addition
const c = a.add(b);

// In-place addition
a.add_(b);
```

### Broadcasting
```javascript
const matrix = nl.matrix([
  [1, 2],
  [3, 4]
]);
const bias = nl.vector([10, 20]);

// Adds 'bias' to every row of the matrix
const result = matrix.add(bias);
```

### Statistics
```javascript
const v = nl.random.vector(1000000);
const mean = nl.statistics.mean(v);
const std = nl.statistics.std(v);
const max = nl.statistics.max(v);
```

## 📖 Documentation

Full documentation is available in the `docs/` directory or on [GitHub Pages](https://sapirrior.github.io/numlin/).

## ⚖️ License

MIT © 2026 sapirrior
