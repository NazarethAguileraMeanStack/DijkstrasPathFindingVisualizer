class Controller {
    constructor() {
        this.value = 2;
    }

    reduce() {
        this.value--;
    }

    getValue() {
        return this.value;
    }
};

// USE THIS TO MAKE MAP BIGGER
// ADJUST COLUMNS AND ROWS
function createMatrix() {
    let matrix = [];
    let temp = [];
    for (let column = 0; column < 20; column++) {
        for (let row = 0; row < 25; row++) {
            temp.push(true);
        }
        matrix.push(temp);
        temp = [];
    }

    return matrix;
}


function initMap() {
    let root = document.getElementById('root');
    let matrix = createMatrix();

    for (let column = 0; column < matrix.length; column++) {
        let divRow = document.createElement('div');
        for (let row = 0; row < matrix[column].length; row++) {
            let div = document.createElement('div');
            div.classList.add('grid');
            divRow.appendChild(div);
        }
        root.appendChild(divRow);
        
    }

    initEventListener(root);

    return;
}

function reset() {
    let root = document.getElementById('root');
    root.innerHTML = '';
    initMap();
}

function initEventListener(root) {
    let controller = new Controller();
    root.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('grid')
        && !e.target.id) {
            if (controller.getValue() === 2) {
                e.target.style.backgroundColor = 'red';
                e.target.innerText = 'Start';
                e.target.color = 'black';
                e.target.setAttribute('id', 'start');
                controller.reduce();
            } else if (controller.getValue() === 1) {
                e.target.style.backgroundColor = 'blue';
                e.target.innerText = 'End';
                e.target.color = 'white';
                e.target.setAttribute('id', 'end');
                controller.reduce();
            } else {
                e.target.style.backgroundColor = 'black';
                e.target.innerText = 'Wall';
                e.target.color = 'white';
                e.target.classList.add('wall');
                controller.reduce();
            }
        }
        
        

    });
}

initMap();

