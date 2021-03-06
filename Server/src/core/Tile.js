import { perlin } from '../generation/noise'
import { debug, perlinNormalized, random } from '../utils'
import { serverState } from '../main';

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.population = {}
    this.resources = {}
    this.developments = {}

    this.init()
  }

  /**
   * Generate initial values from random generator
   */
  init() {
    const generatedHeight = perlinNormalized(this.x / 80, this.y / 80, 11.5)
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

    this.initResources()
  }

  initResources() {
    const tileRules = serverState.rules.tiles.types[this.type]

    if (!tileRules) {
      console.error("Can not init tile. Tile rules not found.")
    }

    tileRules.initialResources.forEachProperty((resource, resourceRules) => {
      const randomAmount = random(this.height) * (resourceRules.max - resourceRules.min)
      const initialAmount = resourceRules.min + randomAmount
      this.increaseResource(resource, initialAmount)
    })
  }

  tick(delta) {
    // Resources
    const resourceTargetConsumption = {}
    const resourceActualConsumption = {}

    // Try to consume resources for each development
    this.developments.forEachProperty((ninth, development) => {
      if (development.consumption) {
        development.consumption.forEachProperty((resourceKey, consumptionAmount) => {
          resourceTargetConsumption[resourceKey] = resourceTargetConsumption[resourceKey]
            ? resourceTargetConsumption[resourceKey] + consumptionAmount
            : consumptionAmount

          const actualConsumptionAmount = this.decreaseResource(resourceKey, consumptionAmount)
          resourceActualConsumption[resourceKey] = resourceActualConsumption[resourceKey]
            ? resourceActualConsumption[resourceKey] + actualConsumptionAmount
            : actualConsumptionAmount
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

    this.developments.forEachProperty((ninth, development) => {
      if (development.production) {
        let minimumFactor = 1.0
        if (development.consumption) {
          // Calculate production depending on consumption factor
          development.consumption.forEachProperty((resourceKey, consumptionAmount) => {
            if (resourceConsumptionFactor[resourceKey] < minimumFactor) {
              minimumFactor = resourceConsumptionFactor[resourceKey]
            }
          })
        }

        if (minimumFactor > 0) {
          development.production.forEachProperty((resourceKey, productionAmount) => {
            const adjustedProductionAmount = productionAmount * minimumFactor
            resourceProduction[resourceKey] = resourceProduction[resourceKey]
              ? resourceProduction[resourceKey] + adjustedProductionAmount
              : adjustedProductionAmount
          })
        }
      }
    })

    // Apply produced resources to tile
    resourceProduction.forEachProperty((resourceKey, productionAmount) => {
      this.resources[resourceKey] = this.resources[resourceKey]
        ? this.resources[resourceKey] + productionAmount
        : productionAmount
    })
  }

  // TODO: Add add and remove development functions

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

  _getDevelopmentData() {
    const developmentData = {}
    this.developments.forEachProperty((ninth, development) => {
      developmentData[ninth] = {
        id: development.id,
      }
    })
    return developmentData
  }

  getData() {
    const resources = this.resources
    const developments = this._getDevelopmentData()
    return {
      type: this.type,
      resources: Object.keys(resources).length !== 0 ? resources : undefined,
      developments: Object.keys(developments).length !== 0 ? developments : undefined,
    }
  }
}

export default Tile
