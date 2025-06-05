class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(priority, time, data) {
    this.items.push({ priority, time, data });
    this.items.sort((a, b) => a.priority - b.priority || a.time - b.time);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

module.exports = PriorityQueue;
