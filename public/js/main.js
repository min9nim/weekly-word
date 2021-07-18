import {
  initAllWords,
  initDarkMode,
  initDate,
  initSwiper,
  wordIndex,
} from './utils.js'
import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'

console.log('main.js start')

// duration 플러그인 설치
dayjs.extend(window.dayjs_plugin_duration)

const today = dayjs()
window.swiper = new Swiper('.mySwiper', {})

// 날짜세팅
initDate(today)

// 말씀 슬라이드 세팅
initSwiper(today)

// 전체암송구절 세팅
initAllWords()

// 다크모드 세팅
initDarkMode()

var agent = navigator.userAgent.toLowerCase()
if (agent.includes('firefox')) {
  document.querySelector('body').classList.toggle('dark')
}

document.querySelector('.logo').addEventListener('click', () => {
  swiper.slideTo(wordIndex(today) + 60, 1000)
  initDate(today)
})
