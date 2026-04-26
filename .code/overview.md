# Technical Overview: numlin Architecture

This document provides a detailed technical analysis of the `numlin` architecture, internal data structures, and optimization strategies.

## 1. Core Memory Model

`numlin` utilizes a decoupled memory architecture to enable efficient data manipulation without unnecessary memory allocation.

### 1.1 `DataBuffer`
The foundational storage unit. It manages the raw `TypedArray`, its `DType`, and its physical `Shape`.
- **Location**: `src/core/memory.ts`
- **Zero-Copy Architecture**: Operations like `reshape` and `flatten` return new `NDArray` instances that share the same `DataBuffer`.

### 1.2 `NDArray`
The abstract base class for all numerical structures. It provides the interface for accessing buffer properties.
- **Location**: `src/api/ndarray.ts`

### 1.3 DType System
`numlin` supports a specific set of numeric types mapped to JavaScript `TypedArrays`:
- `float64`, `float32`, `int32`, `uint32`, `uint8`.
- **Type Promotion**: Implements logic to determine the resulting type of operations between different DTypes (e.g., `int32` + `float64` = `float64`) to prevent precision loss.

## 2. Optimized Compute Kernels

Kernels are implemented in pure TypeScript but engineered to maximize the efficiency of the V8 JIT compiler.

### 2.1 Mechanical Sympathy Strategies
- **Loop Unrolling**: Critical loops are unrolled by a factor of 4 to reduce branch overhead and increase instruction density per iteration.
- **Instruction-Level Parallelism (ILP)**: Statistics and dot product kernels utilize multiple independent accumulators to bypass loop-carried data dependencies, allowing the CPU to execute multiple operations in parallel within a single thread.
- **Allocation-Free Hot Paths**: Kernels operate directly on `TypedArrays`. Temporary object creation is strictly prohibited in compute-intensive loops to avoid Garbage Collection (GC) pressure.

### 2.2 Kernel Categories
- **Math Kernels (`math.ts`)**: Unary operations (sqrt, exp, log).
- **Matrix Kernels (`matrix.ts`)**: (i, k, j) ordered matrix multiplication and transposition.
- **Scalar Kernels (`scalar.ts`)**: Broadcasting operations for scalar-array interactions.
- **Vector Kernels (`vector.ts`)**: Element-wise arithmetic and dot products.

## 3. API Structure

- **`nl` Object**: The primary entry point (`src/numlin.ts`). It acts as a factory for creation and a namespace for universal functions.
- **`Vector` Class**: Optimized for 1D operations.
- **`Matrix` Class**: Optimized for 2D operations, supporting linear algebra primitives.

## 4. Build and Distribution

The project uses a multi-target build system:
- **ESM**: Distributed in `dist/mjs` for modern environments.
- **CommonJS**: Distributed in `dist/cjs` for legacy Node.js support.
- **Types**: High-fidelity declaration files in `dist/types`.
- **Dual-Mode Package**: Configured via `exports` in `package.json` with a dedicated `dist/cjs/package.json` for CJS resolution.
