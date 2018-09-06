import { normalize } from "../math"
import { perlin } from "./noise"

export function fractalNoise(options) {
  const {
    size = 256,
    octaves = 8,
    octaveOffset = 0,
    lacunarity = 2,
    persistance = 0.65,
  } = options
  const octaveLayers = []
  for (let i = 0 + octaveOffset; i < octaves + octaveOffset; i++) {
    const octaveLayer = perlinNoise(size, Math.pow(lacunarity, i), Math.pow(persistance, i))
    octaveLayers.push(octaveLayer)
  }
  const total = []
  for (let i = 0; i < octaveLayers[0].length; i++) {
    let value = 0
    for (let oi = 0; oi < octaves; oi++) {
      value += octaveLayers[oi][i]
    }
    total.push(value)
  }
  return normalize(-1, 1, total)
}

export function perlinNoise(size, frequency, amplitude) {
  const values = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const raw = perlin((x / size), (y / size), frequency)
      values.push(raw)
    }
  }
  return normalize(-1 * amplitude, 1 * amplitude, values)
}