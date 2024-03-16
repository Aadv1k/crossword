class WordEdge {
    constructor(index, wordA, wordB, pivotA, pivotB) {
        this.index = index;

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


        const index = this.edges.length;
        const edge = new WordEdge(index, wordA, wordB, pivotA, pivotB)
        this.edges.push(edge);

        this.words.add(wordA)

        return edge;
    }

    getWordRelationships(word) {
        return this.edges.filter(e => e.wordA === word);
    }

    serializeFrom(...words) {
        for (let i = 0; i < words.length; i++) {
            const currentLetters = words[i].split("")

            let wCopy = Array.from(words);

            wCopy.splice(i, 1);

            for (const word of wCopy) {
                // We find out all possible pivots, but use only one since a word can only be connected to another once
                let [p1, p2] = currentLetters.map((e, i) => [i, word.indexOf(e)]).filter(e => e[1] >= 0)[0];
                this.defineWordRelationship(words[i], word, p1, p2);
            }
        }
    }

    getNPossiblePermutations(n) {
        let possibleConfigurations = [];

        const startingWord = Array.from(this.words)[0]; 
        let start = null;

        for (let i = 0; i < n; i++) {
            let current = [], visitedWords = [];

            while (true) {
                let words = wg.getWordRelationships(start?.wordB ?? startingWord)
                let elem = words.filter(e => !visitedWords.includes(e.wordB))
                elem = elem?.[i] ?? elem[elem.length - 1];

                if (!elem) {
                    break
                }

                visitedWords.push(elem.wordB);
                visitedWords.push(elem.wordA);

                current.push(elem);
                start = elem;
            }

            possibleConfigurations.push(current);
        }

        return possibleConfigurations;
    }
}



const wg = new WordGraph();
wg.serializeFrom("pineapple", "hexagon", "watch", "bat");

let match = wg.getNPossiblePermutations(1)[0]

console.log(match);

// index: 4,
// wordA: 'hexagon',
// wordB: 'watch',
// pivotA: 0,
// pivotB: 4




matrix.putWordAcross("hexagon", 0, 4); // x, y
matrix.putWordDown("watch", 0, 0)



/* 
........W......
........A......
........T......
........C......
........HEXAGON
*/


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


/*
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

}


*/
