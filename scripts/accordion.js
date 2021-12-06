const infoArea = document.querySelector('.info__text-content'),
    infoTextArea = document.querySelector('.description__text-area'),
    infoTextBlocks = infoArea.querySelectorAll('.description__text'),
    infoBtn = infoArea.querySelector('.description__accordion');

let infoCheck = false

class Accordion {
    constructor(options) {
        this.area = options.area
        this.text = options.text
        this.btn = options.btn
    }

    show() {
        this.area.style.height = `${this.maxHeight()}px`
    }

    hide() {
        this.area.style.height = `${this.minHeight()}px`
    }

    init() {
        if (window.innerWidth <= 768) {
            this.hide()
        } else this.area.style.height = 'auto'
    }

    btnChange() {
        this.btn.classList.toggle('description__accordion-after-rotate')
        this.btn.textContent == 'Свернуть' ? this.btn.textContent = 'Развернуть' : this.btn.textContent = 'Свернуть'
    }

    maxHeight() {
        let max = 0
        this.text.forEach(item => {
            max += (item.getClientRects()[0].height + parseInt(getComputedStyle(item).marginBottom))
        })
        return max
    }

    minHeight() {
        return this.text[0].getClientRects()[0].height + parseInt(getComputedStyle(infoTextBlocks[0]).marginBottom)
    }
}

const infoAccordion = new Accordion({
    area: infoTextArea,
    text: infoTextBlocks,
    btn: infoBtn
})

const statisticArea = document.querySelector('.statistic__wrapper'),
    statisticTextArea = statisticArea.querySelector('.statistic__text'),
    statisticTextBlocks = statisticTextArea.querySelectorAll('.description__text'),
    statisticBtn = statisticArea.querySelector('.description__accordion');

let statisticCheck = false

const statisticAccordion = new Accordion({
    area: statisticTextArea,
    text: statisticTextBlocks,
    btn: statisticBtn
})

const accordionButtons = document.querySelectorAll('.description__accordion')

function listenerFunc(obj, objCheck) {
    if (!objCheck) {
        obj.show()
        obj.btnChange()
    } else {
        obj.hide()
        obj.btnChange()
    }
}

accordionButtons.forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.parentNode == infoArea) {
            listenerFunc(infoAccordion, infoCheck)
            infoCheck = !infoCheck
        }

        if (event.target.parentNode == statisticArea) {
            listenerFunc(statisticAccordion, statisticCheck)
            statisticCheck = !statisticCheck
        }
    })
})

infoAccordion.init()
statisticAccordion.init()

window.addEventListener('resize', () => {
    infoAccordion.init()
    statisticAccordion.init()
})