import { initApp } from './utils.js'
import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'

// duration 플러그인 설치
dayjs.extend(window.dayjs_plugin_duration)

window.swiper = new Swiper('.mySwiper', {})

const today = dayjs()

initApp(today)
