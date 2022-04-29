const questions = [
    {
        question: 'Итак, первый вопрос! На каком инструменте, как считается, играл древнерусский певец и сказитель Боян?',
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

const levelMoneyEl = document.querySelectorAll('.level__list-item');
const questionEl = document.querySelector('.question__text');
const ansersEl = document.querySelectorAll('.anser');


function addQuestion(level) {
    questionEl.innerHTML = questions[level].question;
    ansersEl.forEach((anser, index) => {
        anser.innerHTML = questions[level].optionsAnser[index];
    })
};
function compareAnswers(userAnswer, answer) {
    if(userAnswer == answer) return true;
    else return false;
}


function game() {
    let level = 0;
    let userChoice;

    addQuestion(level);

    ansersEl.forEach(btn => btn.addEventListener('click', (e) => {
        userChoice = e.target.innerHTML;
        let anser = questions[level].anser;

        if(compareAnswers(userChoice, anser)) {
            level++;
            addQuestion(level);
        } else {
            console.log(0);
        }
    }))
    
}
game();