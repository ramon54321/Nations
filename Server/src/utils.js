Object.prototype.forEachProperty = function(callback) {
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      const value = this[key]
      callback(key, value)
    }
  }
}

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth - 1 ? toFlatten.flat(depth - 1) : toFlatten,
      )
    }, [])
  },
})

export function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function debug(data) {
  if (data) {
    console.log(JSON.stringify(data, null, 4))
  }
}
