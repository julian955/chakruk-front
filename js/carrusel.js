const elemCar = [
    {
        id: "zi2lwjdtQbc",
        img: 'previaAtlantida.png'
    },
    {
        id: "xd7LXDsnqpI",
        img: 'previaHistoria3Minutos.png'
    },
    {
        id: "vfnf2I3ifak",
        img: 'previaLike10.png'
    },
    {
        id: "DjEKzA_vFHA",
        img: 'previaVideoTorneo.png'
    }
]

for(let i = 0; i < elemCar.length; i++){
    const div = document.createElement("div")
    div.className = "carrusel__element"
    div.id = "img" + i

    const element = document.createElement("img")
    element.src = './../img/' + elemCar[i].img

    const btn = document.createElement('button')
    btn.onclick = () => {openVideo(elemCar[i].id)}
    btn.innerHTML = '▶'
    btn.className = 'play'
    btn.id = 'btn' + i

    document.querySelector(".carrusel__main").appendChild(div)
    document.querySelector("#" + div.id).appendChild(element)
    document.querySelector("#" + div.id).appendChild(btn)
}

const imgArray = document.getElementsByClassName("carrusel__element")

console.log(imgArray)
console.log(imgArray.length);

for(let i = 1; i < imgArray.length; i++){
    console.log(imgArray[i]);
    imgArray[i].style.width = "0"
}

let countCarr = 0
const carrLeft = document.querySelector("#left")
carrLeft.onclick = () => left()
const carrRigth = document.querySelector("#right")
carrRigth.onclick = () => right()

function left() {
    console.log("left");    
    document.getElementById("img" + countCarr.toString()).style.width = "0"
    document.getElementById("btn" + countCarr.toString()).style.display = "none"
    if(countCarr === 0){
        countCarr = imgArray.length
    }
    document.getElementById("img" + (countCarr - 1).toString()).style.width = "auto"
    document.getElementById("btn" + (countCarr - 1).toString()).style.display = "block"
    countCarr--
}

function right() {
    console.log("right");
    document.getElementById("img" + countCarr.toString()).style.width = "0"
    document.getElementById("btn" + countCarr.toString()).style.display = "none"
    if(countCarr === imgArray.length - 1){
        countCarr = -1
    }
    document.getElementById("img" + (countCarr + 1).toString()).style.width = "auto"
    document.getElementById("btn" + (countCarr + 1).toString()).style.display = "block"
    countCarr++
}

function openVideo(id) {
    window.scrollTo(0,0);

    const videoDiv = document.createElement('div')
    videoDiv.className = 'videoDiv'

    const video = document.createElement('iframe')
    video.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&mute=0'
    video.allow = 'autoplay'

    const closeVid = document.createElement('button')
    closeVid.className = 'videoDiv__closeVid'
    closeVid.innerHTML = 'X'
    closeVid.onclick = () => {
        document.body.removeChild(videoDiv)
    }
    
    document.body.appendChild(videoDiv)
    videoDiv.appendChild(video)
    videoDiv.appendChild(closeVid)

    setTimeout(() => {
        video.muted = 0
    }, 10);
}