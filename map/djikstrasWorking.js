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

class WeightedGraph {
    constructor() {
        this.adjecencyList = {};
    }

    addVertex(vertex) {
       if (!this.adjecencyList[vertex]) this.adjecencyList[vertex] = []; 
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjecencyList[vertex1].push({node: vertex2, weight: weight});
        this.adjecencyList[vertex2].push({node: vertex1, weight: weight});
    }

    djikstras(start, finish) {
        let nodes = new PriorityQueue();
        let distances = {};
        let previous = {};
        let smallest;
        let path = [];

        // build up initial state
        for (let vertex in this.adjecencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                // we are done
                // build path to return
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjecencyList[smallest]) {
                    // find neighboring nodes in graph
                    let nextNode = this.adjecencyList[smallest][neighbor];
                    // calculate new distance to neighboring nodes
                    let possibleNode = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (possibleNode < distances[nextNeighbor]) {
                        // updating new smallest distance to neighbor
                        distances[nextNeighbor] = possibleNode;
                        // updating previous - how we got to neighbor
                        previous[nextNeighbor] = smallest;
                        // enqueue in prio-Q with new neighbor
                        nodes.enqueue(nextNeighbor, possibleNode);
                    }
                }
            }
        }
        console.log(path);
        return path.concat(smallest).reverse();

    }
}


let graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

console.log(graph.djikstras('A', 'E'));