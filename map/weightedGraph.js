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
}


let weightedGraph = new WeightedGraph();

weightedGraph.addVertex('A');
weightedGraph.addVertex('B');
weightedGraph.addVertex('C');
weightedGraph.addEdge('A', 'B', 2);
weightedGraph.addEdge('B', 'C', 3);
weightedGraph.addEdge('C', 'A', 1);

console.log(weightedGraph);