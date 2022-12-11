const Monkey = function (items, op, divisor, friend1, friend2) {
    this.items = items;
    this.op = op;
    this.divisor = divisor;
    this.friend1 = friend1;
    this.friend2 = friend2;
    this.destination = null;
    this.inspection = 0;
}

Monkey.prototype.affectAnxiety = function(val) {
  this.inspection++;
  const operation = this.op.replace(/old/g, val);
  return eval(operation);
}

Monkey.prototype.chooseFriend = function(val1, asd) {
  const isDivisible = (val1 % this.divisor) === 0;
  this.destination = isDivisible ? this.friend1 : this.friend2;
  return this.destination;
}

Monkey.prototype.throwItemTo = function(friend, anxiety) {
  this.items.shift();
  friend.items.push(anxiety)
}

module.exports = Monkey