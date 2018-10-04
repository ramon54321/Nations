export function getTileIcon(tile) {
  switch (tile.type) {
    case 0:
      return document.assets.tiles.ocean
    case 1:
      return document.assets.tiles.field
    case 2:
      return document.assets.tiles.forest
    case 3:
      return document.assets.tiles.mountain
  }
}

export function forEachProperty(object, callback) {
  if (!object) {
    return null
  }
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key]
      callback(key, value)
    }
  }
}

export function mapProperty(object, callback) {
  if (!object) {
    return null
  }
  const acc = []
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key]
      acc.push(callback(key, value))
    }
  }
  return acc
}

export function getTilePositionFromPixel(xPixel, yPixel, tileSize) {
  const x = Math.floor(xPixel / tileSize)
  const y = Math.floor(yPixel / tileSize)
  return [x, y]
}

export function iterateScreenTiles(options, callback) {
  const size = options.size
  const yStart = Math.max(options.yOffset, 0)
  const xStart = Math.max(options.xOffset, 0)
  const yEnd = Math.min(options.yOffset + options.yTiles, size)
  const xEnd = Math.min(options.xOffset + options.xTiles, size)
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      if (
        document.gameState.state.tiles != undefined &&
        document.gameState.state.tiles[y * size + x] != undefined
      ) {
        callback(x, y, document.gameState.state.tiles[y * size + x])
      }
    }
  }
}

export function formatNumber(number, decimalPlaces = 0) {
  return number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const ninthPosition = {
  nw: [0, 0],
  n: [1, 0],
  ne: [2, 0],
  w: [0, 1],
  c: [1, 1],
  e: [2, 1],
  sw: [0, 2],
  s: [1, 2],
  se: [2, 3],
}

export function roundedPoly(ctx, points, radiusAll) {
  let i,
    x,
    y,
    len,
    p1,
    p2,
    p3,
    v1,
    v2,
    sinA,
    sinA90,
    radDirection,
    drawDirection,
    angle,
    halfAngle,
    cRadius,
    lenOut,
    radius

  let asVec = function(p, pp, v) {
    v.x = pp.x - p.x
    v.y = pp.y - p.y
    v.len = Math.sqrt(v.x * v.x + v.y * v.y)
    v.nx = v.x / v.len
    v.ny = v.y / v.len
    v.ang = Math.atan2(v.ny, v.nx)
  }
  radius = radiusAll
  v1 = {}
  v2 = {}
  len = points.length
  p1 = points[len - 1]

  for (i = 0; i < len; i++) {
    p2 = points[i % len]
    p3 = points[(i + 1) % len]

    asVec(p2, p1, v1)
    asVec(p2, p3, v2)
    sinA = v1.nx * v2.ny - v1.ny * v2.nx
    sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny
    angle = Math.asin(sinA)

    radDirection = 1
    drawDirection = false
    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle
      } else {
        angle = Math.PI - angle
        radDirection = -1
        drawDirection = true
      }
    } else {
      if (angle > 0) {
        radDirection = -1
        drawDirection = true
      }
    }
    if (p2.radius !== undefined) {
      radius = p2.radius
    } else {
      radius = radiusAll
    }

    halfAngle = angle / 2

    lenOut = Math.abs((Math.cos(halfAngle) * radius) / Math.sin(halfAngle))

    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2)
      cRadius = Math.abs((lenOut * Math.sin(halfAngle)) / Math.cos(halfAngle))
    } else {
      cRadius = radius
    }

    x = p2.x + v2.nx * lenOut
    y = p2.y + v2.ny * lenOut

    x += -v2.ny * cRadius * radDirection
    y += v2.nx * cRadius * radDirection

    ctx.arc(
      x,
      y,
      cRadius,
      v1.ang + (Math.PI / 2) * radDirection,
      v2.ang - (Math.PI / 2) * radDirection,
      drawDirection,
    )

    p1 = p2
    p2 = p3
  }
  ctx.closePath()
}
