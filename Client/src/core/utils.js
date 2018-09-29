export function getTileIcon() {
   // getTileIcon(tile) {
  //   let icon = null
  //   if (tile.type < 2.5) {
  //     icon = document.assets.tiles.ocean
  //   } else if (tile.type < 2.9) {
  //     icon = document.assets.tiles.field
  //   } else if (tile.type < 3.3) {
  //     icon = document.assets.tiles.forest
  //   } else if (tile.type < 4) {
  //     icon = document.assets.tiles.mountain
  //   }
  //   return icon
  // }
}

export function iterateScreenTiles(options, callback) {
  const size = options.size
  const yStart = options.yOffset
  const xStart = options.xOffset
  const yEnd = Math.min(yStart + options.yTiles, size)
  const xEnd = Math.min(xStart + options.xTiles, size)
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      if(document.gameState.tiles != undefined && document.gameState.tiles[y * size + x] != undefined) {
        callback(x, y, document.gameState.tiles[y * size + x])
      }
    }
  }
}