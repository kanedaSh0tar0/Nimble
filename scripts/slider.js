const firstCardsArea = document.querySelector('.first-screen__cards')
// const wrapper = document.querySelector('.first-screen__wrapper')
// const cards = firstCardsArea.querySelectorAll('.card-wrap')
// const arrow = wrapper.querySelector('.cards-arrow')

// let x, y, xMove, yMove, slideCount = 0;
// let indent = parseInt(window.getComputedStyle(wrapper).paddingLeft);
// let cardWidth = cards[0].offsetWidth + 2;
// let cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight)

// arrow.style.left = `${indent + (cardWidth / 2) - 34}px`

// function touchStart(event) {
//     x = event.touches[0].clientX
//     y = event.touches[0].clientY
// }

// function touchMove(event) {
//     xMove = event.touches[0].clientX - x
//     yMove = event.touches[0].clientY - y
// }

// function touchEnd() {
//     if (xMove < -50) {
//         slideCount != cards.length - 1 ? slideCount++ : false
//         slideCount != cards.length - 1 ? arrow.style.transform = '' : arrow.style.transform = 'rotate(.5turn)'
//     } else if (xMove > 50) {
//         slideCount != 0 ? slideCount-- : false
//         slideCount != 0 ? arrow.style.transform = 'rotate(.5turn)' : arrow.style.transform = ''
//     }

//     if (xMove < -50 || xMove > 50) {
//         firstCardsArea.style.transform = `translateX(-${slideCount * (cardWidth + indent)}px)`
//     }

//     cards.forEach(i => i.classList.remove('card-wrap_active'))
//     cards[slideCount].classList.add('card-wrap_active')
// }

// firstCardsArea.addEventListener('touchstart', touchStart)
// firstCardsArea.addEventListener('touchmove', touchMove)
// firstCardsArea.addEventListener('touchend', touchEnd)

// window.addEventListener('resize', () => {
//     indent = parseInt(window.getComputedStyle(wrapper).paddingLeft);
//     cardWidth = cards[0].offsetWidth + 2;
//     cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight)

//     arrow.style.left = `${indent + (cardWidth / 2) - 34}px`
//     firstCardsArea.style.transform = `translateX(-${slideCount * (cardWidth + indent)}px)`
//     console.log('res')
// })

class Slider {
    constructor(options) {
        this.cardArea = document.querySelector(options.cardArea)
        this.indent = parseInt(window.getComputedStyle(options.indent).paddingLeft)
        this.cards = this.cardArea.querySelectorAll(options.cards)
        this.arrow = document.querySelector(options.arrow)
        this.slideCount = options.slideCount
        this.coordinates = options.coordinates
        this.context = options.context
    }

    get getIndent() {
        return this.indent
    }

    set getIndent(update) {
        this.indent = update
    }

    touchStart(event) {
        this.coordinates.x = event.touches[0].clientX
        this.coordinates.y = event.touches[0].clientY
    }

    touchMove(event) {
        this.coordinates.xMove = event.touches[0].clientX - this.coordinates.x
        this.coordinates.yMove = event.touches[0].clientY - this.coordinates.y
    }

    touchEnd() {
        if (this.coordinates.xMove < -50) {
            this.slideCount != this.cards.length - 1 ? this.slideCount++ : false
            this.slideCount != this.cards.length - 1 ? this.arrow.style.transform = '' : this.arrow.style.transform = 'rotate(.5turn)'
        } else if (this.coordinates.xMove > 50) {
            this.slideCount != 0 ? this.slideCount-- : false
            this.slideCount != 0 ? this.arrow.style.transform = 'rotate(.5turn)' : this.arrow.style.transform = ''
        }

        if (this.coordinates.xMove < -50 || this.coordinates.xMove > 50) {
            this.cardArea.style.transform = `translateX(-${this.slideCount * (this.cards[0].offsetWidth + this.indent)}px)`
        }

        this.cards.forEach(i => i.classList.remove('card-wrap_active'))
        this.cards[this.slideCount].classList.add('card-wrap_active')
    }

    arrowCenter() {
        this.arrow.style.left = `${this.indent + (this.cards[0].offsetWidth / 2) - 17}px`
    }

    init() {
        this.arrowCenter.bind(this)()

        window.addEventListener('resize', () => {
            this.getIndent = parseInt(window.getComputedStyle(document.querySelector('.first-screen__wrapper')).paddingLeft)

            this.slideCount = 0
            this.cardArea.style.transform = `translateX(0)`
            this.cards.forEach(i => i.classList.remove('card-wrap_active'))
            
            this.cards ? this.cards[0].classList.add('card-wrap_active') : false
            this.arrow ? this.arrow.style.transform = '' : false
            this.coordinates.current ? this.coordinates.current = 0 : false


            this.arrowCenter.bind(this)()
        })

        this.cardArea.addEventListener('touchstart', this.touchStart.bind(this))
        this.cardArea.addEventListener('touchmove', this.touchMove.bind(this))
        this.cardArea.addEventListener('touchend', this.touchEnd.bind(this))
    }
}

const firstSlider = new Slider({
    cardArea: '.first-screen__cards',
    indent: document.querySelector('.first-screen__wrapper'),
    cards: '.card-wrap',
    arrow: '#cards-arrow1',
    slideCount: 0,
    coordinates: {
        x: 0,
        y: 0,
        xMove: 0,
        yMove: 0
    }
})

const secondSlider = new Slider({
    cardArea: '.sale__card-area',
    indent: document.querySelector('.sale__wrapper'),
    cards: '.sale__card',
    arrow: '#cards-arrow2',
    slideCount: 0,
    coordinates: {
        x: 0,
        y: 0,
        xMove: 0,
        yMove: 0
    }
})

const thirdSlider = new Slider({
    cardArea: '.kibotron__cards',
    indent: document.querySelector('.kibotron__wrapper'),
    cards: '.card-wrap',
    arrow: '#cards-arrow3',
    slideCount: 0,
    coordinates: {
        x: 0,
        y: 0,
        xMove: 0,
        yMove: 0
    }
})

class GrabSLider extends Slider {
    constructor(options) {
        super(options)
    }

    touchMove(event) {
        super.touchMove(event)

        this.cardArea.style.transform = `translateX(${this.coordinates.xMove + this.coordinates.current}px)`
    }

    touchEnd() {
        this.coordinates.current = this.coordinates.xMove + this.coordinates.current

        if (this.coordinates.current > 0) {
            this.cardArea.style.transform = `translateX(0px)`
            this.coordinates.current = 0
        }
        console.log(this.coordinates.current)

        if (this.cardArea.offsetWidth - Math.abs(this.coordinates.current) < window.innerWidth - (this.indent * 2)) {
            this.cardArea.style.transform = `translateX(-${this.cardArea.offsetWidth - (window.innerWidth - (this.indent * 2))}px)`
            this.coordinates.current = -(this.cardArea.offsetWidth - (window.innerWidth - (this.indent * 2)))
        }        
    }

    arrowCenter() {
        return
    }
}

const grabSLider = new GrabSLider({
    cardArea: '.statistic__charts-wrapper',
    indent: document.querySelector('.sale__wrapper'),
    coordinates: {
        x: 0,
        y: 0,
        xMove: 0,
        yMove: 0,
        current: 0
    }
})

firstSlider.init()
secondSlider.init()
thirdSlider.init()

grabSLider.init()