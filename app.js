import * as Vue from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { questions } from './questions.js'
import { answers } from './answers.js'

const { createApp, ref } = Vue

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
        for (const answer of [...answers].sort((a, b) => a - b)) {
            if (answer.maxScore < score) {
                continue
            }
            return answer.text
        }
        return 'ответ не найден'
    }
    return {
      textByScore,
      score,
      handleAnswer,
      question
    }
  }
}).mount('#app')
