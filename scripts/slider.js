const firstCardsArea = document.querySelector('.first-screen__cards')
const wrapper = document.querySelector('.first-screen__wrapper')
const cards = firstCardsArea.querySelectorAll('.card-wrap')
const arrow = wrapper.querySelector('.cards-arrow')

let x, y, xMove, yMove, slideCount = 0;
let indent = parseInt(window.getComputedStyle(wrapper).paddingLeft);
let cardWidth = cards[0].offsetWidth + 2;
let cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight)

arrow.style.left = `${indent + (cardWidth / 2) - 34}px`

function touchStart(event) {
    x = event.touches[0].clientX
    y = event.touches[0].clientY
}

function touchMove(event) {
    xMove = event.touches[0].clientX - x
    yMove = event.touches[0].clientY - y
}

function touchEnd() {
    if (xMove < -50) {
        slideCount != cards.length - 1 ? slideCount++ : false
        slideCount != cards.length - 1 ? arrow.style.transform = '' : arrow.style.transform = 'rotate(.5turn)'
    } else if (xMove > 50) {
        slideCount != 0 ? slideCount-- : false
        slideCount != 0 ? arrow.style.transform = 'rotate(.5turn)' : arrow.style.transform = ''
    }

    if (xMove < -50 || xMove > 50) {
        firstCardsArea.style.transform = `translateX(-${slideCount * (cardWidth + indent)}px)`
    }

    cards.forEach(i => i.classList.remove('card-wrap_active'))
    cards[slideCount].classList.add('card-wrap_active')
}

firstCardsArea.addEventListener('touchstart', touchStart)
firstCardsArea.addEventListener('touchmove', touchMove)
firstCardsArea.addEventListener('touchend', touchEnd)

window.addEventListener('resize', () => {
    indent = parseInt(window.getComputedStyle(wrapper).paddingLeft);
    cardWidth = cards[0].offsetWidth + 2;
    cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight)

    arrow.style.left = `${indent + (cardWidth / 2) - 34}px`
    firstCardsArea.style.transform = `translateX(-${slideCount * (cardWidth + indent)}px)`
    console.log('res')
})