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
        error.textContent = "You must select a game mode!"
   }
}

const splash = () => {
    buildDom(     
        `
        <div class="logo">
            <img id="logo" src="/img/logo3.png" alt="Combine Squares">
        </div>
        <div class="select">
            <h3>Select table</h3>
            <select name="select" onchange="val()">
                <option value="3">3x3</option>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
            </select>
            <h3>Select your game mode</h3>
            <div class="mode">
                        <input onchange="handleChange(this);" id="freePlay" type="radio" name="gameMode" value="freePlay" >
                        <label class="modeselection" for="freePlay">Free Play</label>
                        <input onchange="handleChange(this);" id="timer" type="radio" name="gameMode" value="timer">
                        <label class="modeselection" for="timer">Against the clock</label> 
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
        <div class="logo2">
            <img id="logo" src="/img/logoGame.png" alt="Combine Squares">
        </div>
        <div id="game-board">
            <div id="canvascontainer">
                <canvas id="canvas"></canvas>
            </div>
            <div id="rest">
                    <div id="scoreContainer">
                        <div class="boxscore">
                            <div>Best</div>
                            <div id="highscore"></div>
                        </div>
                        <div class="boxscore">
                            <div>Score</div>
                            <div id="score"></div>
                        </div>
                    </div>
                    <div>
                        <div class="hidden2">Time left: <span id="time"></span></div>
                        <div id="over" class="gameOver">
                            <div id="divOver" class="hidden">
                                <h2>Game Over!!</h2>
                                <div class=""buttons>
                                <button id="change">Change Settings</button>
                                <button id="game">Try Again</button>
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
        let change = document.querySelector("#change").addEventListener("click", game.changeSettings)
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