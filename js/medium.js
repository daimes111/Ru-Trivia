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
let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []
let incorrectAnswer = 0
const CORRECT_BONUS = 10
const MAX_QUESTIONS = 9 

console.log(choices)

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
        question: "What year did RuPaul's Drag Race begin?",
        choiceA: "2009",
        choiceB: "1999",
        choiceC: "2014",
        choiceD: "2019",
        correctAnswer: "A"
    }, 
    {
        question: "This iconic mascot has gotten to walk the runway on season 7.",
        choiceA: "Mickey Mouse",
        choiceB: "Hello Kitty",
        choiceC: "Pink Panther",
        choiceD: "Brown M&M",
        correctAnswer: "B"
    }, 
    {
        question: "Where did the phrase 'She already done had herses' come from?",
        choiceA: "RuPaul made it up",
        choiceB: "One of the queens said it when she won",
        choiceC: "Ru overhear it in a fast food shop",
        choiceD: "Michelle Visage once said it to Ru after they said 'SILENCE'",
        correctAnswer: "C"
    }, 
    {
        question: "RuPaul's Drag Race is now shown on VH1, but what was the name of the first TV network to air it?",
        choiceA: "Logo TV",
        choiceB: "MTV",
        choiceC: "E4",
        choiceD: "ABC",
        correctAnswer: "A"
    }, 
    {
        question: "RuPaul always claims to be looking for what 4 qualities in contestants (in Order)?",
        choiceA: "Confidence, Uniqueness, Trust, Strength",
        choiceB: "Charisma, Uniqueness, Nerve, and Talent",
        choiceC: "Charisma, Talent, Uniqueness, and Nerve",
        choiceD: "Toughness, Intelligence, Creativity, and Talent",
        correctAnswer: "B"
    }, 
    {
        question: "What has typically been the cash prize on the US seasons?",
        choiceD: "$100,000",
        choiceB: "$50,000",
        choiceC: "150,000",
        choiceA: "There is no cash prize. They get to sign a label",
        correctAnswer: "D"
    },
    {
        question: "What queen was the first eliminated in their season and what made them famous from it?",
        choiceA: "Shuga Cain, Singing `I want candy` on exit",
        choiceB: "Vanessa Vanjie Mateo, `Miss Vanjie, Miss Vanjie, Miss Vanjie`",
        choiceC: "Shangela, yelling `Hallelu, I'll be back!`",
        choiceD: "Joey Jay, `I'm gay ass b*tch, I'm Joey Jay!`",
        correctAnswer: "B"
    },
    {
        question: "Who was the winner of the All-Stars All Winners Season?",
        choiceA: "Trinity The Tuck Taylor",
        choiceC: "Jinx Monsoon",
        choiceB: "Bianca Del Rio",
        choiceD: "Monet Exchange",
        correctAnswer: "C"
    }, 
    {
        question: "Which queen said `Do I have something on my face?` while having a stare down with RuPaul?",
        choiceA: "Tyra Sanchez",
        choiceB: "The Vixen",
        choiceC: "Max",
        choiceD: "Pearl",
        correctAnswer: "D"
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


    // update progress bar
    progressText.innerHTML= `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length) 
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML= currentQuestion.question
   
    choices.forEach (choice => {
        const value = choice.dataset['value']
        choice.innerHTML = currentQuestion['choice'+ value]
        
    })
    
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
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
                return window.location.assign('/loseEnd.html')
            }
        } else

        progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS)* 100}%`
        selectedChoice.parentElement.classList.add(classToApply)

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
startGame()
