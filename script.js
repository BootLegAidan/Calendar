const els = {
  nameLengthTxt: document.getElementById('nameLen'),
  lengthScreen: document.getElementById('lengthScreen'),
  nameScreen: document.getElementById('nameScreen'),
  cardContainer: document.getElementById('cardCont'),
  welcomeScreen: document.getElementById('welcomeScreen'),
  welcomeText: document.getElementById('welcome'),
  dateText: document.getElementById('date'),
  nameSubmitButton: document.getElementById('submitName')
}
let nameLength = 5
let shuffles = 0
let cards = []
let name = ''

function update() {
  if (nameLength <= 0) {
    nameLength = 1
  }
  els.nameLengthTxt.innerText = nameLength
}
function showNameScreen() {
  els.lengthScreen.classList.add('hidden');
  els.nameScreen.classList.remove('hidden');
  for (let i = 0; i < nameLength; i++) {
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('centerText')
    cards.push({
      el: card,
      letter: 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random()*26)],
      num: i,
      locked: false,
      usedLetters: ''
    })
    cards[i].usedLetters += cards[i].letter
    card.setAttribute('number',i)
    card.onclick = (e) => {
      let el = e.target
      let num = el.attributes.number.value
      console.log(num)
      cards[num].locked = !cards[num].locked
      updateCards()
    }
    card.innerText = cards[i].letter.toUpperCase()
    els.cardContainer.append(card)
  }
}
function updateCards() {
  let allLocked = true
  for (let i of cards) {
    if (i.locked) {
      i.el.classList.add('locked')
    } else {
      allLocked = false
      i.el.classList.remove('locked')
    }
    i.el.innerText = i.letter.toUpperCase()
  }
  if (allLocked) {
    els.nameSubmitButton.innerText= 'Submit'
  } else {
    els.nameSubmitButton.innerText= 'Shuffle'
  }
}
function submitCards() {
  let done = true
  for (let i of cards) {
    if (!i.locked) {
      done = false
      if (i.usedLetters.length == 26) {
        i.usedLetters = ''
      }
      let letters = 'abcdefghijklmnopqrstuvwxyz'.match(new RegExp(`[^${i.usedLetters}]`,'g'))
      i.letter = letters[Math.floor(Math.random()*letters.length)]
      if (shuffles == 24) {
        i.usedLetters += i.letter
      }
    }
  }
  updateCards()
  shuffles++
  if (!done) {
    if (shuffles < 25) {
      requestAnimationFrame(submitCards)
    } else {
      shuffles = 0
      return
    }
  } else {
    showWelcomeScreen()
  }
}
function showWelcomeScreen() {
  for (let i of cards) {
    name += i.letter
    if (i.num == 0) {
      name = name.toUpperCase()
    }
  }
  els.nameScreen.classList.add('hidden');
  els.welcomeScreen.classList.remove('hidden')
  els.welcomeText.innerText = `Welcome, ${name}.`
  let d = new Date()
  let weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()]
  let month = ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()]
  els.dateText.innerText = `It is currently ${weekday}, ${month} ${d.getDate()}.`
}
