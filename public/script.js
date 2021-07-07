import words from './words.js'
import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'

console.log('script.js going..')

// duration 플러그인 설치
dayjs.extend(window.dayjs_plugin_duration)

// 기준일
var initDay = dayjs('2021-07-04', 'YYYY-MM-DD')

// var today = dayjs('2021-07-18', 'YYYY-MM-DD')
var today = dayjs()
var weeksFromInitDay = dayjs.duration(today.diff(initDay)).weeks()
console.log('기준일(2021/7/4)로 부터 이번 주:', weeksFromInitDay)

var start = today.startOf('week').format('YYYY.M.D')
var end = today.endOf('week').format('M.D')

var currentIndex = weeksFromInitDay % words.length

const wordToHtml = word => `
    <div class="swiper-slide"><section>
      <div class="message">
        <span>${word.message}</span>
      </div>
      <div class="address">
        <span>${word.address}</span>
      </div>
    </section></div>`

// currentIndex 가 항상 중앙에 위치하게끔 좌우로 더 여유있게 붙여줌
var after = [...words.slice(currentIndex), ...words.slice(0, currentIndex)]
swiper.appendSlide(after.map(wordToHtml))

var before = [
  ...words.slice(0, currentIndex).reverse(),
  ...words.slice(currentIndex).reverse(),
]
swiper.prependSlide(before.map(wordToHtml))

document.querySelector('.this-week').innerHTML = start + ' ~ ' + end
document.querySelector('footer > details > ul').innerHTML = words
  .map(word => {
    return `
    <li>
        <div class="address">
            ${word.address}
        </div>
        <div class="message">
            ${word.message}
        </div>
    </li>
    `
  })
  .join('')

document
  .querySelector('footer > details > summary')
  .addEventListener('click', () => {
    document.querySelector('section').classList.toggle('hidden')
    document.querySelector('header').classList.toggle('hidden')
  })
