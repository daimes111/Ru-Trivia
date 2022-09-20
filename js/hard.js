//VARIABLES
const game = document.getElementById("game")
const scoreDisplay = document.getElementById("score-display")
const question = document.querySelector(".question") 
const choicesContainer = document.querySelector('.choices-container')
const differentChoices = document.querySelectorAll('.choice-text')
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
        question: "Who is the youngest winner in the RuPaul franchise?",
        choices : [
            "Aquaria",
            "Violet Chachki",
            "Tyra Sanchez",
            "Krystal Versace"
        ],
        correctAnswer: "Krystal Versace"
    }, 
    {
        question: "In RuPaul’s Drag Race Season 9, which queen had to bow out due to an injury sustained in the cheerleading challenge?",
        choices : [
            "Kimora Blac",
            "Eureka O’Hara",
            "Farah Moan",
            "Trinity Taylor"
        ],
        correctAnswer: "Eureka O’Hara"
    },
    {
        question: "Who won the title of Miss Congeniality in RuPaul's Drag Race Season 12?",
        choices : [
            "Jaida Essence Hall",
            "Heidi N Closet",
            "Jan",
            "Brita"
        ],
        correctAnswer: "Heidi N Closet"
    },
    {
        question: "Who are the judges on Drag Race Espana?",
        choices : [
            "Ru Paul, Michelle Visage, Carson Kressley, Ross Matthews",
            "Carmen Farala, Alexis Mateo, Lady Morgana",
            "Supremme de Luxe, Ana Locking, Javier Ambrossi, Javier Calvo",
            "Ru Paul, Marle Ginsberg, Santano Rice"
        ],
        correctAnswer: "Supremme de Luxe, Ana Locking, Javier Ambrossi, Javier Calvo"
    },
    {
        question: "Finish this phrase, `I'd like to _________ please`?",
        choices : [
            "challenge the winner",
            "use my safety",
            "lipsync for the win",
            "keep it on"
        ],
        correctAnswer: "keep it on"
    },
    {
        question: "What BBC show was referenced in Drag Race UK Season 1 Snatch Game",
        choices : [
            "Great British Bake Off",
            "Doctor Who",
            "The Crown",
            "Sherlock"
        ],
        correctAnswer: "Great British Bake Off"
    },
    {
        question: "Who was the first ever contestant eliminated from RuPaul's Drag Race",
        choices : [
            "Victoria `Porkchop` Parker",
            "Crystal Labeija",
            "Tammie Brown",
            "Venus D-Lite"
        ],
        correctAnswer: "Victoria `Porkchop` Parker"
    },
    {
        question: "What colour was Phi Phi O'Hara's leotard that she wore as her final outfit on the runway",
        choices : [
            "Pink Leopard Print",
            "Pink Tiger Print",
            "Orange Leopard Print",
            "Rainbow"
        ],
        correctAnswer: "Pink Leopard Print"
    },
    {
        question: "Spell Katya's full name correctly",
        choices : [
            "Yekatterina Petrovna",
            "Yekaterina Petrovna Zamolodchikova",
            "Yekatterina Zamolodchikova",
            "Yekatterina Petrovna Zamolodchikova"
        ],
        correctAnswer: "Yekatterina Petrovna Zamolodchikova"
    },
    {
        question: "Who was the winner of Drag Race UK Season 1?",
        choices : [
            "The Vivienne",
            "Divina De Campo",
            "Crystal",
            "Baga Chipz"
        ],
        correctAnswer: "The Vivienne"
    }
]

startGame = (evt) => {
    questionCounter = 0
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
    startTimer(resetCounter)
    startLineTimer(resetWidth)
    // update progress bar
    progressText.innerHTML= `Question <span>${questionCounter}</span> of <span>${MAX_QUESTIONS}</span>`
    
    const questionIndex =  Math.floor(Math.random() * availableQuestions.length) 
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML= currentQuestion.question
    
    for (let i =0; i < differentChoices.length; i++) {
        differentChoices[i].textContent= currentQuestion.choices[i]
    }
    
    availableQuestions.splice(questionIndex, 1)
    
    acceptingAnswers = true
    
}
for (let i = 0; i < differentChoices.length; i++){
    differentChoices[i].addEventListener('click', evt => {
        if (!acceptingAnswers) return

        acceptingAnswers= false
        const selectedChoice = evt.target
        const selectedAnswer = selectedChoice.textContent
        
        const classToApply = selectedAnswer == currentQuestion.correctAnswer ? 'correct' : 'incorrect'
        
        if (classToApply === 'correct') {
             increaseScore()
             progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
        } else if (classToApply === 'incorrect') {
            incorrectAnswer++
            if (incorrectAnswer >= 3) {
                return window.location.assign('/loseEnd.html')
            }
        } else

        progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
        selectedChoice.parentElement.classList.add(classToApply)

        clearInterval(counter)
        clearInterval(counterLine)
       
        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            
            generateQuestion()
        }, 500)
         
    })
}
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
        if(time < 9) {
            let withZero = timerCount.innerHTML
            timerCount.innerHTML = ` <span>0${withZero}</span>`
        }
        if(time < 0){
            clearInterval(counter)
            timerCount.textContent = "00"

            setTimeout ( () => {
                clearInterval(counter)
                clearInterval(counterLine)
                incorrectAnswer++
                if (incorrectAnswer >= 3) {
                    return window.location.assign('/loseEnd.html')
                }
                generateQuestion()
            }, 400)

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
