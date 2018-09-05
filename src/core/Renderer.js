import { resources, keys } from './main'

export default class Renderer {
  constructor(world) {
    this.world = world

    const canvas = document.getElementById('canvas')
    this.width = 896
    this.height = 896
    canvas.style.width = this.width + 'px'
    canvas.style.height = this.height + 'px'
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    this.pixelWidth = rect.width * dpr
    this.pixelHeight = rect.height * dpr
    canvas.width = this.pixelWidth
    canvas.height = this.pixelHeight
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.translate(0.5, 0.5)
    document.ctx = ctx
    document.renderer = this

    document.mouse = {}
    canvas.addEventListener('mousemove', event => {
      const rect = canvas.getBoundingClientRect()
      const mousePosition = {
        x: Math.floor(event.clientX - rect.left),
        y: Math.floor(event.clientY - rect.top),
      }
      document.mouse.mouseX = mousePosition.x
      document.mouse.mouseY = mousePosition.y
    })

    this.canvas = canvas
    this.ctx = ctx
    this.tileSize = 96

    // Set middle of map
    this.xOffset = (this.tileSize * this.world.size) / 2 - this.width / 2
    this.yOffset = (this.tileSize * this.world.size) / 2 - this.height / 2
  }

  getTileIcon(tile) {
    let icon = null

    if (tile.type < 2.5) {
      icon = resources.tiles.ocean
    } else if (tile.type < 2.9) {
      icon = resources.tiles.field
    } else if (tile.type < 3.3) {
      icon = resources.tiles.forest
    } else if (tile.type < 4) {
      icon = resources.tiles.mountain
    }

    // switch (tile.type) {
    //   case 0:
    //     icon = resources.tiles.ocean
    //     break;
    //   case 1:
    //     icon = resources.tiles.field
    //     break;
    //   case 2:
    //     icon = resources.tiles.forest
    //     break;
    //   case 3:
    //     icon = resources.tiles.mountain
    //     break;
    // }
    return icon
  }

  render() {
    if (keys[68]) {
      this.xOffset += 12
    } else if (keys[65]) {
      this.xOffset -= 12
    }
    if (keys[83]) {
      this.yOffset += 12
    } else if (keys[87]) {
      this.yOffset -= 12
    }

    const ctx = this.ctx

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.strokeStyle = 'rgba(235,235,235, 0.4)'
    ctx.lineWidth = 1

    const iconSize = this.tileSize * 0.5
    const iconBorder = (this.tileSize - iconSize) / 2

    const screenSpace = {
      xOffset: Math.floor(this.xOffset / this.tileSize) - 1,
      xTiles: this.width / this.tileSize + 2,
      yOffset: Math.floor(this.yOffset / this.tileSize) - 1,
      yTiles: this.height / this.tileSize + 2,
    }

    // Color  Ocean
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type <= 2.5) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(80, 185, 218)'
        ctx.fill()
      }
    })

    // Color  Field
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type > 2.5 && tile.type <= 2.9) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(185, 212, 111)'
        ctx.fill()
      }
    })

    // Color  Forest
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type > 2.9 && tile.type <= 3.3) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(87, 126, 69)'
        ctx.fill()
      }
    })

    // Color  Mountain
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type > 3.3 && tile.type <= 4.0) {
        const centerX = x * this.tileSize - this.xOffset + this.tileSize / 2
        const centerY = y * this.tileSize - this.yOffset + this.tileSize / 2
        const radius = (this.tileSize / 2) * 1.45

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(99, 104, 96)'
        ctx.fill()
      }
    })

    // Icons
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      const image = this.getTileIcon(tile)
      if (image) {
        ctx.drawImage(
          image,
          x * this.tileSize + iconBorder - this.xOffset,
          y * this.tileSize + iconBorder - this.yOffset,
          iconSize,
          iconSize,
        )
      }
    })

    if (document.mouse) {
      const hoverTile = this.world.map.getTileFromPixel(
        this.xOffset + document.mouse.mouseX,
        this.yOffset + document.mouse.mouseY,
        this.tileSize,
      )
      if (hoverTile) {
        ctx.beginPath()
        ctx.rect(
          hoverTile.x * this.tileSize - this.xOffset,
          hoverTile.y * this.tileSize - this.yOffset,
          this.tileSize,
          this.tileSize,
        )
        ctx.stroke()
      }
    }

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
