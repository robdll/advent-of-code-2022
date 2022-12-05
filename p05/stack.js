const Stack = function () {
  this.storage = {};
  this.size = 0;
}
  
Stack.prototype.push = function(element) {
  this.size++
  this.storage[this.size] = element
}

Stack.prototype.pop = function() {
  let removed = this.storage[this.size]
  delete this.storage[this.size]
  this.size--
  return removed
}

Stack.prototype.peek = function() {
  return this.storage[this.size]
}

Stack.prototype.isEmpty = function() {
  return this.size === 0
}

module.exports = Stack