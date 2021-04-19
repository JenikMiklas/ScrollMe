class ScrollMe {

    //PUBLIC
    currentPage = 1 //aktuální stránka
    duration = 5000 //rychlost animace scrollování

    sectionNodes   // pole sekcí (stránek)
    navigationNodes // pole navigačních elementů

    animating = false

    //init()
    constructor(sectionNodes, navNodes) {
        this.sectionNodes = sectionNodes
        this.navigationNodes = navNodes
        this.initEventListernes()
    }
    
    scrollMe(section) {
        // element sekce stránky
        let target = section
        this.currentPage = this.sectionNodes.indexOf(section) + 1
        console.log("Current page: "+this.currentPage)
        // získá y souřadnici daného elementu
        let targetPosition = target.getBoundingClientRect().top
        // hodnota aktuální souřadnice y (kde se zrovna nacházím při scrollování stránky)
        let startPosition = window.pageYOffset
        // vzálenost kterou chci odscrollovat 
        let distance = targetPosition //- startPosition

        let duration = this.duration
        let startTime = null

        // funkce se vykonává dokola dokud animace neskončí
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
                ScrollMe.animating = false
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
        ScrollMe.animating = true
        requestAnimationFrame(animation)
    }
    
    // fce volána při použítí kolečka myši
    wheeleMe(event) {
        if(!ScrollMe.animating) {
            const previousPage = this.currentPage
            if(event.deltaY > 0) {
                this.currentPage += 1
            } else {
                this.currentPage -= 1
            }
            if(this.currentPage <= 0) { 
                this.currentPage = 1 
            }
            else if (this.currentPage > this.sectionNodes.length) { 
                this.currentPage = this.sectionNodes.length 
            }
            if(previousPage != this.currentPage) {
                this.scrollMe(this.sectionNodes[this.currentPage-1])
            }
        }
       
    }

    // fce volána při kliknutí myši
    clickMe(index) {
        if(!ScrollMe.animating && Number(index)+1 != this.currentPage) {
            this.scrollMe(this.sectionNodes[index])
        }
    }

    // prováže navigační prvky a sekce, nastavení listenerů včech navigačních prvků na akci click a wheel (kolečka myši)
    initEventListernes() {
        let navigations = []
        let sections = []
        document.querySelectorAll(this.sectionNodes).forEach(section => {
            sections.push(section)
        })
        this.sectionNodes = sections
        this.navigationNodes.forEach(navTxt => {
            navigations.push(document.querySelectorAll(navTxt))
        })
        document.addEventListener("wheel", (event) => {
            if(!ScrollMe.animating) {
                window.addEventListener("wheel", e => e.preventDefault(), { passive:false })
                this.wheeleMe(event)
            }
        })
        for (let key in navigations) {
            navigations[key].forEach(nav => {
                nav.addEventListener("click", () => {
                    this.clickMe(key)
                }) 
            })
        }
    }
}