const startBtn = document.getElementById('startBtn')
const introModal = document.getElementById('intro-modal')
const difficultModal = document.getElementById('difficult-modal')
// Event Listeners
startBtn.addEventListener('click', (evt) => {
    introModal.style.display= 'none'
    difficultModal.style.display= 'block'
})