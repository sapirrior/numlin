# Contributing to numlin

This document outlines the technical and professional standards required for contributions to `numlin`. Adherence to these guidelines ensures the library remains predictable, maintainable, and aligned with its design for the target environment.

## Professional Standards

### 1. Communication & Documentation
- **Formal Tone**: Use formal, technical language in all documentation, commit messages, and pull request descriptions.
- **Simplicity**: Write clearly and concisely. Avoid conversational filler, marketing language, or subjective claims.
- **No Hyperbole**: Do not use hyperbolic or superlative language such as "best", "high-performance", "very fast", "extremely", "powerful", "advanced", or "optimized". Use objective, technical descriptions of the library's implementation and behavior instead.
- **No Emojis or Symbols**: Do not use emojis, icons, or decorative symbols in source code, comments, or documentation files. Use only standard alphanumeric characters and standard technical punctuation.

### 2. Implementation Integrity
- **No Experimentation**: PRs must not contain experimental features, unproven algorithms, or unvetted syntax. Implement only proven or stable implementations.
- **Architectural Consistency**: New code must match the existing patterns for memory management (DataBuffer), kernel design, and API structure.

## Technical Standards

### Kernel Development
Kernels in `src/kernels/` must be designed for V8 JIT execution:
1. **Low-Level Loops**: Use only standard `for` loops. High-level array methods (`map`, `filter`, `forEach`) are prohibited in kernels.
2. **Loop Unrolling**: Apply a 4x unrolling factor to critical paths.
3. **Zero Allocation**: Do not allocate objects, arrays, or closures within loops.
4. **Instruction-Level Parallelism (ILP)**: Utilize multiple independent accumulators for reductions.

### Data Types & Memory
- Operations must support all registered `DTypes`.
- Adhere to the established type promotion table.
- Maintain the decoupled memory model; use zero-copy views (e.g., `reshape`) where possible.

## Pull Request Process

1. **Inquiry**: Before implementing significant changes, open an issue for architectural review.
2. **Strict Validation**: 
   - Every feature must include automated tests in `tests/`.
   - Run tests sequentially: `npm test`.
   - All tests must pass with zero warnings or type errors.
3. **Performance Verification**:
   - If a kernel is modified, you must provide benchmark results demonstrating no regression.
   - Run benchmarks: `npm run benchmark`.
4. **Final Review**: Ensure all hardcoded versions or version-specific features are removed. Documentation must be updated and follow the professional standards listed above.

## Code Style
- **TypeScript**: Use strict TypeScript; `any` is prohibited.
- **Naming**: Use descriptive, full-word identifiers (e.g., `iterator`, `index`, `result`).
- **Formatting**: Adhere to the project's `.editorconfig` and existing indentation patterns.

---
By contributing to `numlin`, you agree that your contributions will be licensed under the MIT License.
