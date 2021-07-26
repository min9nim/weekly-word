import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'
import wordList from './words.js'

const words = wordList.map((item, idx) => ({ ...item, idx }))
window.words = words

export const initAllWords = () => {
  document.querySelector('.allWords > ul').innerHTML = words
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
    .querySelector('.allWords > .label > span')
    .addEventListener('click', () => {
      window.scrollTo(0, document.documentElement.offsetHeight - 40)
    })
}

export const initSwiper = today => {
  const index = wordIndex(today)

  // index 가 항상 중앙에 위치하게끔 좌우로 더 여유있게 붙여줌
  const after = [...words.slice(index), ...words.slice(0, index)]
  const before = [
    ...words.slice(0, index).reverse(),
    ...words.slice(index).reverse(),
  ]
  swiper.appendSlide(after.map(wordToHtml))
  swiper.prependSlide(before.map(wordToHtml))

  const initSlideIndex = window.swiper.activeIndex

  swiper.on('slideChange', function () {
    const diff = swiper.activeIndex - initSlideIndex
    initDate(today.add(7 * diff, 'day'))
  })
}

export const wordToHtml = word => `
    <div class="swiper-slide">
        <section>
          <div class="message">
            <span>${word.message}</span>
          </div>
          <div class="address">
            <span>- ${word.address}</span>
          </div>
        </section>
    </div>`

export const wordIndex = targetDay => {
  // 기준일
  var initDay = dayjs('2021-07-04', 'YYYY-MM-DD')

  var weeksFromInitDay = weeksCount(initDay, targetDay)
  console.log('기준일(2021/7/4)로 부터 이번 주:', weeksFromInitDay)

  return weeksFromInitDay % words.length
}

export const initDate = target => {
  document.querySelector('.this-week').innerHTML =
    target.startOf('week').format('YYYY.M.D') +
    ' ~ ' +
    target.endOf('week').format('M.D')
}

export const weeksCount = (initDay, targetDay) =>
  dayjs.duration(targetDay.diff(initDay)).weeks()

export const initDarkMode = () => {
  if (!localStorage.getItem('dark')) {
    document.querySelector('body').classList.toggle('dark')
  }

  document.querySelector('.dark-btn').addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark')
    if (localStorage.getItem('dark')) {
      localStorage.removeItem('dark')
    } else {
      localStorage.setItem('dark', '1')
    }
  })
}

export const initApp = today => {
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
    swiper.slideTo(wordList.length, 1000)
    initDate(today)
  })

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
  }
}
