class WordEdge {
    constructor(wordA, wordB, pivotA, pivotB) {
        this.wordA = wordA;
        this.wordB = wordB;

        this.pivotA = pivotA;
        this.pivotB = pivotB;
    }
}



class WordGraph {


    constructor() {
        this.edges = [];
        this.words = new Set();
    }

    defineWordRelationship(wordA, wordB, pivotA, pivotB) {
        // A wordA and wordB, may have multiple pivots associated with them.
        const dup = this.edges.find(e => {
            if ((e.wordA == wordA && e.wordB == wordB) 
                && (e.pivotA == pivotA && e.pivotB == pivotB)) return true;
        })

        if (dup) return null;

        const edge = new WordEdge(wordA, wordB, pivotA, pivotB)
        this.edges.push(edge);

        return edge;
    }

    defineWord(word) {
        this.words.set(word);
    }

    getWordRelationships(word) {
        return this.edges.filter(e => e.wordA === word);
    }

}


const words = ["pineapple", "hexagon", "watch", "bat"];

const wg = new WordGraph();

for (let i = 0; i < words.length; i++) {
    const currentLetters = words[i].split("")

    let wCopy = Array.from(words);
    wCopy.splice(i, 1);

    for (const word of wCopy) {
        // We find out all possible pivots, but use only one since a word can only be connected to another once
        let [p1, p2] = currentLetters.map((e, i) => [i, word.indexOf(e)]).filter(e => e[1] >= 0)[0];

        console.log(words[i], word, p1, p2);
        wg.defineWordRelationship(words[i], word, p1, p2);
    }
}


function visitOne(start) {

    return visited;
}


console.log(visitOne("pineapple"));


/*
Pineapple
Hexagon
Watch
Bat

HEXAGON -> WATCH, PINEAPPLE
PINEAPPLE -> HEXAGON, BAT, WATCH

      H
      E 
      X 
     WATCH
      G
      O B
    PINEAPPLE
        T
*/


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



    for (const letters of words) {
        for (const letter of letters) {
            // 
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
