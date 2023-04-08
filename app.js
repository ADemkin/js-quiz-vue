import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const questions = [
  {
    id: 'start',
    text: 'Ты сурдопедагог?',
    yes: { score: 1, nextId: 'posobia' },
    no: { score: -1, nextId: 'has-hubby' },
  },
  {
    id: 'posobia',
    text: 'У тебя есть целая тонна игрушек, который ты называешь пособиями?',
    yes: { score: 1, nextId: 'tatoo' },
    no: { score: -1, nextId: 'has-hubby' },
  },
  {
    id: 'tatoo',
    text: 'У тебя есть татуировка, связанная с твой профессией?',
    yes: { score: -4, nextId: 'has-hubby' },
    no: { score: 1, nextId: 'has-hubby' },
  },
  {
    id: 'has-hubby',
    text: 'Ты за мужем?',
    yes: { score: 1, nextId: 'is-anton' },
    no: { score: -1, nextId: 'is-instagram' },
  },
  {
    id: 'is-anton',
    text: 'Твоего мужа зовут Антон?',
    yes: { score: 1, nextId: 'is-a' },
    no: { score: -1, nextId: 'is-instagram' },
  },
  {
    id: 'is-a',
    text: 'Твой муж работает в крупной компании, название которой начинается на А?',
    yes: { score: 1, nextId: 'is-pilot' },
    no: { score: -1, nextId: 'is-instagram' },
  },
  {
    id: 'is-pilot',
    text: 'Твой муж пилот?',
    yes: { score: -4, nextId: 'is-instagram' },
    no: { score: 1, nextId: 'is-prog' },
  },
  {
    id: 'is-prog',
    text: 'Твой муж программист?',
    yes: { score: 1, nextId: 'is-instagram' },
    no: { score: -1, nextId: 'is-instagram' },
  },
  {
    id: 'is-instagram',
    text: 'Ты инстаграмщица?',
    yes: { score: 1, nextId: 'is-instagram-hubby' },
    no: { score: -1, nextId: 'first' },
  },
  {
    id: 'is-instagram-hubby',
    text: 'Ты когда-нибудь выкладывала мужа в стори для поднятия просмотров?',
    yes: { score: 1, nextId: 'is-instagram-breakfast' },
    no: { score: -1, nextId: 'first' },
  },
  {
    id: 'is-instagram-breakfast',
    text: 'У тебя была привычка выкладывать фото завтрака перед вебинаром?',
    yes: { score: 1, nextId: 'first' },
    no: { score: -1, nextId: 'first' },
  },
  {
    id: 'first',
    text: 'На первом свидании с мужем вы ходили куда-нибудь покушать?',
    yes: { score: 1, nextId: 'first-1' },
    no: { score: -1, nextId: 'second' },
  },
  {
    id: 'first-1',
    text: 'Это было веганское кафе?',
    yes: { score: -1, nextId: 'second' },
    no: { score: 1, nextId: 'first-2' },
  },
  {
    id: 'first-2',
    text: 'Это было необистро?',
    yes: { score: 1, nextId: 'first-2.1' },
    no: { score: -1, nextId: 'second' },
  },
  {
    id: 'first-2.1',
    text: 'Вы сидели на веранде?',
    yes: { score: -1, nextId: 'second' },
    no: { score: 1, nextId: 'first-3' },
  },
  {
    id: 'first-3',
    text: 'Ел ли муж что-то зелёное?',
    yes: { score: 1, nextId: 'second' },
    no: { score: -1, nextId: 'second' },
  },
  {
    id: 'second',
    text: 'Ты поделилась водой на первом свидании?',
    yes: { score: -1, nextId: 'third' },
    no: { score: 1, nextId: 'second-1' },
  },
  {
    id: 'second-1',
    text: 'А на втором?',
    yes: { score: 1, nextId: 'third' },
    no: { score: -1, nextId: 'third' },
  },
  {
    id: 'third',
    text: 'Муж проводил тебя до дома в конце первого свидания?',
    yes: { score: 1, nextId: 'third-1' },
    no: { score: -1, nextId: 'fourth' },
  },
  {
    id: 'third-1',
    text: 'Вы шли вдоль железной дороги?',
    yes: { score: -1, nextId: 'fourth' },
    no: { score: 1, nextId: 'third-2' },
  },
  {
    id: 'third-2',
    text: 'Вы шли через парк?',
    yes: { score: 1, nextId: 'fourth' },
    no: { score: -1, nextId: 'fourth' },
  },
  {
    id: 'fourth',
    text: 'Целовались ли вы на первом свидании?',
    yes: { score: -1, nextId: 'fifth' },
    no: { score: 1, nextId: 'fourth-1' },
  },
  {
    id: 'fourth-1',
    text: 'А на втором?',
    yes: { score: 1, nextId: 'fourth-2' },
    no: { score: -1, nextId: 'fifth' },
  },
  {
    id: 'fourth-2',
    text: 'Первый поцелуй был на прощание?',
    yes: { score: -1, nextId: 'fifth' },
    no: { score: 1, nextId: 'fourth-3' },
  },
  {
    id: 'fourth-3',
    text: 'Первый поцелуй был в парке?',
    yes: { score: 1, nextId: 'fifth' },
    no: { score: -1, nextId: 'fifth' },
  },
  {
    id: 'fifth',
    text: 'Ты любишь кино?',
    yes: { score: -1, nextId: 'fifth-2' },
    no: { score: 1, nextId: 'fifth-1' },
  },
  {
    id: 'fifth-1',
    text: 'Но у тебя есть любимый фильм про европейский город?',
    yes: { score: 1, nextId: 'six' },
    no: { score: -1, nextId: 'six' },
  },
  {
    id: 'fifth-2',
    text: 'Твой любимый фильм- Любовь и Голуби?',
    yes: { score: -1, nextId: 'six' },
    no: { score: -1, nextId: 'six' },
  },
  {
    id: 'six',
    text: 'Ты вкусно готовишь?',
    yes: { score: 1, nextId: 'car' },
    no: { score: -1, nextId: 'car' },
  },
  {
    id: 'car',
    text: 'Ты водишь машину?',
    yes: { score: -4, nextId: 'car-mercedes' },
    no: { score: 1, nextId: 'center' },
  },
  {
    id: 'car-mercedes',
    text: 'У тебя мерседес?',
    yes: { score: -4, nextId: 'center' },
    no: { score: 1, nextId: 'center' },
  },
  {
    id: 'center',
    text: 'Ты уже открыла свой образовательный центр?',
    yes: { score: -4, nextId: '' },
    no: { score: 1, nextId: '' },
  },
]

createApp({
  template: `
    <div v-if="question">
      <h1>{{ question.text }}</h1>
      <p>баллы: {{ score }}</p>
      <button @click="handleAnswer(question.yes)">Yes</button>
      <button @click="handleAnswer(question.no)">No</button>
    </div>
    <div v-else>
      <h1>Результат:</h1>
      <p>{{ textByScore(score) }}</p>
      <p>баллы: {{ score }}</p>
    </div>
  `,
  setup() {
    console.debug(questions)
    let score = ref(0)
    let question = ref(questions[0])  // take first question as start point
    function handleAnswer(answer) {
      score.value+=answer.score
      const nextQuestion = questions.find((q) => q.id === answer.nextId)
      question.value = nextQuestion
    }
    function textByScore(score) {
      if (score < 0) {
        return 'Привет, Оля!'
      }
      if (score < 30) {
        return 'Скорее всего ты не Люда'
      }
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
