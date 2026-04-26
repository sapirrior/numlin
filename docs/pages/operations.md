# Operations

## Mathematics
Optimized unary operations that work on both Vectors and Matrices.

- `nl.sqrt(arr)`
- `nl.exp(arr)`
- `nl.log(arr)`

## Statistics
Available under the `nl.statistics` namespace.

- `sum(arr)`: Calculates the total sum using instruction-level parallelism.
- `mean(arr)`: Calculates the arithmetic mean.

## Random
Available under the `nl.random` namespace.

- `vector(length, dtype?)`: Uniform random vector [0, 1).
- `matrix(rows, cols, dtype?)`: Uniform random matrix [0, 1).
