const container = document.querySelector('#container');

let length = 25
let width = 25
let personnage1 = {
    coord: {
        x: 5,
        y: 0
    },
    color: 'red'
}
let personnage2 = {
    coord: {
        x: 5,
        y: 24
    },
    color: 'blue'
}

// genère les cases du tableau en html
function generateMap(){
    for (let i = 0; i<length; i++){
        container.insertAdjacentHTML('beforeend', `<div id="row-${i}" class="row"></div>`)
        for (let j =0; j<width; j++){
            let rowEnCours = document.querySelector(`#row-${i}`);
            rowEnCours.insertAdjacentHTML('beforeend', `<div id="case-${i}-${j}" class="case"></div>`)
        }
    }
}

// colore la case de départ du personnage en fonction de sa couleur
function spawn(personnage){
    const x = personnage.coord.x
    const y = personnage.coord.y
    const color = personnage.color
    spawnCase = document.querySelector(`#case-${y}-${x}`)
    spawnCase.style.backgroundColor=color
}

function updatePosition(event){

   switch (event.key){
        case 'ArrowUp':
            move(personnage1, 'haut')
            break 
        case 'ArrowDown':
            move(personnage1, 'bas')
            break
        case 'ArrowRight':
            move(personnage1, 'droite')
            break 
        case 'ArrowLeft':
            move(personnage1, 'gauche')
            break
        case 'z':
            move(personnage2, 'haut')
            break 
        case 's':
            move(personnage2, 'bas')
            break
        case 'd':
            move(personnage2, 'droite')
            break 
        case 'q':
            move(personnage2, 'gauche')
            break
        default:
            console.log('vous appuyez sur une mauvaise touche');
   }
}

function move(personnage,direction){

    const lastCoord = personnage.coord
    switch (direction){
        case 'haut':
            clear(lastCoord);
            personnage.coord.y > 0 ? personnage.coord.y-- : ''
            spawn(personnage)
            break
        case 'bas':
            clear(lastCoord);
            personnage.coord.y < 24 ? personnage.coord.y++ : ''
            spawn(personnage)
            break
        case 'droite':
            clear(lastCoord);
            personnage.coord.x < 24 ? personnage.coord.x++ : ''
            spawn(personnage)
            break
        case 'gauche':
            clear(lastCoord);
            personnage.coord.x > 0 ? personnage.coord.x-- : ''
            spawn(personnage)
            break
    }
}

function clear(lastCoord){
    const {x: lastX, y: lastY} = lastCoord;
    
    lastCase = document.querySelector(`#case-${lastY}-${lastX}`)
    lastCase.style.backgroundColor == 'blue' ? lastCase.style.backgroundColor = 'white': '';
}
















document.addEventListener('DOMContentLoaded', () => {

    generateMap();
    spawn(personnage1);
    spawn(personnage2);
})

document.addEventListener('keydown', (e) => {
    updatePosition(e)
})

    

