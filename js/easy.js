//VARIABLES
const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score-display')
const question = document.querySelector('.question') 
// const choices = Array.from(document.getElementsByClassName('choice-text')) 
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
const MAX_QUESTIONS = 9 


const ruQuestions = [
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
        question: "Ru Paul, Marle Ginsberg, Santano Rice",
        feedback: "original judging panel", 
        correctAnswer: "True"
    },
    {
        question: "Nina Flowers",
        feedback: "BeBe Zahara Benet was the winner of the first season",
        correctAnswer: "False"
    }, 
    {
        question: "Nina Flowers",
        feedback: "BeBe Zahara Benet was the winner of the first season",
        correctAnswer: "False"
    }, 
    {
        question: "Nina Flowers",
        feedback: "BeBe Zahara Benet was the winner of the first season",
        correctAnswer: "False"
    }, 
    {
        question: "Nina Flowers",
        feedback: "BeBe Zahara Benet was the winner of the first season",
        correctAnswer: "False"
    }, 
    {
        question: "Nina Flowers",
        feedback: "BeBe Zahara Benet was the winner of the first season",
        correctAnswer: "False"
    }, 
    {
        question: "Nina Flowers",
        feedback: "BeBe Zahara Benet was the winner of the first season",
        correctAnswer: "False"
    }, 
    {
        question: "Nina Flowers",
        feedback: "BeBe Zahara Benet was the winner of the first season",
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
    // progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length) 
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML= currentQuestion.question

   
    // choices.forEach (choice => {
    //     const value = choice.dataset['value']
    //     choice.innerHTML = currentQuestion['choice'+ value]
        
    // })
    
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


// choices.forEach(choice => {
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
        

        // incorrectAnswer++
       

        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            selectedChoice.innerHTML= `${selectedAnswer}`
            generateQuestion()
        }, 3000)
         
    // })
})
increaseScore = (num) => {
    score += CORRECT_BONUS
    scoreDisplay.innerHTML = score;
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
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// },
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// },
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// },
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// },
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// },
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// },
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// },
// {
//     question: "Who was the winner of the first season of Ru Paul's Drag Race?",
//     choices: {
//         A: "BeBe Zahara Benet",
//         B: "Nina Flowers",
//         C: "Shangela",
//         D: "Raja"
//     },
//     correctAnswer: "A"
// }