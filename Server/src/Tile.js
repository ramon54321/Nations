class Tile {
  constructor() {
    this.population = {}
    this.resources = {}
    this.developments = []
  }

  tick(delta) {
    // Resources
    const resourceTargetConsumption = {}
    const resourceActualConsumption = {}

    // Try to consume resources for each development
    this.developments.forEach(development => {
      const data = development.getData()
      if(data.consumption) {
        data.consumption.forEachProperty((resourceKey, consumptionAmount) => {
          resourceTargetConsumption[resourceKey] = resourceTargetConsumption[resourceKey] ?
            resourceTargetConsumption[resourceKey] + consumptionAmount : consumptionAmount

          const actualConsumptionAmount = this.decreaseResource(resourceKey, consumptionAmount)
          resourceActualConsumption[resourceKey] = resourceActualConsumption[resourceKey] ?
          resourceActualConsumption[resourceKey] + actualConsumptionAmount : actualConsumptionAmount
        })
      }
    })

    // TODO: Depending on efficiency, increase resources due to developments

  }

  /**
   * Tries to decrease resources and returns the actual amount decreased. This may
   * be different than the given amount in the event that is was not possible to
   * decrease by the given amount.
   * @param {string} resource Name of the resource
   * @param {number} amount Amount to try to decrease
   */
  decreaseResource(resource, amount) {
    const initialAmount = this.resources[resource] || 0
    if (initialAmount <= 0) {
      return 0
    }

    const calculatedEndAmount = initialAmount - amount
    if (calculatedEndAmount >= 0) {
      this.resources[resource] = calculatedEndAmount
      return amount
    }

    this.resources[resource] = 0
    return initialAmount
  }

  /**
   * Tries to increase resource and returns the amount increased. This may be
   * different than the given amount in the event that is was not possible to
   * increase by the given amount.
   * @param {string} resource Name of the resource
   * @param {number} amount Amount to try to increase
   */
  increaseResource(resource, amount) {
    this.resources[resource] = this.resources[resource] ? this.resources[resource] + amount : amount
    return amount
  }

  getData() {
    return {
      resources: this.resources
    }
  }
}

export default Tile
