import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'
import words from './words.js'

export const initAllWords = () => {
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
}

export const initSwiper = today => {
  const currentIndex = getIndex(today)
  // currentIndex 가 항상 중앙에 위치하게끔 좌우로 더 여유있게 붙여줌
  const after = [...words.slice(currentIndex), ...words.slice(0, currentIndex)]
  const before = [
    ...words.slice(0, currentIndex).reverse(),
    ...words.slice(currentIndex).reverse(),
  ]
  swiper.appendSlide(after.map(wordToHtml))
  swiper.prependSlide(before.map(wordToHtml))

  const initIndex = window.swiper.activeIndex

  swiper.on('slideChange', function () {
    const diff = swiper.activeIndex - initIndex
    initDate(today.add(7 * diff, 'day'))
  })
}

export const wordToHtml = word => `
    <div class="swiper-slide"><section>
      <div class="message">
        <span>${word.message}</span>
      </div>
      <div class="address">
        <span>${word.address}</span>
      </div>
    </section></div>`

export const getIndex = targetDay => {
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
