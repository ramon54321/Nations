export function clamp(a, b, t) {
  if (t < a) {
    t = a
  } else if (t > b) {
    t = b
  }
  return t
}

export function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

export function map(inputStart, inputEnd, outputStart, outputEnd, t) {
  return (t - inputStart) / (inputEnd - inputStart) * (outputEnd - outputStart) + outputStart
}

export function normalize(outputStart, outputEnd, t) {
  let min = 999999999999
  let max = -999999999999
  for (let i = 0; i < t.length; i++) {
    const b = t[i]
    if(b < min) {
      min = b
    } else if (b > max) {
      max = b
    }
  }
  const normalized = []
  for (let i = 0; i < t.length; i++) {
    const c = map(min, max, outputStart, outputEnd, t[i])
    normalized.push(c)
  }
  return normalized
}

export function operate(a, b, f) {
  if(a.length !== b.length) {
    throw new Error("Can't operate arrays with different lengths!")
  }
  const values = []
  for (let i = 0; i < a.length; i++) {
    values.push(f(a[i], b[i]))
  }
  return values
}

export function sum(a) {
  let total = 0
  for (let i = 0; i < a.length; i++) {
    total += a[i]
  }
  return total
}

export function average(a) {
  let total = 0
  for (let i = 0; i < a.length; i++) {
    total += a[i]
  }
  return total / a.length
}

export function sigmoid(t, intensity) {
  if(intensity < 5 || intensity > 20) {
    console.warn("Sigmoid intensity clamped between 5 and 20")
  }
  const e = Math.E
  const a = Math.pow(e, clamp(5, 20, intensity) * (t - 0.5))
  const b = a + 1
  const c = a / b
  return c
}