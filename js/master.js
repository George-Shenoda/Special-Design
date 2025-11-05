let backgroundOption = true
let interval;
randomBackground()

//Set Local
let colors = document.querySelectorAll(".colors-list li")
let randomBackgroundEl  = document.querySelectorAll(".background span");
let bulletsEl = document.querySelectorAll(".bullets span");
let bullets = document.querySelector(".nav-bullets");
if(window.localStorage.color){
    document.documentElement.style.setProperty("--main-color", window.localStorage.color);
    colors.forEach(color => {
        color.classList.remove("active")
        if(color.dataset.color === window.localStorage.color){
            color.classList.add("active")
        }
    })
}

if(window.localStorage.background){
    randomBackgroundEl.forEach(e => {
        e.classList.remove("active")
        if(e.dataset.background === window.localStorage.background){
            e.classList.add("active")
        }
    })
    if(window.localStorage.background === 'yes'){
        backgroundOption = true
        randomBackground()
    }
    else{
        backgroundOption = false
        clearInterval(interval)
    }
}

if(window.localStorage.bullets){
    bulletsEl.forEach(e => {
        e.classList.remove("active")
        if(e.dataset.bullets === window.localStorage.bullets){
            e.classList.add("active")
        }
    })
    if(window.localStorage.bullets === 'yes'){
        bullets.style.display = 'block'
    }
    else{
        bullets.style.display = 'none'
    }
}

// Start Top Button
let topButton = document.querySelector(".top")
topButton.addEventListener("click", ()=>{
    window.scrollTo({top: 0})
})
//End Top

//Start Settings
let gear  = document.querySelector(".fa-gear");
let Settings = document.querySelector(".settings");
gear.addEventListener("click", ()=>{
    Settings.classList.toggle("open");
    gear.classList.toggle("fa-spin");
})

//colors
colors.forEach(color => {
    color.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        window.localStorage.color = e.target.dataset.color
        handleActive(e)
    })
});

//backgrounds
randomBackgroundEl.forEach(element => {
    element.addEventListener("click", (e) => {
        window.localStorage.background = e.target.dataset.background
        handleActive(e)

        if (e.target.dataset.background === 'yes'){
            backgroundOption = true
            randomBackground()
        }
        else{
            backgroundOption = false
            clearInterval(interval)
        }
    })
});

//bullets
bulletsEl.forEach(element => {
    element.addEventListener("click", (e) => {
        window.localStorage.bullets = e.target.dataset.bullets
        handleActive(e)

        if (e.target.dataset.bullets === 'yes'){
            bullets.style.display = 'block'
        }
        else{
            bullets.style.display = 'none'
        }
    })
});

//Reset
let resetBtn = document.querySelector(".settings-container > button");
resetBtn.addEventListener("click", ()=>{
    window.localStorage.clear()
    window.location.reload()
})

function handleActive(element){
    element.target.parentElement.querySelectorAll(".active").forEach(ev => {
        ev.classList.remove("active")
    })
    element.target.classList.add("active")
}
//End Settings

// Start Landing
let landingPage = document.querySelector(".landing-page")

let imgsArray = [];

for (let i = 1; i <= 5; i++) {
    imgsArray.push(`/imgs/0${i}.jpg`);
}

function randomBackground(){
    if(backgroundOption){
        interval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = `url(${imgsArray[randomNumber]})`
        }, 10000);
    }
}
//End Landing

//Start Skills
let skills = document.querySelector(".skills")
window.onscroll = () => {
    let skillsOffset = skills.offsetTop;
    let skillHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let scrollTop = this.pageYOffset;
    if (scrollTop > (skillsOffset + skillHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.backgroundColor =skill.dataset.color
            skill.style.width = skill.dataset.progress
        });
    }

    if (scrollY >= 1000){
        topButton.classList.add("show")
    }
    else{
        topButton.classList.remove("show")
    }
}
//End Skills

//Start Gallery
let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach( img => {
    img.addEventListener("click", (e)=>{
        const overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)

        let popupBox = document.createElement("div")
        popupBox.className= "popup-box"

        let popupImage = document.createElement("img")
        popupImage.src = img.src

        if (img.alt) {
            let imgHeading = document.createElement("h3")
            imgHeading.innerHTML = img.alt

            popupBox.appendChild(imgHeading)
        }

        popupBox.appendChild(popupImage)

        document.body.appendChild(popupBox)

        let close = document.createElement("span")
        close.innerHTML = "X"
        close.className = "close-button"
        popupBox.appendChild(close)
        close.addEventListener("click", (e)=>{
            document.body.removeChild(popupBox)
            document.body.removeChild(overlay)
        })
    })
})
//End Gallery

//bullets
let bulletIcons = document.querySelectorAll(".bullet")
bulletIcons.forEach(bullet => {
    bullet.addEventListener("click", (e) =>{
        document.querySelector(`${bullet.dataset.section}`).scrollIntoView({
            behavior: "smooth"
        })
    })
});

//open menu
let menu = document.querySelector(".burger-icon")
let links = document.querySelector(".links")
menu.addEventListener("click", (e) =>{
    e.stopPropagation()
    links.classList.toggle("open")
    menu.classList.toggle("open");
})

//close menu
document.addEventListener("click", (e) => {
    if(e.target !== menu && e.target !== links && links.classList.contains("open")){
        console.log("close")
        links.classList.remove("open")
        menu.classList.remove("open")
    }
})

links.addEventListener("click", (e) =>{
    e.stopPropagation()
})

let linksArr = document.querySelectorAll(".links ul li a")
linksArr.forEach(element => {
    element.addEventListener("click", (e) =>{
        links.classList.remove("open")
        menu.classList.remove("open")
    })
});