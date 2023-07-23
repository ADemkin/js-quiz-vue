import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
import { questions } from './questions.js'

function questionsToGraph(questions) {
  let text = 'graph TD\n'
  let entities = 'End[конец]\n'
  let relations = '\n'
  for (const q of questions) {
    entities += `${q.id}["${q.text}"]\n`
    relations += `${q.id}-- да:${q.yes.score} -->${q.yes.nextId ?? 'End'}\n`
    relations += `${q.id}-- нет:${q.no.score} -->${q.no.nextId ?? 'End'}\n`
  }
  text += entities
  text += relations
  return text
}
const text = questionsToGraph(questions)
console.debug(text)
document.getElementsByClassName('mermaid')[0].textContent = text
mermaid.initialize({ startOnLoad: true })
