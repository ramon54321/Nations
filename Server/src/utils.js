Object.prototype.forEachProperty = function(callback) {
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      const property = this[key]
      callback(property, key)
    }
  }
}