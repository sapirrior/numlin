# Matrix Class

The `Matrix` class represents 2D numerical data and inherits from `NDArray`.

## Methods

### .dot(other)
Performs matrix multiplication (dot product).

### .transpose()
Returns the transposed matrix.

### .flatten()
**Zero Copy**. Returns a Vector view of the matrix data.

### .toArray2D()
Converts the internal flat data back into a 2D JavaScript array.
