const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
finalScore.innerHTML = mostRecentScore

const MAX_HIGH_SCORE = 5;

username.addEventListener('keyup', (evt) => {
    console.log(username.value)
    saveScoreBtn.disabled = !username.value
})

saveHighScore = evt => {
    console.log('test')
    evt.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}