import words from './words.js'
import dayjs from 'https://unpkg.com/dayjs@1.8.21/esm'

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

var word = words[weeksFromInitDay % words.length]
document.querySelector('.message span').innerHTML = word.message
document.querySelector('.address span').innerHTML = '- ' + word.address

document.querySelector('.this-week').innerHTML =
  '이번 주(' + start + ' ~ ' + end + ')'
