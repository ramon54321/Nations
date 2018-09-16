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
    this.nations.forEachProperty((nation, key) => {
      const data = nation.getData()
      if (data) {
        nationData[key] = data
      }
    })
    return nationData
  }
}

export default Situation
