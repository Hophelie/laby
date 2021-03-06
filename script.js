const container = document.querySelector('#container');

const width = 50
const height = 25
const personnage1 = {
    coord: {
        x: 0,
        y: 0
    },
    color: 'red'
}
const personnage2 = {
    coord: {
        x: width -1,
        y: height -1
    },
    color: 'blue'
}

const grid = []

// genère les cases du tableau en html
function generateMap(){
    for (let i = 0; i<height; i++){
        container.insertAdjacentHTML('beforeend', `<tr id="row-${i}" class="row"></tr>`)
        for (let j =0; j<width; j++){
            let rowEnCours = document.querySelector(`#row-${i}`);
            rowEnCours.insertAdjacentHTML('beforeend', `<td id="case-${i}-${j}" class="case bt br bb bl"></td>`)

            const cell = document.getElementById(`case-${i}-${j}`)
            let newCase = {
                x: j,
                y: i,
                isVisited: false,
                element: cell
            }
            grid.push(newCase)
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
            moveInLab(personnage1, 'haut')
            break 
        case 'ArrowDown':
            moveInLab(personnage1, 'bas')
            break
        case 'ArrowRight':
            moveInLab(personnage1, 'droite')
            break 
        case 'ArrowLeft':
            moveInLab(personnage1, 'gauche')
            break
        case 'z':
            moveInLab(personnage2, 'haut')
            break 
        case 's':
            moveInLab(personnage2, 'bas')
            break
        case 'd':
            moveInLab(personnage2, 'droite')
            break 
        case 'q':
            moveInLab(personnage2, 'gauche')
            break
        default:
            console.log('vous appuyez sur une mauvaise touche');
   }
}

function moveAndDestroy(personnage,direction){

    // copie par valeur 
    const lastCoord = JSON.parse(JSON.stringify(personnage.coord))

    // copie par référence : lie 2 variables et les rend dépendants l'une de l'autre (si on modifie une , l'autre est modifié aussi car les 2 font référence à la meme chose)
    // const lastCoord = personnage.coord

    const {x: lastX, y: lastY} = lastCoord;
    lastCase = document.querySelector(`#case-${lastY}-${lastX}`)
    
    switch (direction){
        case 'haut':
            nextCase = document.querySelector(`#case-${lastY - 1}-${lastX}`)
            lastCase.classList.remove('bt')
            nextCase.classList.remove('bb')
            personnage.coord.y > 0 ? personnage.coord.y-- : ''
            break
        case 'bas':
            nextCase = document.querySelector(`#case-${lastY + 1}-${lastX}`)
            lastCase.classList.remove('bb')
            nextCase.classList.remove('bt')
            personnage.coord.y < height - 1 ? personnage.coord.y++ : ''
            break
        case 'droite':
            nextCase = document.querySelector(`#case-${lastY}-${lastX + 1}`)
            lastCase.classList.remove('br')
            nextCase.classList.remove('bl')
            personnage.coord.x < width - 1 ? personnage.coord.x++ : ''
            break
        case 'gauche':
            nextCase = document.querySelector(`#case-${lastY}-${lastX - 1}`)
            lastCase.classList.remove('bl')
            nextCase.classList.remove('br')
            personnage.coord.x > 0 ? personnage.coord.x-- : ''
            break
    }
    // pour que lastcoord conserve l'ancienne valeur de personnage.coord on a effectué une copie par valeur
    clear(lastCoord);
    cellToCheck = grid.find(cell => cell.x == personnage.coord.x && cell.y == personnage.coord.y)
    cellToCheck.isVisited = true

    personnage.historique.push({coord: personnage.coord, direction: direction})
    spawn(personnage)

}

function move(personnage,direction){

    const lastCoord = JSON.parse(JSON.stringify(personnage.coord))
    switch (direction){
        case 'haut':
            
            personnage.coord.y > 0 ? personnage.coord.y-- : ''
            break
        case 'bas':
            personnage.coord.y < height - 1 ? personnage.coord.y++ : ''
            break
        case 'droite':
            personnage.coord.x < width - 1 ? personnage.coord.x++ : ''
            break
        case 'gauche':
            personnage.coord.x > 0 ? personnage.coord.x-- : ''
            break
    }
    clear(lastCoord);
    spawn(personnage)

    personnage.historique.pop()
}

function moveInLab(personnage,direction){

    const lastCoord = JSON.parse(JSON.stringify(personnage.coord))
    
    const currentCase = document.querySelector(`#case-${lastCoord.y}-${lastCoord.x}`)

    switch (direction){
        case 'haut':
            if(!currentCase.classList.contains('bt')){
                personnage.coord.y > 0 ? personnage.coord.y-- : ''
            }
            break
        case 'bas':
            if(!currentCase.classList.contains('bb')){
            personnage.coord.y < height - 1 ? personnage.coord.y++ : ''
            }
            break
        case 'droite':
            if(!currentCase.classList.contains('br')){
            personnage.coord.x < width - 1 ? personnage.coord.x++ : ''
            }
            break
        case 'gauche':
            if(!currentCase.classList.contains('bl')){
            personnage.coord.x > 0 ? personnage.coord.x-- : ''
            }
            break
    }
    clear(lastCoord);
    spawn(personnage)

}

function clear(lastCoord){
    const {x: lastX, y: lastY} = lastCoord;
    
    lastCase = document.querySelector(`#case-${lastY}-${lastX}`)
    lastCase.style.backgroundColor == 'yellow' || 'blue' || 'red' ? lastCase.style.backgroundColor = 'white': '';
}

const Generator = {
    coord: {
        x: 0,
        y: 0
    },
    color: 'yellow',
    historique: []
}

const createLaby = () => {
    // on fait spawn le generator et on marque sa cellule de spawn comme 'Visité'
    spawn(Generator);
    cellToCheck = grid.find(cell => cell.x == Generator.coord.x && cell.y == Generator.coord.y)
    cellToCheck.isVisited = true

    // firstCell = findNextCell(Generator.coord)
    // moveAndDestroy(Generator,firstCell.direction)
    //     while (Generator.coord.x !== 0 || Generator.coord.y !==0) {
    //         nextCell = findNextCell(Generator.coord)
    //         if(nextCell){
    //             moveAndDestroy(Generator,nextCell.direction)
    //         }else{
    //             lastDirection = Generator.historique[Generator.historique.length - 1].direction
    //             reverseDirection = reverse(lastDirection)
    //             move(Generator,reverseDirection)
    //         }
            
    //     }

    setInterval(function(){
        nextCell = findNextCell(Generator.coord)
            if(nextCell){
                moveAndDestroy(Generator,nextCell.direction)
            }else{
                lastDirection = Generator.historique[Generator.historique.length - 1].direction
                reverseDirection = reverse(lastDirection)
                move(Generator,reverseDirection)
            }
    },1)
            
        

}

const findNextCell = (coord) => {
    let possibleCells = grid.filter((cell) => {
        if(!cell.isVisited){
                if (cell.x == coord.x && cell.y == coord.y + 1){
                    // en bas
                    return true
                }else if (cell.x == coord.x && cell.y == coord.y - 1){
                    // en haut
                    return true
                }else if (cell.x == coord.x + 1 && cell.y == coord.y){
                    // a droite
                    return true
                }else if (cell.x == coord.x - 1 && cell.y == coord.y){
                    // gauche
                    return true
                }else{
                    return false
                }

        }
        
    })

    if (possibleCells.length > 0){
        updatePossibleCells = possibleCells.map(cell => {
            if (cell.x == coord.x && cell.y == coord.y + 1){
                // en bas
                cell.direction = 'bas'
            }else if (cell.x == coord.x && cell.y == coord.y - 1){
                // en haut
                cell.direction = 'haut'
            }else if (cell.x == coord.x + 1 && cell.y == coord.y){
                // a droite
                cell.direction = 'droite'
            }else if (cell.x == coord.x - 1 && cell.y == coord.y){
                // gauche
                cell.direction = 'gauche'
            }
            return cell
        })
    
    
    
    
    
        let random = Math.floor(Math.random() * possibleCells.length);
            randomCell = updatePossibleCells[random];
        return randomCell
    }else{
        return false
    }
}

const reverse = direction => {
    switch (direction) {
        case 'droite':
            return 'gauche'
        case 'gauche':
            return 'droite'
        case 'bas':
            return 'haut'
        case 'haut':
            return 'bas'
    }
}













document.addEventListener('DOMContentLoaded', () => {

    generateMap();
    createLaby();
    spawn(personnage1);
    spawn(personnage2);
})

document.addEventListener('keydown', (e) => {
    updatePosition(e)
})

    

