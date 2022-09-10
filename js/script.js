//Build to show the question and the answer

// variables
const mediumQuestion = document.querySelector(".medium-question")
const choicesContainer = document.querySelector(".choices-container")
const submitBtn = document.getElementById('submit-btn')

//functions
function buildQuestion() {
    // variable to store the HTML outout
    const output = [];

    ruQuestions.forEach((currentQuestion, questionNumber) => {
         //stores the list of possible answers
         const answers = [];

         //and for each available answer
         for(letter in currentQuestion.answers){

            //add button
            answers.push(
                ''
            )
         }
    })
}

function showResults() {

}

buildQuestion();

const ruQuestions = [
    {
        question: "Name the original judging panel from Season 1",
        answers: {
            A: "Ru Paul, Santino Rice, Michelle Visage",
            B: "Ru Paul, Marle Ginsberg, Santino Rice, Michelle Visage",
            C: "Ru Paul, Marle Ginsberg, Santano Rice",
            D: "Ru Paul, Michelle Viasge, Tyra Banks"
        }, 
        correctAnswer: "C"
    },
    {
        question: "Who was the winner of the first season of Ru Paul's Drag Race?",
        answers: {
            A: "BeBe Zahara Benet",
            B: "Nina Flowers",
            C: "Shangela",
            D: "Raja"
        },
        correctAnswer: "A"

}]

//button event listeners
submitBtn.addEventListener('click', showResults);