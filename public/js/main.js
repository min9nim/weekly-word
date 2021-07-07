import { initAllWords, initDate, initSwiper, getIndex } from './utils.js'
import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'

console.log('script.js going..')

// duration 플러그인 설치
dayjs.extend(window.dayjs_plugin_duration)

window.swiper = new Swiper('.mySwiper', {})

const today = dayjs()

// 말씀 슬라이드 세팅
initSwiper(today)

// 날짜세팅
initDate(today)

// 전체암송구절 세팅
initAllWords()
