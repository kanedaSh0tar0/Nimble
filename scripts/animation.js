const lines = document.querySelectorAll('.partnership__level-strip-in')
const percents = document.querySelectorAll('.partnership__level-percent')
const container = document.querySelector('.partnership__program-condition')
const partnership = document.querySelector('.partnership__program-condition')

let percentStop = false

function percentAnim() {
    let time = 1500
    let maxStep = 15
    let stepTime = Math.round(time / maxStep)
    let step = 0
    let check = false

    if (!percentStop) {
        let interval = setInterval(() => {
            if (!check) {
                for (let i = 0; i < percents.length; i++) {
                    percents[i].classList.contains('partnership__level-percent_green') ? percents[i].textContent = `${step}%` : false
                    percents[i].classList.contains('partnership__level-percent_yellow') && step <= 7 ? percents[i].textContent = `${step}%` : false
                    percents[i].classList.contains('partnership__level-percent_orange') && step <= 5 ? percents[i].textContent = `${step}%` : false
                    percents[i].classList.contains('partnership__level-percent_red') && step <= 3 ? percents[i].textContent = `${step}%` : false
                }
            }

            if (step == maxStep) {
                clearInterval(interval)
                check = true
            }
            step++
        }, stepTime);
    }
}

function animLines() {
    for (let i = 0; i < lines.length; i++) {
        const item = lines[i]
        const containerHeight = container.offsetHeight
        const containerScroll = container.getBoundingClientRect().top

        if (containerScroll - containerHeight / 2 <= 0) {
            partnership.style.opacity = 1

            setTimeout(() => {
                percentAnim()

                percentStop = true

                setTimeout(() => {
                    item.classList.add('anim-line')
                }, i * 100)
            }, 500);
        }

    }
}

window.addEventListener('scroll', animLines)




function firstScreenAnim() {
    const addTransition = document.querySelectorAll('.firstscreen_animation')

    let step = 1

    addTransition.forEach(item => {
        item.style.transition = 'all 1s ease-in-out'

        setTimeout(() => {
            item.style.opacity = 1
            item.style.transform = 'translateX(0)'
        }, step * 500);

        step++
    })
}

firstScreenAnim()
