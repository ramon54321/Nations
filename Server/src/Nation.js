class Nation {
  constructor(name) {
    this.name = name
  }

  getData() {
    return {
      name: this.name,
      tiles: [
        [3, 5],
        [2, 5],
      ]
    }
  }
}

export default Nation
