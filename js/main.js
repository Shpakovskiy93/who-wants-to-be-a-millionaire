const questions = [
    {
        question: 'На каком инструменте, как считается, играл древнерусский певец и сказитель Боян?',
        optionsAnser: ['На гуслях', 'На виолончели', 'На баяне', 'На гитаре'],
        anser: 'На гуслях',
    },
    {
        question: 'В какой из этих стран один из официальных языков - французский?',
        optionsAnser: ['Республика Гаити', 'Кения', 'Эквадор', 'Венесуэла'],
        anser: 'Республика Гаити',
    },
    {
        question: 'В каком из этих фильмов не снимался Александр Абдулов?',
        optionsAnser: ['"Карнавал"', '"Московские каникулы"', '"Чародеи"', '"Убить дракона"'],
        anser: '"Московские каникулы"',
    },
];

const startGameEl = document.querySelector('.start__game');
const levelMoneyEl = document.querySelectorAll('.level__list-item');
const questionEl = document.querySelector('.question__text');
const ansersEl = document.querySelectorAll('.anser');
const timerEl = document.querySelector('.timer');
const lostEl = document.querySelector('.lost');
const winGameEl = document.querySelector('.win__game');


let startAudio = new Audio('../music/start.mp3');
let timerAudio = new Audio('../music/timer.mp3');
let winAnserAudio = new Audio('../music/win-anser.mp3');
let lostAudio = new Audio('../music/lost.mp3');
let endGame = new Audio('../music/end-game.mp3');

let level = 0;
let timer;


function showGame() {
    document.querySelector('.millionaire__inner').classList.add('show');
    document.querySelector('.millionaire__question').classList.add('show');
    startGameEl.classList.add('hide');
    game();
}

function startTimer() {
    timerEl.classList.add('show');
    let second = 30;
    timerEl.innerHTML = second;
    timer = setInterval(() => {
        second--;
        timerEl.innerHTML = second;
    }, 1000);
};

function createCardGame() {
    questionEl.innerHTML = questions[level].question;
    ansersEl.forEach((anser, index) => {
        setTimeout(() => {
                anser.innerHTML = questions[level].optionsAnser[index];
                anser.classList.add('show');
                if(timer) clearInterval(timer);
                startTimer();
                timerAudio.play();
        }, 3000);
    })
}

function winLevel(anser) {

    timerAudio.pause();
    timerAudio.currentTime = 0;
    timerEl.classList.remove('show');

    setTimeout(() => {
        ansersEl.forEach(elem => elem.classList.remove('choice__anser'))
        anser.classList.add('right__anser');
        winAnserAudio.play();
    }, 3000);

    setTimeout(() => {
        winAnserAudio.pause();
        winAnserAudio.currentTime = 0;
        levelMoneyEl.forEach(elem => elem.classList.remove('list__item-active'));
        levelMoneyEl[level].classList.add('list__item-active');
        level++;
        ansersEl.forEach(anser => anser.classList.remove('show'));
        anser.classList.remove('right__anser');
        game();
    }, 6000);
}
function lostGame(anser) {
    timerAudio.pause();
    timerAudio.currentTime = 0;
    timerEl.classList.remove('show');

    setTimeout(() => {
        ansersEl.forEach(elem => elem.classList.remove('choice__anser'))
        anser.classList.add('wrong__anser');
        lostAudio.play();
    }, 3000);

    setTimeout(() => {
        lostAudio.pause();
        lostAudio.currentTime = 0;
        levelMoneyEl.forEach(elem => elem.classList.remove('list__item-active'));
        level = 0;
        ansersEl.forEach(anser => anser.classList.remove('show'));
        anser.classList.remove('wrong__anser');

        document.querySelector('.millionaire__inner').classList.remove('show');
        document.querySelector('.millionaire__question').classList.remove('show');
        startGameEl.classList.remove('hide');
    }, 6000);
}

function getAndComparisonAnser() {
    this.classList.add('choice__anser');
    let userAnser = this.innerHTML;
    
    if(userAnser == questions[level].anser) {
        winLevel(this);
    } else {
        lostGame(this);
    }
}

function game() {

    if(level == 2) {
        document.querySelector('.millionaire__inner').classList.remove('show');
        document.querySelector('.millionaire__question').classList.remove('show');
        winGameEl.classList.add('show');
        endGame.play();
    } else {
        createCardGame();
        ansersEl.forEach(btn => btn.addEventListener('click', getAndComparisonAnser));
    }
}

startGameEl.addEventListener('click', showGame);