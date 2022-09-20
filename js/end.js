const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

finalScore.innerHTML = `
<span class="h2background">
Great Job! Your score: <span class="recent-score">${mostRecentScore}</span>
</span>
`

const MAX_HIGH_SCORE = 5;

username.addEventListener('keyup', (evt) => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = (evt) => {
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
    window.location.assign('/highscore.html')
}