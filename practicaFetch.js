

const search = document.getElementById('input-search');
const btn = document.getElementById('btn');
const HTML_response = document.querySelector('#poke');
const errorSearch = document.querySelector('.error-search');
const containerWarning = document.querySelector('.container-warning'); 
const infoAll = document.getElementById('infoAll');
let key = 0;

const pokeList = [];
const listExceededError = [];
const listError = [];

function fetchPokemon(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response)=>response.json())
    .then(data => {
        displayPokemon(data);
        pokeList.push(data);
        console.log(data);
        console.log(pokeList);
    })
    .catch(err => {
        listError.push(err)
        error(err);
        console.log(listError)
        });
}

function displayAllFeatures(data){
    
    const containerSearch = document.querySelector('.container-search');
    const containerInfo = document.createElement('div');
    containerInfo.innerHTML = `<h1>${data.name}</h1>`;

    const img = document.createElement('img');
    img.src = data.sprites.front_default;

    const typeContainer = document.createElement('div');
    typeContainer.innerHTML = `<h2>Tipo</h2>`;
    const types = document.createElement('div');
    const typeOut = data.types;
    const listTypes = typeOut.map((nameType, index) => `<p>${data.types[index].type.name}</p>`);
    types.innerHTML = listTypes.join(' ');
    console.log(typeOut);

    const buttonReturn = document.createElement('button');
    buttonReturn.setAttribute('id', key++);
    buttonReturn.textContent = 'Volver';
    
    containerInfo.appendChild(img);
    containerInfo.appendChild(types);
    displayHabilities(data,containerInfo);
    infoAll.appendChild(containerInfo);
    
    containerInfo.appendChild(buttonReturn);
    infoAll.style.display = 'block';
    HTML_response.style.display = 'none';
    containerSearch.style.display = 'none';

    buttonReturn.addEventListener('click', () =>{
        const btnReturn = document.getElementById(buttonReturn.getAttribute('id'));
        btnReturn.parentNode.remove();
        HTML_response.style.display = 'grid';
        containerSearch.style.display = 'grid';
    })

}

function displayHabilities(data, container){
    const contentAbilities = document.createElement('div');
    const abilityH6 = document.createElement('h6');
    abilityH6.textContent = `Habilidades`;
    const ability = document.createElement('p');
    const abilitiesOut = data.abilities;
    const listahabilidad = abilitiesOut.map((nameability, index) => {return ` ${data.abilities[index].ability.name}`});
    ability.textContent = `${listahabilidad}`;
    contentAbilities.appendChild(abilityH6);
    contentAbilities.appendChild(ability);
    container.appendChild(contentAbilities);
}

function displayPokemon(data){
    const containerPoke = document.createElement('div');
    containerPoke.classList.add('containerPoke')

    const namePoke = document.createElement('h4');
    namePoke.textContent = `${data.name}`;

    const img = document.createElement('img');
    img.src = data.sprites.front_default;

    const id = document.createElement('p')
    id.textContent = `${data.id}`;

    const btnFile = document.createElement('button');
    btnFile.setAttribute('id', key++);
    btnFile.innerText = 'Ver ficha';

    const btnPoke = document.createElement('button');
    btnPoke.setAttribute('id', key++);
    btnPoke.innerText = 'Eliminar';

    containerPoke.appendChild(namePoke);
    containerPoke.appendChild(img);
    containerPoke.appendChild(id);
    displayHabilities(data, containerPoke);
    containerPoke.appendChild(btnFile);
    containerPoke.appendChild(btnPoke);
    HTML_response.appendChild(containerPoke);

    btnPoke.addEventListener('click', ()=>{
        const btnDelete = document.getElementById(btnPoke.getAttribute('id'));
        pokeList.pop();
        btnDelete.parentNode.remove()
    });
    
    btnFile.addEventListener('click', () => {
        displayAllFeatures(data);
    })
}

function buttonXerror(div){
    const buttonError = document.createElement('button');
    buttonError.setAttribute('id', key++);
    buttonError.innerText = 'X';
    div.appendChild(buttonError);
    
    buttonError.addEventListener('click', ()=>{
        
        const deleteError = document.getElementById(buttonError.getAttribute('id'));
        
        listExceededError.pop();
        listError.pop();
        deleteError.parentNode.remove();
    });
}

function error(err){
    if(err){
        const divError = document.createElement('div');
        divError.classList.add('error');
        divError.innerText = `El nombre es incorrecto!`;
        errorSearch.appendChild(divError);
        if(listError.length >= 5){
            listError.pop();
            errorSearch.removeChild(divError);
        }
        
        buttonXerror(divError);   
    };
}

function amountExceeded(){
    const divWarning = document.createElement('div');
    divWarning.classList.add('error');
    divWarning.innerText = `Has excedido el numero de busquedas o errores, elimina algunas y continua!!!`;
    
    containerWarning.appendChild(divWarning);
    if(listExceededError.length > 3){
        listExceededError.pop();
        containerWarning.removeChild(divWarning);
        
    }
    buttonXerror(divWarning);
}

function controlInput(){
    
    btn.addEventListener('click', () => {
        if(pokeList.length >= 20){
            listExceededError.push(search.value);
            amountExceeded();
            
            console.log(listExceededError);
            
            
        }else{
            
            fetchPokemon(search.value);
        }
    });
    
}

controlInput();