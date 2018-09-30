import Development from './core/Development'

class Store {
  constructor() {
    this.developments = {}
  }

  addDevelopment(data) {
    const key = data.name.toLowerCase()
    this.developments[key] = new Development(data)
  }

  removeDevelopment(name) {
    const key = name.toLowerCase()
    delete this.developments[key]
  }

  getDevelopmentData() {
    const developmentData = {}
    for (const developmentKey in this.developments) {
      if (this.developments.hasOwnProperty(developmentKey)) {
        const development = this.developments[developmentKey]
        const data = development.getData()
        if (data) {
          developmentData[developmentKey] = data
        }
      }
    }
    return developmentData
  }
}

export default Store
