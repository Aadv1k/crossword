class Graph {
    constructor() {
        this.edges = new Map();
        this.vertices = new Set();
    }

    addEdge(x, y) {
        // TODO: check if both vertices exist
        this.edges.set(x, y);
    }

    hasVertex(x) {
        return this.vertices.has(x);
    }

    addVertex(x) {
        // TODO: check if vtx already exists
        this.vertices.add(x);
    }
}

class WordMatrix {
    constructor() {
        this.matrix = [];

        this.width = 5;
        this.height = 5;

        for (let i = 0; i <= this.height; i++) {
            let row = [];
            for (let j = 0; j <= this.width; j++)  {
                row.push("");
            }
            this.matrix.push(row);
        }
    }

    putLetter(a) {
        const x = Math.floor(Math.random() * 100) % this.height + 1;
        const y = Math.floor(Math.random() * 100) % this.width + 1;

        this.matrix[y][x] = a;

        return [x, y]
    }

    putLetterAfter(a, x, y) { /* NOT IMPLEMENTED */ }
    putLetterBefore(a, x, y) { /* NOT IMPLEMENTED */ }
    putLetterAbove(a, x, y) { /* NOT IMPLEMENTED */ }
    putLetterBelow(a, x, y) { /* NOT IMPLEMENTED */ }
}

function build(...words) {
    words = words.sort((x, y) => {
        if (x.length > y.length) return -1;
        if (x.length < y.length) return 1;
        return 0
    }).map(e => e.split(""));



    let stack = [], edges = [], vertices = [];

    const g = new Graph();
    const matrix = new WordMatrix();

    for (const word of words) {
        for (let i = 0; i < word.length - 1; i++) {
            let lp1 = word[i], 
                lp2 = word[i+1];

            if (g.hasVertex(lp2)) {
                g.addEdge(lp1, lp2);
                continue;
            }

            if (g.hasVertex(lp1)) { 
                g.addEdge(lp2, lp1)
                continue;
            }

            g.addVertex(lp1)
            g.addVertex(lp2)

            g.addEdge(lp1, lp2);
            g.addEdge(lp2, lp1);
        }
    }

    words.forEach(letters => {
        let curX = 0, curY = 0;
        for (let i = 0; i < letters.length; i++) {
            if (!g.edges.get(letters[i])) {
               const [x, y] = matrix.putLetter(letters[i]) ;
               curX = x;
               curY = y;
            }


        }
    })



    return []
}


console.log(build("bar", "baz"));
