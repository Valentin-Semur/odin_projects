import "./styles.css";

const Cell = (x, y, distance = 0, predecessor = null) => {
    return { x, y, distance, predecessor }
}

function isInside(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function findPath(startingPosition, targetPosition) {
    // Define the diretions to which the knight can move
    const dx = [-2, -1, 1, 2, -2, -1, 1, 2];
    const dy = [-1, -2, -2, -1, 1, 2, 2, 1];

    // Queue to store the knight state
    const queue = [];

    // Initialize the queue with the knights starting position
    queue.push(Cell(startingPosition[0], startingPosition[1]));

    let currentPosition;
    let x, y;

    // Already visited array
    const visit = Array.from({ length: 8}, () => Array(8).fill(false));
    
    // Visit starting position
    visit[startingPosition[0]][startingPosition[1]] = true;
    
    while (queue.length > 0) {
        currentPosition = queue.shift();

        // Return the Cell is the target position is reached
        if (currentPosition.x === targetPosition[0] && currentPosition.y === targetPosition[1])
            return currentPosition;

        // Explore all reachable positions
        for (let i = 0; i < 8; i++) {
            x = currentPosition.x + dx[i];
            y = currentPosition.y + dy[i];

            // If the position is valid and not visited, add t as its predecessor and push is to queue
            if (isInside(x, y) && !visit[x][y]) {
                visit[x][y] = true;
                queue.push(Cell(x, y, currentPosition.distance + 1, currentPosition));
            }
        }
    }

    // If there is no path, return -1;
    return -1;
}


const knightMoves = (startingPosition, targetPosition) => {
    let end = findPath(startingPosition, targetPosition);
    let path = end;
    let steps = [];
    
    // Add the position of each cell in the path to the target
    while (path.predecessor) {
        steps.unshift([path.x, path.y]);
        path = path.predecessor;
    };
    
    // Add the starting position to the array
    steps.unshift(startingPosition)

    // Log return message
    console.log(`You made it in ${end.distance} moves! Here's your path:`)
    for (let step of steps) {
        console.log(step)
    }


    return true

}

knightMoves([0,0], [7,7])
