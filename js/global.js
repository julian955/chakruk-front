
console.log('global');
const baseUrl = 'https://chakruk-production.up.railway.app/'

document.getElementById('navSelected').style.color = '#D251FF'
const navItems = document.getElementsByClassName('header__navbarItem')
for(let i = 0; i < navItems.length; i++){
    navItems[i].onclick = () => {
        sessionStorage.setItem('chacrukCommentId', -1)
    }
}

// --> Verifica el sessionStorage
if(sessionStorage.getItem('chacrukToken') === null){
    sessionStorage.setItem('chacrukToken', '')
    console.log('token undefined');
}
// <--


const body = document.getElementsByTagName('body')
const header = document.querySelector('header')
const login = document.querySelector(".header__loginButton")
const loginForm = document.querySelector(".header__loginForm")
const loginUser = document.querySelector(".header__loginUser")
const loginRegist = document.querySelector(".header__regist")
const msj = document.querySelector('.msjDiv')

const loginMsj = document.querySelector('.header__loginFormMsj')

// --> Oculta el header automaticamente
let scrollValue = window.scrollY

function setHeader() {
    if(window.scrollY > (scrollValue + 100)){
        header.style.height = '0rem'
        scrollValue = window.scrollY
    } else if(window.scrollY < (scrollValue - 100)){
        header.style.height = '5rem'
        scrollValue = window.scrollY        
    }
}

window.addEventListener("scroll", () => { setHeader()});
// <--


// --> Abre el modal del login
login.onclick = () => {
    console.log("click");
    loginUser.style.height = "0rem"
    if(!JSON.parse(sessionStorage.getItem("ChakrukLogin"))){
        loginUser.style.transitionDelay = "0s"
        loginRegist.style.transitionDelay = "0.5s"
        loginForm.style.display = "flex"
        setTimeout(() => {
            loginUser.style.height = "30rem"    
        }, 5);
        
    }
}
// <--

// --> Cierra el modal del login
const LoginClose = document.getElementsByClassName("header__close")
for(let i = 0; i < LoginClose.length; i++){
    LoginClose[i].onclick = () => {
        loginUser.style.transitionDelay = "0s"
        loginRegist.style.transitionDelay = "0s"
        loginUser.style.height = "0"        
        loginRegist.style.height = "0"
        setTimeout(() => {
            loginForm.style.display = "none"
        }, 500);        
    }
}
// <--


const user = document.querySelector("#name")

// --> Verificacion de contraseñas
function check() {
    const pass = document.querySelector("#passReg").value
    const repass = document.querySelector("#repass").value

    const passIn = document.getElementsByClassName("header__registPassIn")

    if(pass === repass && pass !== "" && repass !== "" && user.value !== ""){
        for(let i = 0; i < 2; i++){
            passIn[i].style.borderColor = "green"
        }
        document.querySelector('#createBtn').disabled = false

    } else {
        for(let i = 0; i < 2; i++){
            passIn[i].style.borderColor = "red"
        }
        document.querySelector('#createBtn').disabled = true
    }
}

const passReg = document.querySelector("#passReg")
passReg.oninput = () => check()

const repassReg = document.querySelector("#repass")
repassReg.oninput = () => check()
// <--


// --> Inicio de sesion
async function loginSession() {
    // let user = JSON.parse(localStorage.getItem("Usuario"))
    
    let u = {
        username: document.querySelector("#user").value,
        password: document.querySelector("#pass").value
    }

    console.log(u);
    
    await fetch(baseUrl + 'auth/login', {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(u)
    })
    .then((response) => {     
        if(response.status !== 200){
            invalidLogin()
        } else {  
            response.json()
                .then((data) => {
                    console.log(data.jwt);
                    console.log("Logeado exitosamente");
                    sessionStorage.setItem('chacrukToken', 'Bearer ' + data.jwt)
                })

            loginUser.style.transitionDelay = "0s"
            loginUser.style.height = "0" 
            setTimeout(() => {
                loginForm.style.display = "none"
                getUser()
            }, 500); 
    
            
        }
    });
}

document.querySelector("#loginBtn").onclick = () => {loginSession()}
// <--


const img = document.querySelector('#header__avatar')
let imgPath = ''


// --> Ir al registro
function toRegist() {
    loginUser.style.height = "0"
    loginRegist.style.height = "53rem"

    if(window.location.pathname.slice(0,6) === '/index'){
        imgPath =  'img/'
    } else {
        imgPath = '../img/'
    }

    img.src = imgPath + 'rey-animal.png'
}

document.querySelector("#registBtn").onclick = () => {toRegist()}
// <--

// --> Seleccion de avatar
function selectOnchange(reg) {
    const avatar = document.querySelector('#imgSelect').value
    const color = document.querySelector('#imgColor').value
    
    if(reg){
        img.src = imgPath + avatar + '-' + color + '.png'
    } else{
        return avatar + '-' + color + '.png'
    }

}

document.querySelector('#imgSelect').onchange = (e) => {
    e.preventDefault()
    selectOnchange(true)
}
document.querySelector('#imgColor').onchange = (e) => {
    e.preventDefault()
    selectOnchange(true)
}
// <-- 

const email = document.querySelector('#email')

// --> Registro de cuenta
async function regist() {
    console.log('regist')

    let u = {
        user: document.querySelector('#username').value,
        name: document.querySelector('#name').value,
        lastName: document.querySelector('#LastName').value,
        email: email.value,
        password: passReg.value,
        photo: selectOnchange(false)
    }

    await fetch(baseUrl + 'auth/register', {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(u)
    })
    .then((response) => {        
        console.log(response)

        if(response.status === 201){
            console.log("Registro exitoso.");
            message('valid.reg', 'closeall')
            loginRegist.style.transitionDelay = "0s"    
            loginRegist.style.height = "0" 

        } else {
            response.text() 
                .then((data) => {
                    console.log(data);
                    if(data.includes('The Email already exist')){
                        console.log('El email ya existe')
                        message('exists.email', 'keepOpen')
                    } else if(data.includes('The user already exist')){
                        console.log('usuario existente')
                        message('exists.user', 'keepOpen')
                    }
                })
        }
    });
}

document.querySelector('#createBtn').onclick = (e) => {
    e.preventDefault()
    regist()
}
// <--

let userData

async function getUser(){
    console.log(sessionStorage.getItem('chacrukToken'));    

    await fetch(baseUrl + 'auth/me', {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "Authorization": sessionStorage.getItem('chacrukToken')
        }
    })
    .then((response) => {        
        console.log(response)
        if(response.status === 200){
            response.json()
                .then((data) => {
                    console.log(data);
                    userData = data
                    login.innerHTML = data.user
                    login.href = './../pages/perfil.html'
                    sessionStorage.setItem('chakrukUser', data.user)

                    if(data.role === 'ADMIN'){
                        console.log('userAdmin');
                        const adminBtn = document.getElementsByClassName('admin')                       

                        for(let i = 0; i < adminBtn.length; i++){
                            adminBtn[i].style.display = 'block'
                        }

                        
                    } else {
                        const userBtn = document.getElementsByClassName('del' + data.user)
                        console.log(userBtn);

                        for(let i = 0; i < userBtn.length; i++){
                            userBtn[i].style.display = 'block'
                        }
                    }

                    if(document.querySelector('.newComment') !== null){
                        document.querySelector('.newComment').style.display = 'block'
                    }
                })
        } else {
            login.innerHTML = 'Log In'
            login.href = '#'
        }        
    });
}

function invalidLogin(){
    loginMsj.innerHTML = 'Usuario y/o contraseña incorrectos.'
    loginMsj.style.display = 'block'
    loginMsj.style.color = 'red'
}

function message(type, close){
    console.log('msj Popup');
    msj.style.display = 'flex'
    const msjTitle = document.querySelector('#msjTitle')
    const msjDesc = document.querySelector('#msjDesc')

    switch (type) {
        case 'exists.email':
            msjTitle.innerHTML = 'EMAIL EXISTENTE'
            msjDesc.innerHTML = 'El email ingresado ya existe por favor utilice otra cuenta de email.'
            break;

        case 'exists.user':
            msjTitle.innerHTML = 'USUARIO EXISTENTE'
            msjDesc.innerHTML = 'El usuario ingresado ya existe por favor elija otro distinto.'
            break;
        
        case 'valid.reg':
            msjTitle.innerHTML = '¡USUARIO CREADO EXITOSAMENTE!'
            msjDesc.innerHTML = 'Gracias por unirte a nuestra comunidad.\n Por favor, inicia sesión para acceder a mas contenido.'
            break;
        
        case 'valid.create':
            msjTitle.innerHTML = '¡NUEVO ELEMENTO CREADO!'
            msjDesc.innerHTML = 'El elemento ha sido creado exitosamente.'
        break;

        case 'error.create':
            msjTitle.innerHTML = '¡ERROR AL CREAR NUEVO ELEMENTO!'
            msjDesc.innerHTML = 'Ha surgido un problema y el elemento no a podido ser creado.\n Por favor, intentelo otra vez.'
        break;

        case 'valid.update':
            msjTitle.innerHTML = '¡ELEMENTO ACTUALIZADO!'
            msjDesc.innerHTML = 'El elemento ha sido actualizado exitosamente.'
        break;

        case 'error.update':
            msjTitle.innerHTML = 'ERROR AL ACTUALIZAR'
            msjDesc.innerHTML = 'Ha surgido un problema y el contenido no a podido actualizarse.\n Por favor, intentelo otra vez.'
            break;

        case 'valid.delete':
            msjTitle.innerHTML = 'ELEMENTO ELIMINADO'
            msjDesc.innerHTML = 'El elemento ha sido eliminado correctamente.'
            break;

        case 'error.delete':
            msjTitle.innerHTML = 'ERROR AL ELIMINAR'
            msjDesc.innerHTML = 'Ha surgido un problema y el contenido no a podido ser eliminado.\n Por favor, intentelo otra vez.'
            break;
        
        case 'error.pass':
            msjTitle.innerHTML = 'CONTRASEÑA INCORRECTA'
            msjDesc.innerHTML = 'La antigüa contraseña ingresada es incorrecta, por favor intentelo de nuevo.'
            break;
        
        case 'valid.pass':
            msjTitle.innerHTML = 'CONTRASEÑA ACTUALIZADA'
            msjDesc.innerHTML = 'La contraseña a sido actualizada correctamente!'
            break;
        
        case 'valid.comment':
            msjTitle.innerHTML = 'COMENTARIO CREADO'
            msjDesc.innerHTML = 'El comentario ha sido creado exitosamente'
            break;
        
        case 'error.comment':
            msjTitle.innerHTML = 'A OCURRIDO UN ERROR'
            msjDesc.innerHTML = 'Ups! Hubo un error y no pudimos cargar tu comentario. Por favor intentalo de nuevo.'
            break;

        default:
            break;
    }

    const msjBtn = document.querySelector('#msjBtn')

    if(close === 'closeall'){
        msjBtn.onclick = () => {
            msj.style.display = 'none'
            setTimeout(() => {
                loginForm.style.display = "none"
            }, 500);
        }
    } else {
        msjBtn.onclick = () => {
            msj.style.display = 'none'
            if(close !== 'keepOpen'){
                setTimeout(() => {
                    window.location.reload()
                }, 200);
            }
        }
    }
}


if(window.location.href.includes('index')){
    getUser()   
}


export { getUser, message, userData }
