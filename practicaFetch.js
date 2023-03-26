import {displayPokemon, pokeList} from './displayPokemon.js';

const search = document.getElementById('input-search');
const btn = document.getElementById('btn');
const errorSearch = document.querySelector('.error-search');
const containerWarning = document.querySelector('.container-warning'); 
let key = 0;


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

function buttonXerror(div){
    const buttonError = document.createElement('button');
    buttonError.setAttribute('id', key++);
    buttonError.classList.add('btn');
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