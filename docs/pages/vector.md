# Vector Class

The `Vector` class represents 1D numerical data and inherits from `NDArray`.

## Methods

### .add(other) / .subtract(other) / .multiply(other)
Performs element-wise operations with another Vector or a scalar.

### .dot(other)
Calculates the dot product of two vectors. Returns a `number`.

### .reshape(rows, cols)
**Zero Copy**. Returns a Matrix view of the vector data without copying.
