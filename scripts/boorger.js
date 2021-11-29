const boorgerBtn = document.querySelector('.boorger')
const boorgerLines = boorgerBtn.querySelectorAll('.boorger__line')
const boorgerCloseLines = boorgerBtn.querySelectorAll('.boorger__line_close')
const nav = document.querySelector('.nav')

let show = false

const menuMove = () => {
    if (show) {
        moveBtnLines('0')
        showNav('Hide')
    } else if (!show) {
        moveBtnLines('300')
        showNav('Show')
    }

    function moveBtnLines(value) {
        boorgerLines.forEach((item, ind) => {
            if (ind < 3) {
                let interval = setInterval(() => {
                    item.style.transform = `translateX(${value}%)`
                    clearInterval(interval)
                }, ind * 50)
            }
        })

        setTimeout(() => {
            boorgerCloseLines.forEach(item => {
                item.style.opacity = `${value}%`
            })
        }, value)
    }

    function showNav(value) {
        if (value == 'Show') {
            nav.classList.toggle('boorger-nav')
            document.body.style.overflowY = 'hidden'

            setTimeout(() => {
                nav.style.opacity = 1
            }, 10)
        } else if (value == 'Hide') {
            nav.style.opacity = 0
            document.body.style.overflowY = ''

            setTimeout(() => {
                nav.classList.toggle('boorger-nav')
            }, 1000)
        }
    }

    show = !show
}

boorgerBtn.addEventListener('click', menuMove)
