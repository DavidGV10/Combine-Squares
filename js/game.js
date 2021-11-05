"use strict";
class Game {
    constructor(size, mode){
        this.canvas = null;
        this.ctx = null;
        this.score = 0; 
        this.direction = "null";
        this.mode = mode
        this.size = size;
        this.high = 0
        this.endthisgame = false
    }
    start = (currentHigh)=>{ 
        //check in case of settings being changed after a game
        const divOver = document.querySelector("#divOver")
        const divCanvas = document.querySelector("#canvas")
        divOver.classList.remove("visible")
        divOver.classList.add("hidden")
        divCanvas.classList.remove("opacity")
        // ---
        this.printHigh()
        if(currentHigh > this.high){
            this.high = currentHigh
        } 
        const timeOnScreen = document.querySelector(".hidden2") 
        if(this.mode === "timer"){
            timeOnScreen.classList.add("visible2")} 
        else if(this.mode !== "timer"){
            timeOnScreen.classList.remove("visible2")
        }  
        if(this.mode === "timer"){
            this.countdown()
            setTimeout(()=>{ 
                //Stop addEventListener for the keys
                this.stop()
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")

             }, 61000)
        }
        let tableSize = Number(this.size)
        this.arr = [...Array(tableSize)].map((e) => Array(tableSize).fill(0))
        
        this.newCell()
        this.newCell()
        this.drawTable(this.arr, tableSize)
        //bind(this) 
        document.body.addEventListener("keydown", this.handleKeyDown);
    }
    stop= ()=>{
        document.body.removeEventListener("keydown", this.handleKeyDown);    
    }

    handleKeyDown = (event)=> {              

        if (event.code === "ArrowLeft") {
            this.direction = "left"
            this.addPairs(this.arr)
            if(this.gameOver(this.arr) !== false){
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
                const time = document.querySelector(".hidden2")
                time.classList.remove("visible2")
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")
            }
        }
        else if(event.code === "ArrowRight"){
            this.direction = "right"
            this.addPairs(this.arr)
            if(this.gameOver(this.arr) !== false){
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
                const time = document.querySelector(".hidden2")
                time.classList.remove("visible2")
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")

            }
        }
        else if(event.code === "ArrowUp"){
            this.direction = "up"
            this.addPairs(this.arr)
            if(this.gameOver(this.arr) !== false){
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
                const time = document.querySelector(".hidden2")
                time.classList.remove("visible2")
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")
            }
        }else if(event.code === "ArrowDown"){
            this.direction = "down"
            this.addPairs(this.arr)
            if(this.gameOver(this.arr) !== false){
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
                const time = document.querySelector(".hidden2")
                time.classList.remove("visible2")
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")
            }
        }
      };
    timeleft = (sec)=> {
        const printTime = document.querySelector("#time")
        printTime.textContent = `${sec} seconds`
    }

    countdown = () => {
        let i = 60
        const countdownInterval = setInterval(()=>{
            this.timeleft(i)
            i--
            if(i < 0 || this.gameOver(this.arr) !== false){
                clearInterval(countdownInterval)   
            }   
        }, 1000);
        }

    gameOver=(arr)=> {

        let gameover = true
        console.log(this.arr)
        this.arr.map((arr)=>{
            arr.map((a, index)=>{
                if(a === arr[index+1]){
                   return gameover = false
                }
            })
        })   
        let verticalArr = []
        for(let i = 0; i<this.arr.length ; i++){
            verticalArr.push([])
        }
        let newarr = arr.slice()
        newarr.map((a)=>{
            a.map((b, index)=>{
                verticalArr[index].push(b)
            })
        })
        verticalArr = verticalArr.map((arr)=>{
            arr.map((a, index)=>{
                if(a === arr[index+1]){
                    gameover = false
                }
            })
        }) 
        let countBlank = 0
        for(let elem of this.arr){
            elem.map((a)=> {
                if (a === 0){ countBlank++}
            })
        }
        if(countBlank > 0){
            gameover = false
        }
        return gameover   
    }
    getHigh = () => {
        if(this.score > this.high ){ 
            this.high = this.score
        }
        else{this.high = this.high}
        return this.high
    }


    tryAgain = () => {
        this.getHigh()
        this.arr = null
        this.score = 0
        const divOver = document.querySelector(".visible")
        const divCanvas = document.querySelector("#canvas")
        divOver.classList.remove("visible")
        divCanvas.classList.remove("opacity")
        this.start(this.newHigh)
    }
    changeSettings = () => {
        this.getHigh()
        this.arr = null
        this.score = 0
        splash()

        
    }
    drawTable =(table, tableSize) =>{
        let size = Number(tableSize * 100)
        this.canvas = document.querySelector("canvas");
        this.canvas.setAttribute(`width`, `${size}`)
        this.canvas.setAttribute(`height`, `${size}`)
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "30px Arial";
        let line = 100
        let y = 50  
        let x;
        
        for(let elem of table){ 
            x = 50
                elem.map((a)=>{
                    a = String(a)
                    if(a==="0"){
                        this.ctx.fillStyle = "GhostWhite";
                        this.ctx.fillRect(x-49, y-49, 100, 100)
                        this.ctx.fillText(" ", x, y)
                        this.ctx.lineWidth = 1;
                        this.ctx.strokeStyle = 'grey'
                        this.ctx.strokeRect(x-49, y-49, 100, 100)
                    }
                    else{
                        let colors = {
                            2: "PapayaWhip",
                            4: "Wheat",
                            8: "LightSalmon",
                            16: "darkorange",
                            32: "IndianRed",

                            64: "LightCoral",
                            128: "Gold",
                            256: "DarkOrange",
                            512: "OrangeRed",
                            1024: "FireBrick",

                            2048: "Maroon",
                            4096: "Gold",
                            8192: "DarkOrange",
                            16384: "OrangeRed",
                            32768: "FireBrick",

                            65536: "Maroon",
                            131072: "Gold",
                            262144: "DarkOrange",
                            524288: "OrangeRed",
                            1048576: "FireBrick"
                        }
                        Number(a)>1024 ? this.ctx.font = '20px Arial' : this.ctx.font = '25px Arial'

                        let keys = Object.keys(colors)
                        if(keys.includes(a)){
                            this.ctx.fillStyle = colors[a];
                            this.ctx.fillRect(x-49, y-49, 100, 100)
                            Number(a)>4 ? this.ctx.fillStyle = 'white' : this.ctx.fillStyle = 'black'
                            if(a.length <= 2){
                                this.ctx.fillText(a, x-10, y)
                            }else if(a.length === 3){    
                                this.ctx.fillText(a, x-20, y)
                            }else if(a.length === 4){    
                                this.ctx.fillText(a, x-30, y)
                            }else if(a.length === 5){    
                                this.ctx.fillText(a, x-40, y)
                            }else if(a.length === 6){    
                                this.ctx.fillText(a, x-50, y)
                            }else if(a.length === 7){    
                                this.ctx.fillText(a, x-60, y)
                            }else if(a.length === 8){    
                                this.ctx.fillText(a, x-70, y)
                            }else{
                                this.ctx.fillText(a, x-60, y)
                            }  
                            
                            //Create border of cells
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = 'grey'
                            this.ctx.strokeRect(x-49, y-49, 100, 100)
                            
                        }
                    }
                    x+= 100
                })
            line += 100
            y+= 100;
        }
        this.printScore()
        if(this.score > this.high){
            this.high = this.score
            this.printHigh()
        }
    }
    printScore = () => {
        const scoreDiv = document.querySelector("#score")
        scoreDiv.textContent = this.score
    }
    printHigh = () => {
        let highdiv = document.querySelector("#highscore")
        highdiv.textContent = this.high
    }
    getRandom = ()=>{
        return Math.floor(Math.random() * this.arr.length)
    }
   
    newCell = ()=> {
        //Check if the table is already full.
        let countBlank = 0
        for(let elem of this.arr){      
            elem.map((a)=> {
                if (a === 0){ countBlank++}
            })
        }
        //If not full, add new cell
        if(countBlank !== 0){
            let row = this.getRandom()
            let index = this.getRandom()
            if(this.arr[row][index] === 0){ 
                this.arr[row][index] = 2
            }else{
                this.newCell()
            }

        }
    }
    
    addPairs = (arr)=>{
        
        
        if(this.direction === "up" || this.direction === "down"){
            let verticalArr = arr.slice()
            this.arr = []
            for(let i=0; i< verticalArr.length; i++){
                i
                this.arr.push([])
            }
            verticalArr.map((a)=>{
                a.map((b, index)=>{
                    this.arr[index].push(b)
                })
            })
        } 
        if(this.direction === "right" || this.direction === "down"){
            for(let elem of this.arr){
                elem = elem.reverse()
            }
        }
        if(this.arr){this.arr = this.arr.map((a)=> a.filter((a)=>a !== 0))}
                    
        for(let elem of this.arr){
            elem.map((a, index)=>{ 
            let next = index+1
            if(a === elem[next]){
                elem[index] = a + elem[next]
                this.score = this.score + a + elem[next]
                elem[next]= 0
                }  
            })
            if(elem.length < this.arr.length){
                let spaceLeft = this.arr.length - elem.length
                spaceLeft
                for(let i = 0; i < spaceLeft ; i++){
                    elem.push(0)
                } 
            }
            elem.reverse()
        }
        this.moveX(this.arr)
    }
    moveX = (arr) => {
        
        let arr2 = arr.slice()
        
        this.arr = []
        for(let i=0; i< arr2.length; i++){
            this.arr.push([])
        }
        for(let elem of arr2){
            let index = arr2.indexOf(elem)
            elem.map((a)=> {
                if(this.direction === "left" && a !== 0){
                     this.arr[index].unshift(a)
                }else if(this.direction === "left" && a === 0){
                    this.arr[index].push(a)
                }else if(this.direction === "right" && a !== 0){
                    this.arr[index].push(a)
                }else if(this.direction === "right" && a === 0){
                    this.arr[index].unshift(a)
                }else if(this.direction === "up" && a !== 0){
                    this.arr[index].unshift(a)
                }else if(this.direction === "up" && a === 0){
                   this.arr[index].push(a)
                }else if(this.direction === "down" && a !== 0){
                   this.arr[index].push(a)
                }else if(this.direction === "down" && a === 0){
                   this.arr[index].unshift(a)
               }
            })
        }
        
        if(this.direction === "up" || this.direction === "down"){
            let horizontalArr = this.arr.slice()
            this.arr = []
            for(let i=0; i< horizontalArr.length; i++){
                this.arr.push([])
            }
            
            horizontalArr.map((a)=>{
                a.map((b, index)=>{
                    this.arr[index].push(b)
                    
                })
            })
           
        }
        
        this.newCell()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTable(this.arr, size)
        
        
        
        
    } 
}

