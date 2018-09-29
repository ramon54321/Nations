export function getTileIcon(tile) {
  switch(tile.type) {
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

export function getTilePositionFromPixel(xPixel, yPixel, tileSize) {
  const x = Math.floor(xPixel / tileSize)
  const y = Math.floor(yPixel / tileSize)
  return [x, y]
}

export function iterateScreenTiles(options, callback) {
  const size = options.size
  const yStart = Math.max(options.yOffset, 0)
  const xStart = Math.max(options.xOffset, 0)
  const yEnd = Math.min(yStart + options.yTiles, size)
  const xEnd = Math.min(xStart + options.xTiles, size)
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      if (
        document.gameState.tiles != undefined &&
        document.gameState.tiles[y * size + x] != undefined
      ) {
        callback(x, y, document.gameState.tiles[y * size + x])
      }
    }
  }
}
