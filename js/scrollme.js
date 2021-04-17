class ScrollMe {

    //PUBLIC atributy
    currentPage = 1 //aktuální stránka
    duration = 5000 //rychlost animace scrollování
    #sectionNodes
    #navigationNodes
    static #Animating = false

    constructor(sectionNodes, navNodes) {
        this.#sectionNodes = sectionNodes
        this.#navigationNodes = navNodes
        this.#initEventListernes()
    }
    
    #scrollToo(section) {
        // element sekce stránky .page
        let target = section
        // získá y souřadnici daného elementu
        let targetPosition = target.getBoundingClientRect().top
        // hodnota aktuální souřadnice y (kde se zrovna nacházím při scrollování stránky)
        let startPosition = window.pageYOffset
        // vzálenost kterou chci odscrollovat 
        let distance = targetPosition //- startPosition

        let duration = this.duration
        let startTime = null

        function animation(currentTime) {
            //console.log(global.animating)
            if(startTime === null) startTime = currentTime
            let timeElapsed = currentTime - startTime
            let run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
            window.scrollTo(0, run)
            if(timeElapsed < duration) {
                requestAnimationFrame(animation)
            } else {
                console.log("ANIMATION FINISHED")
                ScrollMe.#Animating = false
            }
        }

        // dynamika animace http://gizma.com/easing/
        function easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }
        console.log("ANIMATION STARTED")
        requestAnimationFrame(animation)
    }

    #initEventListernes() {
        let navigations = []
        let sections = []
        document.querySelectorAll(this.#sectionNodes).forEach(section => {
            sections.push(section)
        })
        this.#navigationNodes.forEach(navTxt => {
            navigations.push(document.querySelectorAll(navTxt))
        })
        for (let key in navigations) {
            navigations[key].forEach(nav => {
                nav.addEventListener("click", () => {
                    if(!ScrollMe.#Animating) {
                        ScrollMe.#Animating = true
                        this.#scrollToo(sections[key])
                    }
                }) 
            })
        }
    }
}