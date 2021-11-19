const container = document.querySelector('#container');

const width = 4
const height = 4
const personnage1 = {
    coord: {
        x: 0,
        y: 0
    },
    color: 'red'
}
const personnage2 = {
    coord: {
        x: 4,
        y: 4
    },
    color: 'blue'
}

// genère les cases du tableau en html
function generateMap(){
    for (let i = 0; i<height; i++){
        container.insertAdjacentHTML('beforeend', `<tr id="row-${i}" class="row"></tr>`)
        for (let j =0; j<width; j++){
            let rowEnCours = document.querySelector(`#row-${i}`);
            rowEnCours.insertAdjacentHTML('beforeend', `<td id="case-${i}-${j}" class="case bt br bb bl"></td>`)
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
    const {x: lastX, y: lastY} = lastCoord;
    lastCase = document.querySelector(`#case-${lastY}-${lastX}`)
    
    switch (direction){
        case 'haut':
            nextCase = document.querySelector(`#case-${lastY - 1}-${lastX}`)
            lastCase.classList.remove('bt')
            nextCase.classList.remove('bb')
            clear(lastCoord);
            personnage.coord.y > 0 ? personnage.coord.y-- : ''
            spawn(personnage)
            break
        case 'bas':
            nextCase = document.querySelector(`#case-${lastY + 1}-${lastX}`)
            lastCase.classList.remove('bb')
            nextCase.classList.remove('bt')
            clear(lastCoord);
            personnage.coord.y < height - 1 ? personnage.coord.y++ : ''
            spawn(personnage)
            break
        case 'droite':
            nextCase = document.querySelector(`#case-${lastY}-${lastX + 1}`)
            lastCase.classList.remove('br')
            nextCase.classList.remove('bl')
            clear(lastCoord);
            personnage.coord.x < width - 1 ? personnage.coord.x++ : ''
            spawn(personnage)
            break
        case 'gauche':
            nextCase = document.querySelector(`#case-${lastY}-${lastX - 1}`)
            lastCase.classList.remove('bl')
            nextCase.classList.remove('br')
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

    

