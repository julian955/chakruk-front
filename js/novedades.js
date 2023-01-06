import {getUser, message} from './global.js'

let add = false
const baseUrl = 'https://chakruk-production.up.railway.app/'

async function getNew(){
    console.log('GET');

    await fetch(baseUrl + 'news', {
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
                loadData(data)
                getUser()              
            })
                .catch((err) => {
                    console.log(err);
                })
    });
}

document.getElementById('addNovedad').onclick = () => {makeForm()}

function loadData(novedades){
    const novedadesSec = document.querySelector('.novedades')

    for(let i = 0; i < novedades.length; i++){
        const novedad = document.createElement('div')
        novedad.className = 'novedades__novedad'
        novedad.id = 'novedad' + i.toString()

        const novedadDiv = document.createElement('div')
        novedadDiv.className = 'novedades__novedadDiv'

        novedadesSec.appendChild(novedad)
        novedad.appendChild(novedadDiv)

        const imgDiv = document.createElement('div')
        imgDiv.className = 'novedades__imgDiv'
        novedadDiv.appendChild(imgDiv)

        const img = document.createElement('img')
        img.src = './../img/' + novedades[i].image
        imgDiv.appendChild(img)

        const editImg = document.createElement('input')
        editImg.type = 'file'
        editImg.id = 'addImg'
        editImg.className = 'editNovedad' + i.toString()
        editImg.innerHTML = 'SELECCIONAR IMAGEN'
        editImg.onchange = () => {
            console.log(editImg.files);
            img.src = URL.createObjectURL(editImg.files[0])
        }
        imgDiv.appendChild(editImg)

        const h2 = document.createElement('h2')
        h2.innerHTML = novedades[i].title
        novedadDiv.appendChild(h2)
        const editTitle = document.createElement('input')
        editTitle.id = 'ti-' + i.toString()
        editTitle.className = 'editNovedad' + i.toString()
        editTitle.value = h2.innerHTML
        novedadDiv.appendChild(editTitle)

        for(let j = 0; j < novedades[i].body.length; j++){
            const p = document.createElement('p')
            p.innerHTML = novedades[i].body[j]
            p.className = 'pa-' + i.toString()
            novedadDiv.appendChild(p)
        }

        const editDesc = document.createElement('textarea')
        editDesc.id = 'de-' + i.toString()
        editDesc.className = 'editNovedad' + i.toString()
        novedadDiv.appendChild(editDesc)    
        function descValue(){
            console.log(editDesc.scrollHeight);
            
            let text = ''
            const par = document.getElementsByClassName('pa-' + i.toString())
            console.log(par);
            for(let j = 0; j < par.length; j++){
                if(j === par.length - 1){
                    text = text + par[j].innerHTML
                } else {
                    text = text + par[j].innerHTML + '\n'
                }
            }

            console.log(text);
            return text
        }

        const divFecha = document.createElement('div')
        divFecha.className = 'divDato'
        novedad.appendChild(divFecha)
        const fecha = document.createElement('p')
        fecha.id = 'fe-' +  + i.toString()
        fecha.innerHTML = '<span>Fecha: </span>' + novedades[i].date
        divFecha.appendChild(fecha)
        const editFecha = document.createElement('input')
        editFecha.className = 'editNovedad' + i.toString()
        editFecha.value = fecha.innerHTML.slice(20)
        divFecha.appendChild(editFecha)

        const divLugar = document.createElement('div')
        divLugar.className = 'divDato'
        novedad.appendChild(divLugar)
        const lugar = document.createElement('p')
        lugar.id = 'lu-' + i.toString()
        lugar.innerHTML = '<span>Lugar: </span>' + novedades[i].place + '  '
        divLugar.appendChild(lugar)
        const editLugar = document.createElement('input')
        editLugar.className = 'editNovedad' + i.toString()
        editLugar.value = lugar.innerHTML.slice(20)
        divLugar.appendChild(editLugar)
        
        const ubicacion = document.createElement('a')
        ubicacion.id = 'ub-' + i.toString()
        ubicacion.innerHTML = '    Ver Mapa'
        ubicacion.href = novedades[i].location
        lugar.appendChild(ubicacion)
        const editUbicacion = document.createElement('input')
        editUbicacion.className = 'editNovedad' + i.toString()
        editUbicacion.value = ubicacion.href
        editUbicacion.style.left = 'calc(48% + 4rem)'
        editUbicacion.style.width = '30%'
        divLugar.appendChild(editUbicacion)

        const divHorario = document.createElement('div')
        divHorario.className = 'divDato'
        novedad.appendChild(divHorario)
        const horario = document.createElement('p')
        horario.id = 'ho-' + i.toString()
        horario.innerHTML = '<span>Horario: </span>' + novedades[i].time
        divHorario.appendChild(horario)
        const editHorario = document.createElement('input')
        editHorario.className = 'editNovedad' + i.toString()
        editHorario.value = horario.innerHTML.slice(22)
        divHorario.appendChild(editHorario)

        const divCosto = document.createElement('div')
        divCosto.className = 'divDato'
        novedad.appendChild(divCosto)
        const costo = document.createElement('p')
        costo.id = 'co-' + i.toString()
        costo.innerHTML = '<span>Costo: </span>' + novedades[i].price
        divCosto.appendChild(costo)
        const editCosto = document.createElement('input')
        editCosto.className = 'editNovedad' + i.toString()
        editCosto.value = costo.innerHTML.slice(20)
        divCosto.appendChild(editCosto)

        const btn = document.createElement('div')
        btn.className = 'btn'
        const button = document.createElement('button')
        btn.appendChild(button)
        button.onclick = () => {
            window.location.href = novedades[i].twich
        }
        const span = document.createElement('span')
        span.innerHTML = 'VER EN TWICH'
        button.appendChild(span)
        
        let cl = ['top', 'left', 'bottom', 'right']
        for(let j = 0; j < cl.length; j++){
            const div = document.createElement('div')
            div.className = cl[j]
            button.appendChild(div)
        }
        novedad.appendChild(btn)

        const editNovedad = document.createElement('button')
        editNovedad.id = 'edit' + i.toString()
        editNovedad.className = 'admin edit'
        editNovedad.innerHTML = 'EDITAR'
        editNovedad.onclick = () => {
            const el = document.getElementsByClassName('editNovedad' + i.toString())
            console.log(el);

            for(let j = 0; j < el.length; j++){
                console.log(el[j]);
                el[j].style.display = 'block'
            }

            editDesc.value = descValue()
            editDesc.style.height = '0'
            editDesc.style.height = editDesc.scrollHeight + 'px'

            const parrafos = document.getElementsByClassName('pa-' + i.toString())

            for(let j = 0; j < parrafos.length; j++){
                console.log(el[j]);
                parrafos[j].innerHTML = ''
            }
        };

        const delNovedad = document.createElement('button')
        delNovedad.id = 'dc-' + i.toString()
        delNovedad.className = 'admin delNovedad'
        delNovedad.innerHTML = 'ELIMINAR'
        delNovedad.onclick = () => {
            deleteNew(novedades[i].id)
        }

        const save = document.createElement('button')
        save.id = 'sa-' + i.toString()
        save.className = 'editNovedad' + i.toString()
        save.innerHTML = 'GUARDAR'
        save.onclick = () => {
            const n = {
                title: editTitle.value,
                image: editImg.files[0].name, /////////
                body: editDesc.value.split('\n'),
                date: editFecha.value,
                place: editLugar.value,
                location: editUbicacion.value,
                time: editHorario.value,
                price: editCosto.value,
            }

            const hidde = document.getElementsByClassName('editNovedad' + i.toString())
        
            for(let j = 0; j < hidde.length; j++){
                hidde[j].style.display = 'none'
            }

            updateNovedades(novedades[i].id, n)
        }

        novedad.appendChild(editNovedad)
        novedad.appendChild(delNovedad)
        novedad.appendChild(save)

        const hidde = document.getElementsByClassName('editNovedad' + i.toString())
        
        for(let j = 0; j < hidde.length; j++){
            hidde[j].style.display = 'none'
        }
    }
}

function updateNovedades(id, novedad){
    fetch(baseUrl + 'news/' + id, {
        method: "PUT",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(novedad)
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

function deleteNew(id){
    fetch(baseUrl + 'news/' + id, {
        method: "DELETE",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    })
    .then((response) => {
        console.log(response);
        if(response.status === 200){
            message('valid.delete', '')
        } else {
            message('error.delete', '')
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function addNews(novedad) {

    fetch(baseUrl + 'news', {
        method: "POST",
        modo: "*cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        },
        body: JSON.stringify(novedad)
    })
    .then((response) => {
        console.log(response);
        if(response.status === 201){
            response.json()
            .then((data) => {
                console.log(data);
                message('valid.create', '')
            })
        } else {
            message('error.create', '')
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function makeForm(){
    console.log('form');

    if(add === false){
        add = true

        const form = document.querySelector('.novedadForm')

        const novedad = document.createElement('div')
        novedad.className = 'novedadForm__novedad'
        novedad.id = 'novedad0'

        form.appendChild(novedad)

        const novedadDiv = document.createElement('div')
        novedadDiv.className = 'novedadForm__novedadDiv'
        novedad.appendChild(novedadDiv)
        
        const imgDiv = document.createElement('div')
        imgDiv.className = 'novedadForm__imgDiv'
        novedadDiv.appendChild(imgDiv)

        const img = document.createElement('img')
        img.src = './../img/no-photo.png'
        imgDiv.appendChild(img)

        const editImg = document.createElement('input')
        editImg.type = 'file'
        editImg.id = 'addImg'
        editImg.className = 'editImg'
        editImg.innerHTML = 'SELECCIONAR IMAGEN'
        editImg.onchange = () => {
            console.log(editImg.files);
            img.src = URL.createObjectURL(editImg.files[0])
        }
        imgDiv.appendChild(editImg)

        const editTitle = document.createElement('input')
        editTitle.id = 'addTitle'
        editTitle.className = 'editTitle'
        editTitle.placeholder = 'Titulo de Novedad'
        novedadDiv.appendChild(editTitle)

        const editDesc = document.createElement('textarea')
        editDesc.id = 'addDesc'
        editDesc.className = 'editDesc'
        novedadDiv.appendChild(editDesc)    
        
        const editFecha = document.createElement('input')
        editFecha.className = 'editFecha addDato'
        editFecha.placeholder = 'Fecha'
        novedad.appendChild(editFecha)

        const editLugar = document.createElement('input')
        editLugar.className = 'editLugar addDato'
        editLugar.placeholder = 'Lugar'
        novedad.appendChild(editLugar)
        
        const editUbicacion = document.createElement('input')
        editUbicacion.className = 'editUbicacion addDato'
        editUbicacion.placeholder = 'Ubicacion(gmaps)'
        editUbicacion.style.left = 'calc(48% + 4rem)'
        editUbicacion.style.width = '30%'
        novedad.appendChild(editUbicacion)

        const editHorario = document.createElement('input')
        editHorario.className = 'editHorario addDato'
        editHorario.placeholder = 'Horario'
        novedad.appendChild(editHorario)

        const editCosto = document.createElement('input')
        editCosto.className = 'editCosto addDato'
        editCosto.placeholder = 'Costo'
        novedad.appendChild(editCosto)

        const save = document.createElement('button')
        save.innerHTML = 'CARGAR NOVEDAD'
        save.onclick = () => {
            const n = {
                title: editTitle.value,
                image: editImg.files[0].name,
                body: editDesc.value.split('\n'),
                date: editFecha.value,
                place: editLugar.value,
                location: editUbicacion.value,
                time: editHorario.value,
                price: editCosto.value,

            }

            addNews(n)
        }
        novedad.appendChild(save)

    }
}

getNew()