import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { questions } from './questions.js'

createApp({
  template: `
    <div v-if="question">
      <h1>{{ question.text }}</h1>
      <p>баллы: {{ score }}</p>
      <button class="yes" @click="handleAnswer(question.yes)">Да</button>
      <button class="no" @click="handleAnswer(question.no)">Нет</button>
    </div>
    <div v-else>
      <h1>Результат:</h1>
      <p>{{ textByScore(score) }}</p>
      <p>баллы: {{ score }}</p>
    </div>
  `,
  setup() {
    const score = ref(0)
    const question = ref(questions[0])  // take first question as start point
    const handleAnswer = (answer) => {
      score.value+=answer.score
      question.value = questions.find((q) => q.id === answer.nextId)
    }
    const textByScore = (score) => {
      if (score < 0)  return 'Привет, Оля!'
      if (score < 30) return 'Скорее всего ты не Люда'
      return 'Привет, милая! Только ты могла правильно ответить на все вопросы! Я люблю тебя! Ты у меня самая лучшая!'
    }
    return {
      textByScore,
      score,
      handleAnswer,
      question
    }
  }
}).mount('#app')
