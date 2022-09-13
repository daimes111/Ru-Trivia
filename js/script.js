//VARIABLES
const game = document.getElementById("game")
const scoreDisplay = document.getElementById("score-display")
const question = document.querySelector(".question") 
const choices = Array.from(document.getElementsByClassName('choice-text')) 
const progressText = document.getElementById('progressText')
const progressBarFull = document.getElementById('progressBarFull')
const submitBtn = document.querySelector(".submit-Btn")
const nextBtn = document.querySelector(".next-Btn")
let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []
const CORRECT_BONUS = 10
const MAX_QUESTIONS = 9 

const ruQuestions = [
    {
        question: "Name the original judging panel from Season 1",
        choiceA: "Ru Paul, Santino Rice, Michelle Visage",
        choiceB: "Ru Paul, Marle Ginsberg, Santino Rice, Michelle Visage",
        choiceC: "Ru Paul, Marle Ginsberg, Santano Rice",
        choiceD: "Ru Paul, Michelle Viasge, Tyra Banks", 
        correctAnswer: "C"
    },
    {
        question: "Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "2Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet2",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "3Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet3",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "4Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet4",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "5Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet5",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "6Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet6",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "7Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet7",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "8Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet8",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "9Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Bene9t",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "10Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet10",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }, 
    {
        question: "11Who was the winner of the first season of Ru Paul's Drag Race?",
        choiceA: "BeBe Zahara Benet11",
        choiceB: "Nina Flowers",
        choiceC: "Shangela",
        choiceD: "Raja",
        correctAnswer: "A"
    }

]

startGame = (evt) => {
    questionCounter = 0;
    score = 0;
    availableQuestions= [...ruQuestions]
    generateQuestion()
}

// generate question at random in the available questions array
generateQuestion = (evt) => {
    
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){

        // got to the game over page
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++

    // update progress bar
    progressText.innerHTML= `Question ${questionCounter} of ${MAX_QUESTIONS}`
    console.log((questionCounter/MAX_QUESTIONS)* 100)
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS)* 100}%`

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
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers= false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['value']

        let classToApply = 'incorrect'
        if (selectedAnswer == currentQuestion.correctAnswer) {
             classToApply = 'correct'
             increaseScore()
        } 

      
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            generateQuestion()
        }, 1000)
        
    })
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