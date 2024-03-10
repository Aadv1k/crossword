/*

. . .
b i d
. g .

*/

const CellValue = Object.freeze({
    NUL: 0,
});

class Crossword {
    constructor(...words) {
        this.words = words;

        this.matrix = []

        this.makeMatrix();

        this.wordLocMap = new Map();
        this.addedWordsSet = new Set();
    }


    makeMatrix() {
        let weightedWords = [];

        for (const word of this.words) {
            weightedWords.push([word, this.getConnectivity(word)]);
        }

        weightedWords = weightedWords.sort((x, y) => {
            if (x[1] > y[1]) return -1;
            if (x[1] < y[1]) return 1;

            return 0
        }) 

        console.log(weightedWords)

        this.placeAcross(weightedWords[0][0])
        this.placeDown(weightedWords[1][0], 0, 0, false)

        this.placeDown(weightedWords[2][0], 3, 1)

        this.placeAcross(weightedWords[3][0], 0, 5)
    }


    placeAcross(word, x = 0, y = 0) {
        if (!this.matrix?.[y]) {
            for (let i = 0; i <= y; i++) {
                this.matrix.push([]);
            }
        }

        if (!this.matrix[y]?.[x]) {
            for (let i = 0; i < x; i++) {
                this.matrix[x].push(0);
            }
         }

         this.matrix[y].push(...word.split(""));
    }


    placeDown(word, x = 0, y = 0, tail = true) {
        const offset = word.length - 2

        if (!tail) {
            if (y - word.length < 0) {
                for (let i = 0; i < Math.abs(y - word.length) - 1; i++) {
                    this.matrix.unshift([])
                }
            }
        }


        if (!this?.matrix[y+offset]) {
            for (let i = 0; i <= y + offset; i++) {
                this.matrix.push([]);
            }
        }

        for (let i = y; i < word.length; i++) {
            this.matrix[i][x] = word[i - y];
        }
    }

    getConnectivity(word) {
        const letters = word.split("");
        const wordsToFind = this.words.filter(e => e != word) 

        let total = 0;

        for (let w of wordsToFind) {
            total += w.split("").filter(e => letters.includes(e)).length
        }

        return total
    }

}

/*

  wrap, prey, meet, quit

- give word a "centrality", with how many other words can it possible connect with

  wrap (1), prey (2), meet (1), quit (1)

- sort by the centrality, and length

- prey (3)
- meet (3)
- wrap (1)
- quit (1)


. w . . . .
. r . . . .
. a . m . .
. p r e y .
. . . e . .
q u i t . .
. . . . . .

*/

const m = new Crossword("wrap", "meet", "prey", "quit")
renderMatrix(m.matrix)

function renderMatrix(matrix) {
  const matrixContainer = document.getElementById('board');

  // Clear previous content
  matrixContainer.innerHTML = '';

  // Loop through each row of the matrix
  matrix.forEach(row => {
    // Create a div for each cell in the row
    row.forEach(cell => {
      const cellDiv = document.createElement('div');
      cellDiv.textContent = cell;
      cellDiv.style.width = '30px';
      cellDiv.style.height = '30px';
      cellDiv.style.border = '1px solid black';
      cellDiv.style.display = 'flex';
      cellDiv.style.alignItems = 'center';
      cellDiv.style.justifyContent = 'center';
      matrixContainer.appendChild(cellDiv);
    });
  });
}
