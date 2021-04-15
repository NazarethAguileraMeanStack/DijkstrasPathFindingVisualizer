class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => { return a.priority - b.priority });
    }
}

// let q = new PriorityQueue();

// q.enqueue('N', 15);
// q.enqueue('A', 3);
// q.enqueue('Z', 7);
// q.enqueue('Y', 14);

// console.log(q);