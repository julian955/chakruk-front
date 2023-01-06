
const navbar = document.getElementsByClassName("info__navbarTitle")
const desc = document.getElementsByClassName("info__desc")
let prev = 0

// --> Selecciona por defecto el primet item
navbar[prev].style.backgroundColor = "rgba(32, 32, 32, 0.93)"
desc[prev].style.height = "45rem"
// <--

// --> Funcion de seleccion de pestaña
const select = (i) => {
    if(i !== prev){
        navbar[i].style.backgroundColor = "rgba(32, 32, 32)"        
        desc[prev].style.zIndex = 1
        desc[i].style.zIndex = 4
        desc[i].style.backgroundColor = "rgba(32, 32, 32)"
        desc[i].style.height = "45rem"
        navbar[prev].style.backgroundColor = "black"
        
        setTimeout(() => {        
            desc[prev].style.height = "0"          
            navbar[prev].style.backgroundColor = "black"            
            desc[prev].scroll(0,0)            
            prev = i
        }, 1000); 
    }
}

for(let i = 0; i < navbar.length; i++){
    navbar[i].onclick = () => { select(i) }
}
// <--
