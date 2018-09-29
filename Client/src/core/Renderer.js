import { document, config } from './main'
import { iterateScreenTiles } from './utils'

export default class Renderer {
  constructor() {
    this.initCanvas()
    this.initCanvasMouseListener()

    this.tileSize = 96
    this.screenSpace = {}
    this.xOffset = 0
    this.yOffset = 0
  }

  initCanvas() {
    // Get canvas and set dimensions
    this.canvas = document.getElementById('canvas')
  
    this.width = 896
    this.height = 896
    this.canvas.style.width = this.width + 'px'
    this.canvas.style.height = this.height + 'px'
  
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    this.pixelWidth = rect.width * dpr
    this.pixelHeight = rect.height * dpr
  
    this.canvas.width = this.pixelWidth
    this.canvas.height = this.pixelHeight
    document.canvas = this.canvas
  
    // Get context and scale
    this.ctx = document.canvas.getContext('2d')
    this.ctx.scale(dpr, dpr)
    this.ctx.translate(0.5, 0.5)
    document.ctx = this.ctx
  }

  initCanvasMouseListener() {
    // Create mouse object and listen for events
    document.mouse = {}
    this.canvas.addEventListener('mousemove', event => {
      const rect = document.canvas.getBoundingClientRect()
      const mousePosition = {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top),
      }
      document.mouse.mouseX = mousePosition.x
      document.mouse.mouseY = mousePosition.y
    })
  }

  onInitialGameState() {
    console.log("Initial gameState received!")

    // console.log(document.gameState)

    // Set middle of map
    this.xOffset = (this.tileSize * document.gameState.size) / 2 - this.width / 2
    this.yOffset = (this.tileSize * document.gameState.size) / 2 - this.height / 2
  }

  updateKeys() {
    if (document.keys[68]) {
      this.xOffset += 12
    } else if (document.keys[65]) {
      this.xOffset -= 12
    }
    if (document.keys[83]) {
      this.yOffset += 12
    } else if (document.keys[87]) {
      this.yOffset -= 12
    }
  }

  updateScreenSpace() {
    this.screenSpace.xOffset = Math.floor(this.xOffset / this.tileSize) - 1
    this.screenSpace.xTiles = this.width / this.tileSize + 2
    this.screenSpace.yOffset = Math.floor(this.yOffset / this.tileSize) - 1
    this.screenSpace.yTiles = this.height / this.tileSize + 2
    this.screenSpace.size = document.gameState.size
  }

  drawClear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawInit() {
    this.ctx.strokeStyle = 'rgba(235,235,235, 0.4)'
    this.ctx.lineWidth = 1

    this.iconSize = this.tileSize * 0.5
    this.iconBorder = (this.tileSize - this.iconSize) / 2
  }

  drawOcean() {
    iterateScreenTiles(this.screenSpace, (x, y, tile) => {
      // TODO: Filter when to draw
      const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
      const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
      const radius = (this.tileSize / 2) * 1.45

      this.ctx.beginPath()
      this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      this.ctx.fillStyle = config.drawing.tiles.ocean.color
      this.ctx.fill()
    })
  }

  render() {
    // Check if there is data to draw
    if (!document.gameState) {
      window.requestAnimationFrame(() => this.render())
      return
    }

    // Client logic updates
    this.updateKeys()
    this.updateScreenSpace()

    // Draw calls
    this.drawClear()
    this.drawInit()

    // Draw Terrain
    this.drawOcean()
    

   

    

    // // Color  Field
    // this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
    //   if (tile.type > 2.5 && tile.type <= 2.9) {
    //     const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
    //     const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
    //     const radius = (this.tileSize / 2) * 1.45

    //     ctx.beginPath()
    //     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    //     ctx.fillStyle = 'rgb(185, 212, 111)'
    //     ctx.fill()
    //   }
    // })

    // // Color  Forest
    // this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
    //   if (tile.type > 2.9 && tile.type <= 3.3) {
    //     const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
    //     const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
    //     const radius = (this.tileSize / 2) * 1.45

    //     ctx.beginPath()
    //     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    //     ctx.fillStyle = 'rgb(87, 126, 69)'
    //     ctx.fill()
    //   }
    // })

    // // Color  Mountain
    // this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
    //   if (tile.type > 3.3 && tile.type <= 4.0) {
    //     const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
    //     const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
    //     const radius = (this.tileSize / 2) * 1.45

    //     ctx.beginPath()
    //     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    //     ctx.fillStyle = 'rgb(99, 104, 96)'
    //     ctx.fill()
    //   }
    // })

    // // Icons
    // this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
    //   const image = this.getTileIcon(tile)
    //   if (image) {
    //     ctx.drawImage(
    //       image,
    //       x * this.tileSize + iconBorder - this.xOffset,
    //       y * this.tileSize + iconBorder - this.yOffset,
    //       iconSize,
    //       iconSize,
    //     )
    //   }
    // })

    // if (document.mouse) {
    //   const hoverTile = this.world.map.getTileFromPixel(
    //     this.xOffset + document.mouse.mouseX,
    //     this.yOffset + document.mouse.mouseY,
    //     this.tileSize,
    //   )
    //   if (hoverTile) {
    //     ctx.beginPath()
    //     ctx.rect(
    //       hoverTile.x * this.tileSize - this.xOffset,
    //       hoverTile.y * this.tileSize - this.yOffset,
    //       this.tileSize,
    //       this.tileSize,
    //     )
    //     ctx.stroke()
    //   }
    // }

    // Border
    // this.world.map.iterate((x, y) => {
    //   ctx.beginPath()
    //   ctx.moveTo(x * this.tileSize - this.xOffset, y * this.tileSize - this.yOffset - this.tileSize)
    //   ctx.lineTo(x * this.tileSize - this.xOffset, y * this.tileSize - this.yOffset)
    //   ctx.lineTo(x * this.tileSize - this.xOffset + this.tileSize, y * this.tileSize - this.yOffset)
    //   ctx.stroke()
    // })

    window.requestAnimationFrame(() => this.render())
  }
}
