# Contributing to numlin

Thank you for your interest in contributing to `numlin`. To maintain the performance and integrity of the library, we adhere to strict technical standards.

## Technical Standards

### Kernel Development Rules
`numlin` kernels are designed for maximum JIT efficiency. When contributing to `src/kernels/`, you must follow these rules:
1. **Classic Loops Only**: Use standard `for` loops. Do not use `.map()`, `.reduce()`, `.forEach()`, or other high-level array methods.
2. **Loop Unrolling**: Unroll critical loops by a factor of 4 where applicable.
3. **No Object Allocation**: Avoid creating objects, arrays, or closures inside hot paths (loops).
4. **TypedArray Usage**: Operations must be performed directly on `TypedArrays`.
5. **Instruction-Level Parallelism**: For reduction operations (sum, mean, dot), use multiple independent accumulators to bypass data dependencies.

### DType Integrity
Ensure that all new operations support the full range of `DTypes` (`float64`, `float32`, `int32`, `uint32`, `uint8`) and follow the established type promotion rules.

## Development Workflow

### Environment Setup
- Ensure Node.js (v20+) is installed.
- Install dependencies: `npm install`.

### Testing
We use the native Node.js test runner. All new features or bug fixes must include tests in the `tests/` directory.
- Run tests: `npm test`
- Note: Sequential execution (`--test-concurrency=1`) is required to ensure memory stability during tests.

### Benchmarking
Performance is a core requirement. If you add or modify a kernel, you must update or add a benchmark in `benchmarks/` and verify that there are no regressions.
- Run benchmarks: `npm run benchmark`

## Pull Request Process

1. **Research**: Open an issue to discuss significant changes before implementation.
2. **Implementation**: Ensure your code follows the technical standards above.
3. **Validation**: Run the full test suite and benchmarks.
4. **Documentation**: Update `README.md` or the `docs/` folder if you are adding new API features.
5. **Submission**: Submit your PR with a clear description of the change and performance impact data (if applicable).

## Code Style
- Use TypeScript for all source files.
- Maintain consistent naming conventions (e.g., full words like `vector` instead of `vec`).
- Ensure full type safety; avoid `any`.

---
By contributing to `numlin`, you agree that your contributions will be licensed under the MIT License.
