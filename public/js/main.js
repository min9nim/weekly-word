import words from './words.js'
import { initAllWords, initDate, initSwiper, getIndex } from './utils.js'
import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'

console.log('script.js going..')

// duration 플러그인 설치
dayjs.extend(window.dayjs_plugin_duration)

const today = dayjs()

initSwiper(words, getIndex(today))

initDate(today)

initAllWords(words)

document
  .querySelector('footer > details > summary')
  .addEventListener('click', () => {
    document.querySelector('section').classList.toggle('hidden')
    document.querySelector('header').classList.toggle('hidden')
  })
