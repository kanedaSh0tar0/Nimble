const boorgerBtn = document.querySelector('.boorger')
const boorgerLines = boorgerBtn.querySelectorAll('.boorger__line')
const nav = document.querySelector('.nav')
const navItem = document.querySelectorAll('.nav__item')
const bodyBlocked = document.getElementsByTagName('html')

let check = true

boorgerBtn.addEventListener('click', () => {
    setTimeout(() => {
        btnAnimation()
        showNav()
    }, 100)
})

function btnAnimation() {
    for (let i = 0; i < 3; i++) {
        if (boorgerLines[i].style.transform == 'translateX(-300%)' || boorgerLines[i].style.transform == 'translateX(300%)') {
            boorgerLines[i].style.transform = 'translateX(0)'
        } else {
            i % 2 == 0 ? boorgerLines[i].style.transform = 'translateX(-300%)' : boorgerLines[i].style.transform = 'translateX(300%)'
        }
    }

    for (let i = 3; i < boorgerLines.length; i++) {
        boorgerLines[i].style.opacity == 0 ? boorgerLines[i].style.opacity = 1 : boorgerLines[i].style.opacity = 0
    }
}

function showNav() {
    if (nav.style.opacity == 0) {
        nav.classList.add('boorger-nav')
        bodyBlocked[0].style.overflowY = 'hidden'

        setTimeout(() => {
            nav.style.opacity = 1
        }, 10)
    } else {
        nav.style.opacity = 0
        bodyBlocked[0].style.overflowY = ''

        setTimeout(() => {
            nav.classList.remove('boorger-nav')
        }, 300)
    }
}

navItem.forEach(item => {
    if (!item.classList.contains('nav__item_select')) {
        item.addEventListener('click', event => {
            event.preventDefault()
    
            let href = item.getAttribute('href')
            document.querySelector(`${href}`).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
    
            if (window.innerWidth < 1240) {
                showNav()
                btnAnimation()
            }
        })
    }
});