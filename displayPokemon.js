const HTML_response = document.querySelector('#poke');
const infoAll = document.getElementById('infoAll');
let key = 0;

export const pokeList = [];

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

export function displayPokemon(data, key){
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