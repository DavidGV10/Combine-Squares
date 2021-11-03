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
                <option value="4">4x4</option>
                <option value="5">5x5</option>
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
                <div id="scoreContainer">
                    <div>
                        <div>Score</div>
                        <div id="score"></div>
                    </div>
                    <div class="gameOver">
                    <div class="hidden">
                        <h2>Game Over!!</h2>
                        <button id="game">TRY AGAIN</button>
                    </div>
                    
                    </div>
                </div>
            </div>
                
        
        </div>  
        
        
        `)
        const mode = "timer"
        const game = new Game(size, mode)
        game.start();
        const tryAgain = () => {
            game.arr = null
            game.score = 0
            const divOver = document.querySelector(".visible")
            const divCanvas = document.querySelector("#canvas")
            divOver.classList.remove("visible")
            divCanvas.classList.remove("opacity")
            game.start()
        }
        let tryagain = document.querySelector("#game").addEventListener("click", tryAgain)    

    }

    //Third Screen
    const buildGameOver = () => {
        buildDom(`
        <section class="game-over">
        <h1>Game Over</h1>
        <button id="game">TRY AGAIN</button>
        </section>
        `);
      
        const restartButton = document.querySelector("button");
        restartButton.addEventListener("click", buildGameScreen);
      };

window.addEventListener("load", splash)