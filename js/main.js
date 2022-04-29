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


let startAudio = new Audio('../music/start.mp3');
let timerAudio = new Audio('../music/timer.mp3');

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

function getAndComparisonAnser() {
    let userAnser = this.innerHTML;
    
    if(userAnser == questions[level].anser) {
        level++;
        ansersEl.forEach(anser => anser.classList.remove('show'));
        timerEl.classList.remove('show');
        timerAudio.pause();
        timerAudio.currentTime = 0;
        game();
    }
}

function game() {
    createCardGame();

    ansersEl.forEach(btn => btn.addEventListener('click', getAndComparisonAnser));
}

startGameEl.addEventListener('click', showGame);