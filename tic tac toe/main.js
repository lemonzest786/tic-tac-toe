const boardstate = [
    null,null,null,
    null,null,null,
    null,null,null,
];

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
];

let activePlayer = 0;
const cell = document.querySelectorAll("td");

cell.forEach(function (cell, index) {
cell.dataset.index = index;
cell.onmouseover = function () {
    cell.style.backgroundcolor = "#ccc";
    cell.style.transition = "1s";
}

cell.onmouseout = function () {
    cell.style.backgroundcolor = "#fff";
}

cell.addEventListener("click", clicked);
});

function clicked (event) {
    const index = Number(event.target.dataset.index);
    
    const letter = activePlayer ? "o" : "x";

    const cell = event.target;
    event.target.textContent = letter;

    boardstate[index] = activePlayer;

    cell.removeEventListener("click", clicked);
    cell.onmouseover = null;

    if (hasWon()) {
        window.location = "./winner.html";
    }

    if (hasDrawn()){
        window.location = "./draw.html";
    }

    activePlayer = activePlayer ? 0 : 1;
 }

 function hasWon () {
    for (const condition of winConditions) {
        const boardvalues = condition.map(function (item) {
            return boardstate[item];
        });

        const playerPieces = boardvalues.filter(function (item) {
            return item === activePlayer;
        });
        
      if (playerPieces.length === 3) return true;
    }

    return false;
 }

 function hasDrawn () {
    const boardCapacity = boardstate.filter(function (item) {
    return item !== null;
   });
  
   return boardCapacity.length === boardstate.length;
 }

 const again = document.querySelector("again");
 if (again) {
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
 }
