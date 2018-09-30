import { perlin } from '../generation/noise'

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.init()
    
    this.population = {}
    this.resources = {}
    this.developments = []
  }

  /**
   * Generate initial values from random generator
   */
  init() {
    const generatedHeight = (perlin((this.x / 80), (this.y / 80), 11.5) + 1) / 2
    this.height = generatedHeight * 4
    if (this.height < 2.5) {
      this.type = 0
    } else if (this.height < 2.9) {
      this.type = 1
    } else if (this.height < 3.3) {
      this.type = 2
    } else if (this.height < 4) {
      this.type = 3
    }
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

    // Calculate factor of resource consumption
    /**
     * {
     *  wood: 1.0
     *  gold: 0.6
     * }
     */
    const resourceConsumptionFactor = {}

    resourceTargetConsumption.forEachProperty((resourceKey, targetConsumption) => {
      const actualConsumption = resourceActualConsumption[resourceKey]
      if (!actualConsumption) {
        resourceConsumptionFactor[resourceKey] = 0
        return
      }
      const factor = actualConsumption / targetConsumption
      resourceConsumptionFactor[resourceKey] = factor
    })

    // Calculate total resource production from developments
    const resourceProduction = {}

    this.developments.forEach(development => {
      const data = development.getData()
      if(data.production) {
        if(data.consumption) {
          // Calculate production depending on consumption factor
          // TODO: Calculate how the factor impacts production

          let minimumFactor = 1.0
          data.consumption.forEachProperty((resourceKey, consumptionAmount) => {
            if (resourceConsumptionFactor[resourceKey] < minimumFactor) {
              minimumFactor = resourceConsumptionFactor[resourceKey]
            }
          })

          // TODO: Add production to tiles

        } else {
          // Produce regardless of factors, since cunsumption is not nessesary
          data.production.forEachProperty((resourceKey, productionAmount) => {
            resourceProduction[resourceKey] = resourceProduction[resourceKey] ? resourceProduction[resourceKey] + productionAmount : productionAmount
          })

          // TODO: Drop this out of else, since it is the same potentially?
        }
      }
    })


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
      type: this.type,
      resources: this.resources
    }
  }
}

export default Tile
