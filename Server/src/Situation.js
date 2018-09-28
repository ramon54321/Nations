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
    this.nations.forEachProperty((nationName, nation) => {
      const data = nation.getData()
      if (data) {
        nationData[nationName] = data
      }
    })
    return nationData
  }
}

export default Situation
