const LinkedList = function(head = null) {
    this.head = head
}

LinkedList.prototype.size = function() {
    let count = 0; 
    let node = this.head;
    while (node) {
        count++;
        node = node.next
    }
    return count;
}

LinkedList.prototype.getFirst = function() {
    return this.head;
}

LinkedList.prototype.getLast = function() {
    let lastNode = this.head;
    if (lastNode) {
        while (lastNode.next) {
            lastNode = lastNode.next
        }
    }
    return lastNode
}


LinkedList.prototype.getTotalVisited = function() {
    let set = new Set();
    let lastNode = this.head;
    if (lastNode) {
        while (lastNode.next) {
            if(lastNode.visited) {
                set.add(`${lastNode.row},${lastNode.column}`);
            }
            lastNode = lastNode.next
        }
    }
    return set.size;
}

module.exports = LinkedList