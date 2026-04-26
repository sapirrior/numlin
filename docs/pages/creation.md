# Creation API

## Basic Arrays

### nl.vector(data, dtype?)
Creates a 1D Vector.
```typescript
const v = nl.vector([1, 2, 3]);
```

### nl.matrix(data, shape?, dtype?)
Creates a 2D Matrix. If data is flat, `shape` is required.
```typescript
const m = nl.matrix([[1, 2], [3, 4]]);
const m2 = nl.matrix([1, 2, 3, 4], [2, 2]);
```

## Utilities

- `nl.zeros(shape, dtype?)`: Array filled with zeros.
- `nl.ones(shape, dtype?)`: Array filled with ones.
- `nl.eye(n, m?, dtype?)`: Identity matrix.
- `nl.arange(start, stop?, step?)`: Range of values.
- `nl.linspace(start, stop, num)`: Evenly spaced values.
