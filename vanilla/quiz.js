/* global questions:readonly, answers:readonly */

// DOM Elements
const titleElement = document.querySelector('#title')
const scoreElement = document.querySelector('#score')
const resultElement = document.querySelector('#result')
const yesButton = document.querySelector('#yesButton')
const noButton = document.querySelector('#noButton')

// DOM manipulation
const setTitle = (text) => { titleElement.innerText = text }
const setScore = (score) => { scoreElement.innerText = score }
const setResult = (text) => { resultElement.innerText = text }
const hideButtons = () => {
  yesButton.style.display = 'none'
  noButton.style.display = 'none'
}

// Quiz Logic
const findResultByScore = (score) => {
  for (const answer of [...answers].sort((a, b) => a - b)) {
    if (answer.maxScore < score) {
      continue
    }
    return answer.text
  }
  return 'ответ не найден'
}
(() => {
  let score = 0
  let question = questions[0]
  const handleAnswer = (answer) => {
    score += answer.score
    question = questions.find(q => q.id === answer.nextId)
    const title = question ? question.text : 'Результат:'
    // DOM update
    setTitle(title)
    setScore(score)
    if (!question) {
      // end
      hideButtons()
      setResult(findResultByScore(score))
    }
  }

  setTitle(question.text)
  setScore(score)
  yesButton.onclick = () => handleAnswer(question.yes)
  noButton.onclick = () => handleAnswer(question.no)
})()
