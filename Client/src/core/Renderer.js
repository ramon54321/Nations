import { document, config } from './main'
import { iterateScreenTiles, getTileIcon, getTilePositionFromPixel } from './utils'
import { observable, decorate } from 'mobx'

export default class Renderer {
  constructor() {
    this.initCanvas()
    this.initCanvasMouseListener()
    this.initFPSCounter()
    this.initCamera()
    this.initOptions()

    this.tileSize = 96
    this.screenSpace = {}
    this.renderLastTime = Date.now()

    this.render()
  }

  onInitialGameState() {
    console.log('Initial gameState received!')

    // console.log(document.gameState)

    // Set middle of map
    this.xOffset = (this.tileSize * document.gameState.size) / 2 - this.width / 2
    this.yOffset = (this.tileSize * document.gameState.size) / 2 - this.height / 2
  }

  initCanvas() {
    // Get canvas and set dimensions
    this.canvas = document.getElementById('canvas')

    // 896
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

  initFPSCounter() {
    this.framesThisSecond = 0
    setInterval(() => {
      // console.log(`FPS: ${this.framesThisSecond}`)
      this.framesThisSecond = 0
    }, 1000)
  }

  initCamera() {
    this.cameraSpeed = 30
    this.cameraMaxVelocity = 45
    this.xOffset = 0
    this.yOffset = 0
    this.xVelocity = 0
    this.yVelocity = 0
  }

  /**
   * Render State (Can be changed by client)
   */
  initOptions() {
    this.isShowIcons = true
  }

  toggleIcons() {
    this.isShowIcons = !this.isShowIcons
  }

  updateCamera(delta) {
    // Change Velocity
    if (document.keys[68]) {
      if (this.xVelocity < this.cameraMaxVelocity) {
        this.xVelocity += 1 + Math.abs(this.xVelocity) / 10
      }
    } else if (document.keys[65]) {
      if (this.xVelocity > -this.cameraMaxVelocity) {
        this.xVelocity -= 1 + Math.abs(this.xVelocity) / 10
      }
    }
    if (document.keys[83]) {
      if (this.yVelocity < this.cameraMaxVelocity) {
        this.yVelocity += 1 + Math.abs(this.yVelocity) / 10
      }
    } else if (document.keys[87]) {
      if (this.yVelocity > -this.cameraMaxVelocity) {
        this.yVelocity -= 1 + Math.abs(this.yVelocity) / 10
      }
    }

    // Move Camera
    this.xOffset += this.xVelocity * delta * this.cameraSpeed
    this.yOffset += this.yVelocity * delta * this.cameraSpeed

    // Slow down
    this.xVelocity /= 1.1
    this.yVelocity /= 1.1
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
      if (tile.type === 0) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        this.ctx.beginPath()
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        this.ctx.fillStyle = config.drawing.tiles.ocean.color
        this.ctx.fill()
      }
    })
  }

  drawField() {
    iterateScreenTiles(this.screenSpace, (x, y, tile) => {
      if (tile.type === 1) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        this.ctx.beginPath()
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        this.ctx.fillStyle = config.drawing.tiles.field.color
        this.ctx.fill()
      }
    })
  }

  drawForest() {
    iterateScreenTiles(this.screenSpace, (x, y, tile) => {
      if (tile.type === 2) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        this.ctx.beginPath()
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        this.ctx.fillStyle = config.drawing.tiles.forest.color
        this.ctx.fill()
      }
    })
  }

  drawMountain() {
    iterateScreenTiles(this.screenSpace, (x, y, tile) => {
      if (tile.type === 3) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        this.ctx.beginPath()
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        this.ctx.fillStyle = config.drawing.tiles.mountain.color
        this.ctx.fill()
      }
    })
  }

  drawIcons() {
    // Last denominator in the following line determines icon fade
    const speedFade = Math.max(4 - (Math.abs(this.xVelocity) + Math.abs(this.yVelocity)) / 2, 0) / 6
    this.ctx.globalAlpha = speedFade
    iterateScreenTiles(this.screenSpace, (x, y, tile) => {
      const image = getTileIcon(tile)
      if (image) {
        this.ctx.drawImage(
          image,
          x * this.tileSize + this.iconBorder - this.xOffset,
          y * this.tileSize + this.iconBorder - this.yOffset,
          this.iconSize,
          this.iconSize,
        )
      }
    })
    this.ctx.globalAlpha = 1.0
  }

  drawHoverOutline() {
    if (document.mouse) {
      const hoverTilePosition = getTilePositionFromPixel(
        this.xOffset + document.mouse.mouseX,
        this.yOffset + document.mouse.mouseY,
        this.tileSize,
      )
      this.ctx.beginPath()
      this.ctx.rect(
        hoverTilePosition[0] * this.tileSize - this.xOffset,
        hoverTilePosition[1] * this.tileSize - this.yOffset,
        this.tileSize,
        this.tileSize,
      )
      this.ctx.stroke()
    }
  }

  render() {
    const now = Date.now()
    const delta = (now - this.renderLastTime) / 1000
    this.renderLastTime = now

    const isMovingFast = (Math.abs(this.xVelocity) + Math.abs(this.yVelocity)) / 2 > 4

    // Increment frames counter
    this.framesThisSecond++

    // Check if there is data to draw
    if (!document.gameState) {
      window.requestAnimationFrame(() => this.render())
      return
    }

    // Client logic updates
    this.updateCamera(delta)
    this.updateScreenSpace()

    // Draw calls
    this.drawClear()
    this.drawInit()

    // Draw Terrain
    this.drawOcean()
    this.drawField()
    this.drawForest()
    this.drawMountain()

    // Draw Icons
    if (this.isShowIcons && !isMovingFast) {
      this.drawIcons()
    }

    // Draw Hover Outline
    if (!isMovingFast) {
      this.drawHoverOutline()
    }

    window.requestAnimationFrame(() => this.render())
  }
}
decorate(Renderer, {
  isShowIcons: observable
})
