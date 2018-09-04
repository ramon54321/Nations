import { resources } from './main'

export default class Renderer {
  constructor(world) {
    this.world = world

    const canvas = document.getElementById('canvas')
    canvas.style.width = 900 + 'px'
    canvas.style.height = 900 + 'px'
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.translate(0.5, 0.5)
    document.ctx = ctx
    document.renderer = this

    this.canvas = canvas
    this.ctx = ctx
    this.xOffset = 0
    this.yOffset = 0
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
    this.xOffset -= 0.8
    this.yOffset -= 0.8

    const ctx = this.ctx

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.strokeStyle = 'rgba(235,235,235, 0.4)'
    ctx.lineWidth = 1

    const size = 64
    const iconSize = size * 0.5
    const iconBorder = (size - iconSize) / 2

    const screenSpace = {
      xOffset: Math.floor(-this.xOffset / size) - 1,
      xTiles: 16,
      yOffset: Math.floor(-this.yOffset / size) - 1,
      yTiles: 16
    }

    // Color  Ocean
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type <= 2.5) {
        const centerX = x * size + this.xOffset + size / 2
        const centerY = y * size + this.yOffset + size / 2
        const radius = (size / 2) * 1.45

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(80, 185, 218)'
        ctx.fill()
      }
    })

    // Color  Field
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type > 2.5 && tile.type <= 2.9) {
        const centerX = x * size + this.xOffset + size / 2
        const centerY = y * size + this.yOffset + size / 2
        const radius = (size / 2) * 1.45

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(185, 212, 111)'
        ctx.fill()
      }
    })

    // Color  Forest
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type > 2.9 && tile.type <= 3.3) {
        const centerX = x * size + this.xOffset + size / 2
        const centerY = y * size + this.yOffset + size / 2
        const radius = (size / 2) * 1.45

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(87, 126, 69)'
        ctx.fill()
      }
    })

    // Color  Mountain
    this.world.map.iterateScreen(screenSpace, (x, y, tile) => {
      if (tile.type > 3.3 && tile.type <= 4.0) {
        const centerX = x * size + this.xOffset + size / 2
        const centerY = y * size + this.yOffset + size / 2
        const radius = (size / 2) * 1.45

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
          x * size + iconBorder + this.xOffset,
          y * size + iconBorder + this.yOffset,
          iconSize,
          iconSize,
        )
      }
    })

    // Border
    this.world.map.iterate((x, y) => {
      ctx.beginPath()
      ctx.moveTo(x * size + this.xOffset, y * size + this.yOffset - size)
      ctx.lineTo(x * size + this.xOffset, y * size + this.yOffset)
      ctx.lineTo(x * size + this.xOffset + size, y * size + this.yOffset)
      ctx.stroke()
    })

    window.requestAnimationFrame(() => this.render())
  }
}
