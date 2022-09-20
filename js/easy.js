//VARIABLES
const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score-display')
const question = document.querySelector('.question') 
const choicesContainer = document.querySelector('.choices-container')
const choiceText = document.querySelector('.choice-text')
const progressText = document.getElementById('progressText')
const progressBarFull = document.getElementById('progressBarFull')
const endContainer = document.querySelector('.end-container')
let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []
let incorrectAnswer = 0
const CORRECT_BONUS = 5
const MAX_QUESTIONS = 10 


const ruQuestions = [
    {
        question: "RuPaul's Drag Race is an International show",
        feedback: "Drag Race IS an International show, premiering in the Philippines, Spain, the UK, and more ", 
        correctAnswer: "True"
    },
    {
        question: `RuPaul walks down the runway to her song <a href="https://www.youtube.com/watch?v=4nTl4Rmf6AI">Supermodel</a>`,
        feedback: "RuPaul walks down to her song Cover Girl", 
        correctAnswer: "False"
    },
    {
        question: "Shangela was the 1st queen to be eliminated and return on another season",
        feedback: "Shangela was eliminated in season 2 and returned in season 3 and AllStars season 3", 
        correctAnswer: "True"
    },
    {
        question: "RuPaul wears different color wigs, but you would mostly see her in a blonde wig.",
        feedback: "RuPaul's premiered in her hit single, Supermodel (You Better Work), in 1992 with a blonde wig.", 
        correctAnswer: "True"
    },
    {
        question: "Snatch Game is one of the favorite compeitions the queens get to participate in.",
        feedback: "Snatch Game is an impersonation game and is in almost every season (international included).", 
        correctAnswer: "True"
    },
    {
        question: "Rol-aksa-tox refers to Alaska, Detox, and RuPaul",
        feedback: "Rol-aska-tox refers to Alaska, Detox, and Roxxxy Andrews.",
        correctAnswer: "False"
    }, 
    {
        question: "Michelle Visage is a regular judge on RuPaul",
        feedback: "Michelle has been on every US episode since season 3 and has premiered in some international episodes.",
        correctAnswer: "True"
    }, 
    {
        question: "Shangela is the queen who has competed the most.",
        feedback: "Jujubee actually has competed the most with 4 seasons.",
        correctAnswer: "False"
    }, 
    {
        question: "RuPaul ends every episode with 'How in the hell you going to love somebody else'?",
        feedback: "RuPaul ends every episode with 'How in the hell you gonna love somebody else'",
        correctAnswer: "False"
    }, 
    {
        question: "There are only 2 queens who have been disqualifed from RuPaul.",
        feedback: "There are 4 queens including: Willam Belli, Gong Hyo, Sherry Pie, Norma Jean",
        correctAnswer: "False"
    }, 
    {
        question: "Contestants only have to get themselves into drag",
        feedback: "Some competitons require the queens to get others into drag including family, crew, fans, and more",
        correctAnswer: "False"
    }, 
    {
        question: "Every episode in a season has the same judging panel",
        feedback: "There is typically a guest judge including celebrities such as Regina King, Lady Gaga, Trina, and many more",
        correctAnswer: "False"
    } 

]

startGame = (evt) => {
    questionCounter = 0
    incorrectAnswer = 0
    score = 0
    availableQuestions= [...ruQuestions]
    generateQuestion()
}

// generate question at random in the available questions array
generateQuestion = (evt) => {
    
    questionCounter++
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {

        // got to the game over page
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    // Reset choice container


    // update progress bar
    progressText.innerHTML= `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length) 
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML= currentQuestion.question
    
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choicesContainer.addEventListener('click', evt => {
    if (!acceptingAnswers) return

    acceptingAnswers= false
    const selectedChoice = evt.target
    const selectedAnswer = selectedChoice.dataset['value']
    const classToApply = selectedAnswer == currentQuestion.correctAnswer ? 'correct' : 'incorrect'
    
    if (classToApply === 'correct') {
            increaseScore()
            progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
        selectedChoice.innerHTML= `
        Correct! ${currentQuestion.feedback}
        `
    } else if (classToApply === 'incorrect') {
        incorrectAnswer++
        selectedChoice.innerHTML= `
        Gurl! ! ${currentQuestion.feedback}
        `
        if (incorrectAnswer >= 3) {
            return window.location.assign('/loseEnd.html')
        }
    } else

    progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
    selectedChoice.parentElement.classList.add(classToApply)
    
    setTimeout ( () => {
        selectedChoice.parentElement.classList.remove(classToApply)
        selectedChoice.innerHTML= `${selectedAnswer}`
        generateQuestion()
    }, 3000)
         
})
increaseScore = (num) => {
    score += CORRECT_BONUS
    scoreDisplay.innerHTML = score;
} 
startGame()
