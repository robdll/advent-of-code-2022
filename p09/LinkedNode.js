const ListNode = function(row, column, visited = false) {
    this.row = row
    this.column = column
    this.visited = visited
    this.next = null
}

module.exports = ListNode