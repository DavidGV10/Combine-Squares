console.log("hola")
const buildDom = (html) => {
    const main = document.querySelector("main")
    main.innerHTML = html
}  
const buildDomGameOver = (html) => {
    const gameOver = document.querySelector("#gameOver")
}  
const splash = () => {
    buildDom(     
        `
        <div class"select">
            <h1>Select table</h1>
            <select name="select">
                <option value="3">3x3</option>
                <option value="5" selected>5x5</option>
                <option value="6">6x6</option>
            </select>
        <div>

        <button id="startButton">Start Game</button>`
    );

    const startButton = document.getElementById("startButton")
    startButton.addEventListener("click", buildGameScreen);
    }   
    //Second Screen
    const buildGameScreen = ()=> {
        buildDom(
        `
        <div id="game-board">
        <canvas id="canvas" width="600" height="600"></canvas>
        <div class="gameOver"><h1>Game Over!!</h1></div>
        
        </div>  
        
        
        `)
        const game = new Game()
        game.start();
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