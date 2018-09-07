import Nation from './Nation'

class Situation {
  constructor() {
    this.nations = {}
  }

  addNation(name) {
    const key = name.toLowerCase()
    this.nations[key] = new Nation(name)
  }

  removeNation(name) {
    const key = name.toLowerCase()
    delete this.nations[key]
  }

  getNationData() {
    const nationData = {}
    for (const nationKey in this.nations) {
      if (this.nations.hasOwnProperty(nationKey)) {
        const nation = this.nations[nationKey]
        const data = nation.getData()
        if (data) {
          nationData[nationKey] = data
        }
      }
    }
    return nationData
  }

  getDevelopmentData() {
    
  }
}

export default Situation
