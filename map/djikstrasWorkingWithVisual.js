class WeightedGraph {
    constructor() {
        this.adjecencyList = {};
    }

    addVertex(vertex) {
       if (!this.adjecencyList[vertex]) this.adjecencyList[vertex] = []; 
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjecencyList[vertex1].push({node: vertex2, weight: weight});
        //this.adjecencyList[vertex2].push({node: vertex1, weight: weight});
    }

    timer = ms => new Promise(res => setTimeout(res, ms));

    async djikstras(start, finish) {
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

            colorVisitedPath(smallest.toString());
            await this.timer(10);

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
        return path.concat(smallest).reverse();

    }
}

async function run() {
    let graph = new WeightedGraph();

    let matrix = Array.from(document.getElementById('root').childNodes);
    let lookup = encodeAlphabet();
    console.log(matrix);
    // Create The Vertexes of the Graph
    for (let column = 0; column < matrix.length; column++) {
        let rowLength = Array.from(matrix[column].childNodes).length
        for (let row = 0; row < rowLength; row++) {
            let yAxis = (column).toString();
            let xAxis = lookup[row];
            let vertex = yAxis + xAxis;
            graph.addVertex(vertex);
        }
    }
    console.log(graph.adjecencyList);
    //Establish the Edges of the Graph
    for (let column = 0; column < matrix.length; column++) {
        let rowLength = Array.from(matrix[column].childNodes).length
        for (let row = 0; row < rowLength; row++) {
            let yAxis = (column).toString();
            let xAxis = lookup[row];
            let vertex1 = yAxis + xAxis;
            if (column - 1 >= 0 && matrix[column - 1].childNodes[row].innerText !== 'Wall') {
                let yAxis = (column - 1).toString();
                let xAxis = lookup[row];
                let vertex2 = yAxis + xAxis;
                graph.addEdge(vertex1, vertex2, 1);
            }
            if (row + 1 < rowLength && matrix[column].childNodes[row + 1].innerText !== 'Wall') {
                let yAxis = (column).toString();
                let xAxis = lookup[row + 1];
                let vertex2 = yAxis + xAxis;
                graph.addEdge(vertex1, vertex2, 1);
            }
            if (column + 1 < matrix.length && matrix[column + 1].childNodes[row].innerText !== 'Wall') {
                let yAxis = (column + 1).toString();
                let xAxis = lookup[row];
                let vertex2 = yAxis + xAxis;
                graph.addEdge(vertex1, vertex2, 1);
            }
            if (row - 1 >= 0 && matrix[column].childNodes[row - 1].innerText !== 'Wall') {
                let yAxis = (column).toString();
                let xAxis = lookup[row - 1];
                let vertex2 = yAxis + xAxis;
                graph.addEdge(vertex1, vertex2, 1);
            }
            
        }
    }

    let start = findStart();
    let end = findEnd();
    let path = await graph.djikstras(start, end);
    console.log(path);
    path.forEach(colorTruePath);


}



function findStart() {
    let matrix = document.getElementById('root');
    let lookup = encodeAlphabet();
    for (let columns = 0; columns < matrix.childNodes.length; columns++) {
        for (let row = 0; row < matrix.childNodes[columns].childNodes.length; row++) {
            if (matrix.childNodes[columns].childNodes[row].id === 'start') {
                let yAxis = (columns).toString()
                let xAxis = lookup[row];
                let result = yAxis + xAxis;
                return result;
            } 
        }
    }
    return -1;
}

function findEnd() {
    let matrix = document.getElementById('root');
    let lookup = encodeAlphabet();
    for (let columns = 0; columns < matrix.childNodes.length; columns++) {
        for (let row = 0; row < matrix.childNodes[columns].childNodes.length; row++) {
            if (matrix.childNodes[columns].childNodes[row].id === 'end') {
                let yAxis = (columns).toString()
                let xAxis = lookup[row];
                let result = yAxis + xAxis;
                return result;
            } 
        }
    }
    return -1;
}

function encodeAlphabet() {
    let obj = {
        '0': 'A',
        '1': 'B',
        '2': 'C',
        '3': 'D',
        '4': 'E',
        '5': 'F', 
        '6': 'G',
        '7': 'H',
        '8': 'I',
        '9': 'J',
        '10': 'K',
        '11': 'L',
        '12': 'M',
        '13': 'N',
        '14': 'O',
        '15': 'P',
        '16': 'Q',
        '17': 'R',
        '18': 'S',
        '19': 'T',
        '20': 'U',
        '21': 'V',
        '22': 'W',
        '23': 'X',
        '24': 'Y',
        '25': 'Z'
    };

    return obj;
}

function decodeAlphabet() {
    let obj = {
        'A': '0',
        'B': '1',
        'C': '2',
        'D': '3',
        'E': '4',
        'F': '5', 
        'G': '6',
        'H': '7',
        'I': '8',
        'J': '9',
        'K': '10',
        'L': '11',
        'M': '12',
        'N': '13',
        'O': '14',
        'P': '15',
        'Q': '16',
        'R': '17',
        'S': '18',
        'T': '19',
        'U': '20',
        'V': '21',
        'W': '22',
        'X': '23',
        'Y': '24',
        'Z': '25'
    };

    return obj;
}

function colorVisitedPath(element) {
    let decode = decodeAlphabet();
    let matrix = document.getElementById('root');
    let columns;
    let row;
    if (element.length === 2) {
        columns = element[0];
        row = decode[element[1]];
    } else {
        columns = element[0] + element[1];
        row = decode[element.slice(2)];
    }
    
    matrix.childNodes[columns].childNodes[row].classList.add('visited');
    
}

function colorTruePath(element) {
    let decode = decodeAlphabet();
    let matrix = document.getElementById('root');
    let columns;
    let row;
    if (element.length === 2) {
        columns = element[0];
        row = decode[element[1]];
    } else {
        columns = element[0] + element[1];
        row = decode[element.slice(2)];
    }
    
    matrix.childNodes[columns].childNodes[row].classList.add('truePath');
    
}
//graph.addVertex('A');
//graph.addEdge('A', 'B', 4);
