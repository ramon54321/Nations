class Tile {
  constructor() {
    this.population = {}
    this.resources = {}
    this.developments = []
  }

  tick(delta) {
    // Resources
    this.developments.forEach(development => {
      const data = development.getData()
      if(data.consumption) {
        data.consumption.forEachProperty((amount, resource) => {
          
        })
      }
    })
  }

  consumeResource(resource, amount) {
    const currentAmount = this.resources[resource] || 0
    if (currentAmount <= 0) {
      return 0
    }

    const calculatedAmount = currentAmount - amount
    if (calculatedAmount >= 0) {
      this.resources[resource] = calculatedAmount
      return amount
    }

    this.resources[resource] = 0
    return amount + calculatedAmount
  }

  getData() {
    return {
      resources: {
        wood: 33
      }
    }
  }
}

export default Tile
