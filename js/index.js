let size;
let selectedValue;
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
    return size
}
const handleChange= (src) =>{
    selectedValue = src.value
    return selectedValue
}

const isChecked = ()=>{
    if(selectedValue !== undefined){
        buildGameScreen()
   }else{
        const error = document.querySelector(".error")
        error.textContent = "Select an option!"
   }
}

const splash = () => {
    buildDom(     
        `
        <div class="select">
            <h1>Select table</h1>
            <select name="select" onchange="val()">
                <option value="3">3x3</option>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
            </select>
            <h3>Select your game mode</h3>
            <div class="mode">
                        <input onchange="handleChange(this);" id="freePlay" type="radio" name="gameMode" value="freePlay" >
                        <label class="modeselection" for="freePlay">Free Play</label><br>
                        <input onchange="handleChange(this);" id="timer" type="radio" name="gameMode" value="timer">
                        <label class="modeselection" for="timer">Against the clock</label><br>   
            </div>
            <span class="error"></span>
        <div>

        <button id="startButton">Start Game</button>`
    );
    const table = document.querySelector("select")
    size = table.options[table.selectedIndex].value;
    
    const startButton = document.getElementById("startButton")
    startButton.addEventListener("click", isChecked);   
    
    }   
    //Second Screen
    const buildGameScreen = ()=> {

        buildDom(
        `
        <div id="game-board">
            <div id="canvascontainer">
                <canvas id="canvas"></canvas>
                <div id="rest">
                    <div id="scoreContainer">
                        <div class="boxscore">
                            <div>High Score</div>
                            <div id="highscore"></div>
                        </div>
                        <div class="boxscore">
                            <div>Score</div>
                            <div id="score"></div>
                        </div>
                    </div>
                    <div>
                        <div>Time left: <span id="time"></span></div>
                        <div class="gameOver">
                            <div class="hidden">
                                <h2>Game Over!!</h2>
                                <button id="game">TRY AGAIN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
        
        </div>  
        
        
        `)
            
        const mode = selectedValue
        const game = new Game(size, mode)
        game.start();
        
        let tryagain = document.querySelector("#game").addEventListener("click", game.tryAgain)    

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