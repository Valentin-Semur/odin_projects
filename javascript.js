
const grid = document.querySelector(".grid");
const gridSize = 10; // to make interactive later

for (let i = 0; i < gridSize; i++) {
    const boxColumn = document.createElement("div");
    boxColumn.classList.toggle("box-column")
    for (let j = 0; j < gridSize; j++) {
        const box = document.createElement("div");
        box.classList.toggle("box")
        boxColumn.appendChild(box);
    }
    grid.appendChild(boxColumn)
}

var isToggling = false;
var isColouring = true;
var colour = "black"

function enableToggle(e) {
    console.log("enable toggle")
    isToggling = true;

    if (e.target !== grid) {
        toggle(e);
    }
}

function disableToggle() {
    console.log("disable toggle")
    isToggling = false;
}

function toggle(e) {
    if (isToggling === false) {
        return;
    }
    if (!e.target.classList.value.includes(`coloured-${colour}`)) {
        e.target.classList.toggle(`coloured-${colour}`);
    }
}

document.onmousedown = enableToggle;

const boxes = document.querySelectorAll(".box");
for (let i = 0; i < boxes.length; i++) {
        boxes[i].onmouseenter = toggle
}

document.onmouseup = disableToggle;