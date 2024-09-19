
function enableToggle(e) {
    isToggling = true;

    if (e.target !== grid) {
        toggle(e);
    }
}

function disableToggle() {
    isToggling = false;
}

function toggle(e) {
    if (isToggling === false) {
        return;
    }
    resetColor(e.target)
    e.target.classList.toggle(`colored-${color}`);
    // if (!e.target.classList.value.includes(`colored-${color}`)) {
    //     e.target.classList.toggle(`colored-${color}`);
    // }
}

function changeColor(e) {
    color = e.currentTarget.getAttribute("id")
    showSelectedColor()
}

function resetGrid() {
    const boxes = document.querySelectorAll(".box");
    const colorBackup = color
    color = "Reset"
    for (let i = 0; i < boxes.length; i++) {
        resetColor(boxes[i])
    }
    color = colorBackup
}

function resetColor(box) {
    const boxClasses = box.classList.value.split(" ")
    for (let i = 0; i < boxClasses.length; i++) {
        if (boxClasses[i].includes("colored") && !boxClasses[i].includes(`colored-${color}`)) {
            box.classList.toggle(boxClasses[i]);
        }
    }
}

function showSelectedColor() {
    const colorChoices = document.querySelectorAll(".choice");
    for (let i = 0; i < colorChoices.length; i++) {
        const colorChoiceClasses = colorChoices[i].classList.value.split(" ")
        const colorChoiceID = colorChoices[i].getAttribute("id")
        if (colorChoiceClasses.includes("selected") && colorChoiceID !== color) {
            colorChoices[i].classList.toggle("selected")
        } else if (colorChoiceID === color && !colorChoiceClasses.includes("selected")) {
            colorChoices[i].classList.toggle("selected")
        }
    }
}

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        const boxColumn = document.createElement("div");
        boxColumn.classList.toggle("box-column")
        for (let j = 0; j < size; j++) {
            const box = document.createElement("div");
            box.classList.toggle("box")
            boxColumn.appendChild(box);
        }
        grid.appendChild(boxColumn)
    }
}

function deleteGrid() {
    grid.innerHTML = ""
}

function resetGrid() {
    deleteGrid()
    createGrid(gridSize)
}

function changeGridSize() {
    const inputSize = document.querySelector("#input-box")
    gridSize = +inputSize.value
    init()
}


function init() {

    resetGrid()

    const colors = document.querySelectorAll(".choice");
    for (let i = 0; i < colors.length; i++) {
        colors[i].addEventListener("click", changeColor)
    }
    
    const reset = document.querySelector(".reset")
    reset.addEventListener("click", init)

    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].onmouseenter = toggle
    }

    const changeGridSizeButton = document.querySelector(".change-grid")
    changeGridSizeButton.addEventListener("click", changeGridSize)

    showSelectedColor()
}


const grid = document.querySelector(".grid");
var gridSize = 10;








var isToggling = false;
var color = "black"

document.onmousedown = enableToggle;
document.onmouseup = disableToggle;

init()