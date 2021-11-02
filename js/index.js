let size;
const buildDom = (html) => {
    const main = document.querySelector("main")
    main.innerHTML = html
}  
const buildDomGameOver = (html) => {
    const gameOver = document.querySelector("#gameOver")
}  
const val = () => {
    const table = document.querySelector("select")
    size = table.options[table.selectedIndex].value;
    //console.log(size)
    return size
}
const splash = () => {
    buildDom(     
        `
        <div class"select">
            <h1>Select table</h1>
            <select name="select" onchange="val()">
                <option value="3">3x3</option>
                <option value="5">5x5</option>
                <option value="6">6x6</option>
            </select>
        <div>

        <button id="startButton">Start Game</button>`
    );
    const table = document.querySelector("select")
    size = table.options[table.selectedIndex].value;
    //console.log("h"+size)
    const startButton = document.getElementById("startButton")
    startButton.addEventListener("click", buildGameScreen);
    }   
    //Second Screen
    const buildGameScreen = ()=> {
        buildDom(
        `
        <div id="game-board">
        <div id="canvascontainer">
            <canvas id="canvas"></canvas>
        </div>
        <div class="gameOver">
            <div id="score"></div>
            <h1 class="hidden">Game Over!!</h1>

        </div>
        
        </div>  
        
        
        `)
        const game = new Game()
        game.start(size);
    }

    //Third Screen
    const buildGameOver = () => {
        buildDom(`
        <section class="game-over">
        <h1>Game Over</h1>
        <button id = "game"> TRY AGAIN</button>
        </section>
        `);
      
        const restartButton = document.querySelector("button");
        restartButton.addEventListener("click", buildGameScreen);
      };

window.addEventListener("load", splash)