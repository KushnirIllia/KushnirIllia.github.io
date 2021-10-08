/*jshint esversion: 6 */
const $app = document.querySelector('.app'),
  $game = $app.querySelector('#game'),
  $start = $app.querySelector('#start'),
  $userTime = $app.querySelector('#game-time'),
  $resultHeader = $app.querySelector('#result-header'),
  $result = $app.querySelector('#result'),
  $timeHeader = $app.querySelector('#time-header')
let score = 0,
  isGameStarted,
  $time = $app.querySelector('#time'),
  colors = ['green', 'blue', 'red', 'yellow', 'pink', 'black']
$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)

function startGame() {
  isGameStarted = true
  score = 0
  $start.classList.add('hide')
  $game.style.backgroundColor = '#fff'
  $resultHeader.classList.add('hide')
  $game.innerHTML = ''
  $app.querySelector('.input').classList.add('hide')
  $timeHeader.classList.remove('hide')

  generateBox()
  let interval = setInterval(() => {
    let time = parseFloat($time.textContent)
    // console.log(time)
    if (time === 0) {
      endGame()
      clearInterval(interval)
    } else {
      $time.textContent = (time -= 0.1).toFixed(1)
    }
  }, 100)

}

function generateBox() {
  const box = document.createElement('div'),
    randomSize = getRandom(30, 150)

  box.style.cssText = `
    position: absolute;
    left: ${getRandom(0, ($game.getBoundingClientRect().width - randomSize))}px;
    top: ${getRandom(0, ($game.getBoundingClientRect().height - randomSize))}px;
    cursor: pointer;
  `
  box.style.backgroundColor = colors[getRandom(0, 5)]
  box.style.height = box.style.width = `${randomSize}px`
  box.setAttribute('data-box', 'true')
  $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min).toFixed(0)
  //                         0.8 * 40 + 10
}

function endGame() {
  isGameStarted = false
  document.querySelector('.input').classList.remove('hide')
  $timeHeader.classList.add('hide')
  $start.classList.remove('hide')
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  $resultHeader.classList.remove('hide')
  $result.innerHTML = score
  $time.textContent = '5.0'
}

function handleBoxClick(e) {
  if (isGameStarted) {
    if (e.target.dataset.box) {
      $game.innerHTML = ''
      score++
      generateBox()
    }
  } else {
    return
  }

}
$userTime.addEventListener('input', () => {
  if ($userTime.value.trim() != '' && $userTime.value != 0) {
    if (!$resultHeader.classList.contains('hide')) {
      $resultHeader.classList.add('hide')
    }
    $timeHeader.classList.remove('hide')
    $time.innerHTML = `${$userTime.value}.0`
  } else {
    $time.innerHTML = `5.0`
  }
})