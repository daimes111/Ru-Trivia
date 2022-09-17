//VARIABLES
const game = document.getElementById("game")
const scoreDisplay = document.getElementById("score-display")
const question = document.querySelector(".question") 
const choices = Array.from(document.getElementsByClassName('choice-text')) 
const progressText = document.getElementById('progressText')
const progressBarFull = document.getElementById('progressBarFull')
const submitBtn = document.querySelector(".submit-Btn")
const nextBtn = document.querySelector(".next-Btn")
const endContainer = document.querySelector(".end-container")
const timerCount = document.querySelector('.timer-count')
const timerLine = document.querySelector('.timer-line')

let currentQuestion =  {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []
let incorrectAnswer = 0
let counter
let resetCounter = 10
let resetWidth = 0
const CORRECT_BONUS = 10
const MAX_QUESTIONS = 9 



const ruQuestions = [
    {
        question: "Who was the winner of the first season of Ru Paul's Drag Race?",
        choices: [
            "BeBe Zahara Benet",
            "Nina Flowers",
            "Shangela",
            "Raja"
        ],
        correctAnswer: "BeBe Zahara Benet"
    },
    {
        question: "Ru Paul, Marle Ginsberg, Santano Rice",
        feedback: "original judging panel", 
        correctAnswer: "True"
    },
    {
        question: "Who was the winner of the first season of Ru Paul's Drag Race?",
        choices: [
            "BeBe Zahara Benet",
            "Nina Flowers",
            "Shangela",
            "Raja"
        ],
        correctAnswer: "BeBe Zahara Benet"
    },
    {
        question: "Who was the winner of the first season of Ru Paul's Drag Race?",
        choices: [
            "BeBe Zahara Benet",
            "Nina Flowers",
            "Shangela",
            "Raja"
        ],
        correctAnswer: "BeBe Zahara Benet"
    },
    {
        question: "Ru Paul, Marle Ginsberg, Santano Rice",
        feedback: "original judging panel", 
        correctAnswer: "True"
    },
    {
        question: "Who was the winner of the first season of Ru Paul's Drag Race?",
        choices: [
            "BeBe Zahara Benet",
            "Nina Flowers",
            "Shangela",
            "Raja"
        ],
        correctAnswer: "BeBe Zahara Benet"
    },
    {
        question: "Ru Paul, Marle Ginsberg, Santano Rice",
        feedback: "original judging panel", 
        correctAnswer: "True"
    },
    {
        question: "Ru Paul, Marle Ginsberg, Santano Rice",
        feedback: "original judging panel", 
        correctAnswer: "True"
    },
    {
        question: "Who was the winner of the first season of Ru Paul's Drag Race?",
        choices: [
            "BeBe Zahara Benet",
            "Nina Flowers",
            "Shangela",
            "Raja"
        ],
        correctAnswer: "BeBe Zahara Benet"
    }

]

startGame = (evt) => {
    questionCounter = 0
    score = 0
    availableQuestions= [...ruQuestions]
    generateQuestion()
    startTimer(resetCounter)
    
}

// generate question at random in the available questions array
generateQuestion = (evt) => {
    questionCounter++
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {

        // got to the game over page
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    startTimer(resetCounter)
    startLineTimer(resetWidth)
    // update progress bar
    progressText.innerHTML= `Question <span>${questionCounter}</span> of <span>${MAX_QUESTIONS}</span>`
    // progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
    
    const questionIndex =  Math.floor(Math.random() * availableQuestions.length) 
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML= currentQuestion.question

   
    choices.forEach (choice => {
        const value = choice.dataset['value']
        choice.innerHTML = currentQuestion['choice'+ value]
        
    })
    
    availableQuestions.splice(questionIndex, 1)
    
    acceptingAnswers = true
    
    // attempt to turn choices into an array
    // const choices = Object.keys(ruQuestions[0].choices)
    // console.log(ruQuestions[0].choices)

    // Attempt to create lables for choices
    // ruQuestions[0].answers.forEach(element => {
        
            
            // const choicesA = document.querySelector('A')
            // choices.classList.add('choices')
            // choicesContainer.appendChild(choices)
            // choicesA.innerHTML= ruQuestions[0].choices.A
    
    // }
}


choices.forEach(choice => {
    choice.addEventListener('click', evt => {
        if (!acceptingAnswers) return

        acceptingAnswers= false
        const selectedChoice = evt.target
        const selectedAnswer = selectedChoice.dataset['value']
 
        const classToApply = selectedAnswer == currentQuestion.correctAnswer ? 'correct' : 'incorrect'
        
        if (classToApply === 'correct') {
             increaseScore()
             progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
        } else if (classToApply === 'incorrect') {
            incorrectAnswer++
            if (incorrectAnswer >= 3) {
                return window.location.assign('/end.html')
                endContainer.innerHTML= `
                <h2>Go back to Party City, where you belong!</h2>
                <h2>Chil' you need to go brush up on your herstory</h2>
                `
                
            }
        } else

        progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
        selectedChoice.parentElement.classList.add(classToApply)

        // incorrectAnswer++
       
        clearInterval(counter)
        clearInterval(counterLine)
        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            
            generateQuestion()
        }, 500)
         
    })
})
increaseScore = (num) => {
    score += CORRECT_BONUS
    scoreDisplay.innerHTML = score;
} 

// timer function
startTimer = (time) => {
     counter = setInterval(timer, 1000);
     function timer() {
        timerCount.innerHTML = time
        time--
        // add double digit
        if(time < 9) {
            let withZero = timerCount.innerHTML
            timerCount.innerHTML = ` <span>0${withZero}</span>`
        }
        if(time < 0){
            clearInterval(counter)
            timerCount.textContent = "00"

        }
     }
}
startLineTimer = (time) => {
     counterLine = setInterval(timer, 53);
     function timer() {
        time += 1; 
        timerLine.style.width = time + 'px'
        if(time > 200){
            clearInterval(counterLine) 
        }
     }
}
startGame()





//first code
//Build to show the question and the answer

// // variables
// const mediumQuestion = document.querySelector(".medium-question")
// const choicesContainer = document.querySelector(".choices-container")
// const submitBtn = document.getElementById('submit-btn')

// //functions
// function buildQuestion() {
//     // variable to store the HTML outout
//     const output = [];

//     ruQuestions.forEach((currentQuestion, questionNumber) => {
//          //stores the list of possible answers
//          const answers = [];

//          //and for each available answer
//          for(letter in currentQuestion.answers){

//             //add button
//             answers.push(
//                 ''
//             )
//          }
//     })
// }

// function showResults() {
// }
// buildQuestion();
//button event listeners
// submitBtn.addEventListener('click', showResults);

// different objects if we came get a loop to Worker
