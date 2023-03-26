const HTML_response = document.querySelector('#poke');
const infoAll = document.getElementById('infoAll');
let key = 0;

export const pokeList = [];

function dataUpperCase(data){
    let namedata = [data];
    let nameUpperCase = namedata.map(word => word[0].toUpperCase() + word.slice(1));
    return nameUpperCase;
    
}

function displayTypesPoke(data, container){
    const typeContainer = document.createElement('div');
    typeContainer.classList.add('type-cont')
    typeContainer.innerHTML = `<h2>Tipo</h2>`;
    const types = document.createElement('div');
    const typeOut = data.types;
    const listTypes = typeOut.map((nameType, index) => `<p>${data.types[index].type.name}</p>`);
    types.innerHTML = listTypes.join(' ');
    typeContainer.appendChild(types);
    container.appendChild(typeContainer);
}

function displayNamePoke(data, container){
    const containerNamePoke =document.createElement('div')
    containerNamePoke.classList.add('name-poke');
    const namePoke = document.createElement('h4');
    const namedata = dataUpperCase(data.name);
    namePoke.textContent = `${namedata}`;
    containerNamePoke.appendChild(namePoke);
    container.appendChild(containerNamePoke);
}

function displayImgPoke(data, container){
    const containerImg = document.createElement('div');
    containerImg.classList.add('img-container');
    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    containerImg.appendChild(img);
    container.appendChild(containerImg);

}

function displayHabilities(data, container){
    const contentAbilities = document.createElement('div');
    contentAbilities.classList.add('cont-habi')
    const abilityH6 = document.createElement('h3');
    abilityH6.textContent = `Habilidades`;
    const ability = document.createElement('p');
    const abilitiesOut = data.abilities;
    const listahabilidad = abilitiesOut.map((nameability, index) => {return ` ${data.abilities[index].ability.name}`});
    ability.textContent = `${listahabilidad}`;
    contentAbilities.appendChild(abilityH6);
    contentAbilities.appendChild(ability);
    container.appendChild(contentAbilities);
}

function btnsDisplayPoke(data, container,){
    
    const containerBtn = document.createElement('div');
    containerBtn.classList.add('cont-btn');

    const btnFile = document.createElement('button');
    btnFile.innerText = 'Ver ficha';
    containerBtn.appendChild(btnFile)

    const btnPoke = document.createElement('button');
    btnPoke.innerText = 'Eliminar';
    containerBtn.appendChild(btnPoke);
    container.appendChild(containerBtn);

    btnPoke.addEventListener('click', (event)=>{
        pokeList.pop();
        event.target.parentNode.parentNode.remove();
    });

    btnFile.addEventListener('click', () => {
              displayAllFeatures(data);
            })
}

export function displayPokemon(data){
    const containerPoke = document.createElement('div');
    containerPoke.classList.add('containerPoke');

    
    const containerId = document.createElement('div');
    containerId.classList.add('id-container');
    const id = document.createElement('p');
    id.textContent = `N° ${data.id}`;
    containerId.appendChild(id);

    
    displayNamePoke(data, containerPoke)
    displayImgPoke(data, containerPoke);
    containerPoke.appendChild(containerId);
    displayHabilities(data, containerPoke);
    btnsDisplayPoke(data, containerPoke);
    HTML_response.appendChild(containerPoke);   
}

function displayAllFeatures(data){
    
    const containerSearch = document.querySelector('.container-search'); 
    const containerInfo = document.createElement('div');

    const buttonReturn = document.createElement('button');
    buttonReturn.setAttribute('id', key++);
    buttonReturn.textContent = 'Volver';

    const containerImgType = document.createElement('div');
    containerImgType.classList.add('cont-imgtype');

    
    displayNamePoke(data, containerInfo);
    containerInfo.appendChild(containerImgType);
    displayImgPoke(data, containerImgType);
    displayTypesPoke(data, containerImgType);

    //containerInfo.appendChild(types);
    displayHabilities(data,containerInfo);
    infoAll.appendChild(containerInfo);
    
    containerInfo.appendChild(buttonReturn);
    infoAll.style.display = 'block';
    containerInfo.style.display = 'grid';
    containerInfo.style.gridTemplateRows = '1fr 4fr 1fr 1fr';
    containerInfo.style.rowGap = '10px';
    HTML_response.style.display = 'none';
    containerSearch.style.display = 'none';

    buttonReturn.addEventListener('click', () =>{
        const btnReturn = document.getElementById(buttonReturn.getAttribute('id'));
        btnReturn.parentNode.remove();
        HTML_response.style.display = 'grid';
        containerSearch.style.display = 'grid';
    })

}