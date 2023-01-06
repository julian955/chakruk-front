import { getUser, message } from './global.js'

console.log(window.location.href);
console.log(window.location.href.split('#combo')[1]);

let add = false
const baseUrl = 'https://chakruk-production.up.railway.app/'

async function getCombos(){
    console.log('GET');

    await fetch(baseUrl + 'combos', {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
    .then((response) => {
        response.json()
            .then((data) => {
                if(window.location.href.split('#combo')[1] === undefined){
                    loadData(data)
                    getUser()
                } else {
                    getOneCombo([window.location.href.split('#combo')[1]])
                }                
            })
                .catch((err) => {
                    console.log(err);
                })
    });
}

function loadData(combos){
    console.log(combos);
    const compras = document.querySelector('.compras')

    for(let i = 0; i < combos.length; i++){
        console.log(combos[i]);

        const combo = document.createElement('div')
        combo.className = 'compras__combo'
        combo.id = 'combo' + combos[i].id.toString()

        compras.appendChild(combo)

        const imgDiv = document.createElement('div')
        imgDiv.className = 'compras__imgDiv'
        const descDiv = document.createElement('div')
        descDiv.className = 'compras__descDiv'
        const priceDiv = document.createElement('div')
        priceDiv.className = 'compras__priceDiv'

        combo.appendChild(imgDiv)
        combo.appendChild(descDiv)
        combo.appendChild(priceDiv)

        const name = document.createElement('h2')
        name.innerHTML = combos[i].name
        name.id = 'ti-' + combos[i].id.toString()
        const editName = document.createElement('input')
        editName.value = name.innerHTML
        editName.id = 'edti-' + combos[i].id.toString()
        editName.className = 'editName editCombo' + combos[i].id.toString()
        const img = document.createElement('img')
        img.id = 'img-' + combos[i].id.toString()
        img.src = './../img/' + combos[i].image
        const changeImg = document.createElement('input')
        changeImg.type = 'file'
        changeImg.id = 'chImg-' + combos[i].id.toString()
        changeImg.className = 'editCombo' + combos[i].id.toString()
        changeImg.innerHTML = 'CAMBIAR IMAGEN'
        changeImg.onchange = () => {
            console.log(changeImg.files);
            img.src = URL.createObjectURL(changeImg.files[0])
        }


        imgDiv.appendChild(name)
        imgDiv.appendChild(editName)
        imgDiv.appendChild(img)
        imgDiv.appendChild(changeImg)

        const title = document.createElement('h4')
        title.innerHTML = 'Contenido:'
        const list = document.createElement('ul')
        list.id = 'ul-' + combos[i].id.toString()
        const editDesc = document.createElement('textarea')
        editDesc.id = 'ta-' + combos[i].id.toString()
        editDesc.className = 'editCombo' + combos[i].id.toString()
        
        function descValue(){
            let text = ''
            const lis = document.getElementsByClassName('li-' + combos[i].id.toString())
            console.log(lis);
            for(let j = 0; j < lis.length; j++){
                if(j === lis.length - 1){
                    text = text + lis[j].innerHTML
                } else {
                    text = text + lis[j].innerHTML + '\n'
                }
            }

            console.log(text);
            return text
        }

        const saveCombo = document.createElement('button')
        saveCombo.id = 'sv-' + combos[i].id.toString()
        saveCombo.innerHTML = 'GUARDAR'
        saveCombo.className = 'editCombo' + combos[i].id.toString()
        saveCombo.onclick = () => {
            let com = {name: '', description: [], price: 0.0, image: ''}

            com.name = editName.value
            com.description = editDesc.value.split('\n')
            com.price = editPrice.value
            com.image = changeImg.files[0]

            console.log(com);
            updateCombos(combos[i].id, com)
        }

        descDiv.appendChild(title)
        descDiv.appendChild(list)
        descDiv.appendChild(editDesc)
        descDiv.appendChild(saveCombo)

        for(let j = 0; j < combos[i].description.length; j++){
            const item = document.createElement('li')
            item.innerHTML = combos[i].description[j]
            item.className = 'li-' + combos[i].id.toString()

            list.appendChild(item)
        }

        const editCombo = document.createElement('button')
        editCombo.id = 'edit' + combos[i].id.toString()
        editCombo.className = 'admin edit'
        editCombo.innerHTML = 'EDITAR'
        editCombo.onclick = () => {
            const el = document.getElementsByClassName('editCombo' + combos[i].id.toString())
            console.log(el);

            for(let j = 0; j < el.length; j++){
                console.log(el[j]);
                el[j].style.display = 'block'
            }

            editDesc.value = descValue()
        };

        const delCombo = document.createElement('button')
        delCombo.id = 'dc-' + combos[i].id.toString()
        delCombo.className = 'admin delCombo'
        delCombo.innerHTML = 'ELIMINAR'
        delCombo.onclick = () => {
            deleteCombo(delCombo.id.slice(3))

            combos.splice(parseInt(delCombo.id.split('-')[1]), 1)
            document.querySelector('.compras').removeChild(document.getElementById('combo' + combos[i].id.toString()))
        }

        const price = document.createElement('h2')
        price.id = 'pr-' + combos[i].id.toString()
        price.innerHTML = '$ ' + combos[i].price.toString() + ',-'

        if(combos[i].price.toString()[0] === '&'){
            price.innerHTML = combos[i].price.toString().slice(1)
            price.style.fontSize = '1rem'
        }

        const editPrice = document.createElement('input')
        editPrice.value = price.innerHTML.slice(1,-2)
        editPrice.id = 'ep-' + combos[i].id.toString()
        editPrice.className = 'editCombo' + combos[i].id.toString()      
        const btn = document.createElement('div')
        btn.className = 'btn'
        const button = document.createElement('button')
        btn.appendChild(button)
        const span = document.createElement('span')
        span.innerHTML = 'COMPRAR'
        button.appendChild(span)
        
        let cl = ['top', 'left', 'bottom', 'right']
        for(let j = 0; j < cl.length; j++){
            const div = document.createElement('div')
            div.className = cl[j]
            button.appendChild(div)
        }

        priceDiv.appendChild(editCombo)
        priceDiv.appendChild(delCombo)
        priceDiv.appendChild(price)
        priceDiv.appendChild(editPrice)
        priceDiv.appendChild(btn)

        const hidde = document.getElementsByClassName('editCombo' + combos[i].id.toString())
        
        for(let j = 0; j < hidde.length; j++){
            hidde[j].style.display = 'none'
        }
    }
}

function updateCombos(id, com){
    let c = {
        name: com.name,
        description: com.description,
        price: parseFloat(com.price),
        image: com.image
    }
    console.log('id: ', id);
    console.log(c);

    fetch(baseUrl + 'combos/' + id, {
        method: "PUT",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(c)
    })
    .then((response) => {
        console.log(response);
        if(response.status === 200){
            response.json()
            .then((data) => {
                console.log(data);
                message('valid.update', '')
            })
        } else {
            message('error.update', '')
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function deleteCombo(id){
    console.log(id);
    fetch(baseUrl + 'combos/' + id, {
        method: "DELETE",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
    .then((response) => {
        console.log(response)
    });
}

async function getOneCombo(id){

    let d = []

    await fetch(baseUrl + '/combos/' + id, {
        method: "GET",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
    .then((response) => {
        response.json()
            .then((data) => {
                d.push(data)
                loadData(d)
            })
                .catch((err) => {
                    console.log(err);
                })
    });
}

function makeForm(){
    if(add === false){
        add = true

        const form = document.querySelector('.comboForm')

        const combo = document.createElement('div')
        combo.className = 'comboForm__combo'

        form.appendChild(combo)

        const imgDiv = document.createElement('div')
        imgDiv.className = 'comboForm__imgDiv'
        const descDiv = document.createElement('div')
        descDiv.className = 'comboForm__descDiv'
        const priceDiv = document.createElement('div')
        priceDiv.className = 'comboForm__priceDiv'

        combo.appendChild(imgDiv)
        combo.appendChild(descDiv)
        combo.appendChild(priceDiv)

        const editName = document.createElement('input')
        editName.placeholder = 'Nombre del Combo'
        editName.id = 'addName'
        editName.className = 'editName'
        const img = document.createElement('img')
        img.id = 'addImgShow'
        img.src = '#'
        const changeImg = document.createElement('input')
        changeImg.type = 'file'
        changeImg.id = 'addImg'
        changeImg.className = 'editImg'
        changeImg.innerHTML = 'SELECCIONAR IMAGEN'
        changeImg.onchange = () => {
            console.log(changeImg.files);
            img.src = URL.createObjectURL(changeImg.files[0])
        }

        imgDiv.appendChild(editName)
        imgDiv.appendChild(img)
        imgDiv.appendChild(changeImg)

        const title = document.createElement('h4')
        title.innerHTML = 'Contenido:'
        const editDesc = document.createElement('textarea')
        editDesc.id = 'addDesc'
        editDesc.placeholder = 'Ingrese el contenido del combo'

        const saveCombo = document.createElement('button')
        saveCombo.id = 'addSv'
        saveCombo.innerHTML = 'GUARDAR'

        descDiv.appendChild(title)
        descDiv.appendChild(editDesc)
        descDiv.appendChild(saveCombo)

        const editPrice = document.createElement('input')
        editPrice.placeholder = 'Precio'
        editPrice.id = 'addPr'

        priceDiv.appendChild(editPrice)

        saveCombo.onclick = () => {
            let c = {
                name: editName.value,
                description: editDesc.value.split('\n'),
                price: parseFloat(editPrice.value),
                image: changeImg.files[0].name
            }

            newCombo(c)
        }
    }
}

const addCombo = document.getElementById('addCombo')
addCombo.onclick = () => {
    makeForm()
}

async function newCombo(combo){
    console.log(combo);
    await fetch(baseUrl + 'combos', {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(combo)
    })
    .then((response) => {
        console.log(response.status)

        if(response.status === 201){
            message('valid.create')
        }else{
            message('error.create')
        }
        
    });
}

getCombos()

