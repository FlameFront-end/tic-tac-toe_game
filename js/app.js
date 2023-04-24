const game = document.querySelector('.game')
const res = document.querySelector('.res')
const btnNewGame = document.querySelector('.new-game')
const fields = document.querySelectorAll('.field')

let step = false
let count = 0

const circle = `<svg class="circle">
                    <circle r="45" cx="58" cy="58" stroke="blue"
                    stroke-width="10" stroke-linecap="round"
                    fill="none" />
                </svg>`

const cross = `<svg class="cross">
                <line class="first" x1="15" y1="15" x2="100" y2="100"
                stroke="red" stroke-width="10px" stroke-linecap="round"/>
                <line
                class="second" x1="100" y1="15" x2="15" y2="100"
                stroke="red" stroke-width="10px" stroke-linecap="round"/>
              </svg>`

function stepCross(target) {
    target.innerHTML = cross
    target.classList.add('x')
    const crossAudio = new Audio('assets/audio/cross.mp3')
    crossAudio.play()
    count++
}

function stepCircle(target) {
    target.innerHTML = circle
    target.classList.add('o')
    const circleAudio = new Audio('assets/audio/circle.mp3')
    circleAudio.play()
    count++
}

function init(e) {
    if (!step) stepCross(e.target)
    else stepCircle(e.target)
    step = !step
    findGameWinner()
}

function nawGame() {
    step = false
    count = 0;
    res.innerHTML = ''
    fields.forEach((item) => {
        item.innerHTML = ''
        item.classList.remove('x', 'o', 'active')
    })
    game.addEventListener('click', init)
}

function findGameWinner() {
    const winningCombinations = [
        /*горизонталь*/
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        /*вертикаль*/
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        /*диагональ*/
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
       if (fields[winningCombinations[i][0]].classList.contains('x') &&
        fields[winningCombinations[i][1]].classList.contains('x') &&
        fields[winningCombinations[i][2]].classList.contains('x')) {
            setTimeout(() => {
                fields[winningCombinations[i][0]].classList.add('active')
                fields[winningCombinations[i][1]].classList.add('active')
                fields[winningCombinations[i][2]].classList.add('active')
                res.innerText = 'Выиграли X'
            }, 1500)
           game.removeEventListener('click', init)
        }


        else if (fields[winningCombinations[i][0]].classList.contains('o') &&
            fields[winningCombinations[i][1]].classList.contains('o') &&
            fields[winningCombinations[i][2]].classList.contains('o')) {
            setTimeout(() => {
                fields[winningCombinations[i][0]].classList.add('active')
                fields[winningCombinations[i][1]].classList.add('active')
                fields[winningCombinations[i][2]].classList.add('active')
                res.innerText = 'Выиграли 0'
            }, 1500)
            game.removeEventListener('click', init)
        }
       else if(count === 9 ) {
           setTimeout(() => {
               res.innerText = 'Ничья'
               game.removeEventListener('click', init)
           }, 1500)
       }
    }
}

btnNewGame.addEventListener('click', nawGame)
game.addEventListener('click', init)
