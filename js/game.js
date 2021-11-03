"use strict";
class Game {
    constructor(size, mode){
        this.canvas = null;
        this.ctx = null;
        this.score = 0;
        this.arr = null;
        this.direction = "null";
        this.mode = "timer"
        this.size = size
    }
    stop= ()=>{
        document.body.removeEventListener("keydown", this.handleKeyDown);    
    }

    handleKeyDown = (event)=> {
        console.log("end key down ", this)                

        if (event.code === "ArrowLeft") {
            this.direction = "left"
            this.addPairs(this.arr)
            if(this.gameOver(this.arr) !== false){
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
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
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")
            }
        }else if(event.code === "ArrowDown"){
            this.direction = "down"
            this.addPairs(this.arr)
            if(this.gameOver(this.arr) !== false){
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")
            }
        }
      };
      start = ()=>{      
        if(this.mode === "timer"){
            setTimeout(()=>{ 
                this.stop()
                const divOver = document.querySelector(".hidden")
                const divCanvas = document.querySelector("#canvas")
                divOver.classList.add("visible")
                divCanvas.classList.add("opacity")
             }, 3000)
        }
        let tableSize = Number(this.size)
        this.arr = [...Array(tableSize)].map((e) => Array(tableSize).fill(0))
        
        this.newCell()
        this.newCell()
        this.drawTable(this.arr, tableSize)
        //bind(this) 
        document.body.addEventListener("keydown", this.handleKeyDown);
    }
    gameOver=(arr)=> {

        let gameOver = null
        this.arr.map((arr)=>{
            arr.map((a, index)=>{
                if(a === arr[index+1]){
                   return gameOver = false
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
        verticalArr
        verticalArr = verticalArr.map((arr)=>{
            arr.map((a, index)=>{
                if(a === arr[index+1]){
                    gameOver = false
                }
            })
        }) 
        let countBlank = 0
        for(let elem of this.arr){
            
            elem
            elem.map((a)=> {
                if (a === 0){ countBlank++}
            })
        }
        if(countBlank > 0){
            gameOver = false
        }
        gameOver
        return gameOver   
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
            console.log(table)
            //this.ctx.fillStyle = "white";
            //this.ctx.lineWidth = 5;
            //this.ctx.beginPath();
            //this.ctx.moveTo(line, 0);
            //this.ctx.lineTo(line, size);
            //this.ctx.stroke();    
            //this.ctx.beginPath();
            //this.ctx.moveTo(0, line);
            //this.ctx.lineTo(size, line);
            //this.ctx.stroke();
            x = 50
                elem.map((a)=>{
                    a = String(a)
                    if(a==="0"){
                        this.ctx.fillText(" ", x, y)
                    }
                    else{
                        let colors = {
                            2: "GhostWhite",
                            4: "DarkSalmon",
                            8: "Orange",
                            16: "OrangeRed",
                            32: "FireBrick",

                            64: "Maroon",
                            128: "DarkSalmon",
                            256: "Orange",
                            512: "OrangeRed",
                            1024: "FireBrick",

                            2048: "Maroon",
                            4096: "DarkSalmon",
                            8192: "Orange",
                            16384: "OrangeRed",
                            32768: "FireBrick",

                            65536: "Maroon",
                            131072: "DarkSalmon",
                            262144: "Orange",
                            524288: "OrangeRed",
                            1048576: "FireBrick"
                        }
                        let keys = Object.keys(colors)
                        if(keys.includes(a)){
                            this.ctx.fillStyle = colors[a];
                            this.ctx.fillRect(x-49, y-49, 100, 100)
                            this.ctx.fillStyle = 'black'
                            if(a.length === 2){
                                this.ctx.fillText(a, x-20, y)
                            }else if(a.length === 3){    
                                this.ctx.fillText(a, x-30, y)
                            }else{
                                this.ctx.fillText(a, x-10, y)
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
    }
    printScore = () => {
        const scoreDiv = document.querySelector("#score")
        scoreDiv.textContent = this.score
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
        console.log(this.arr)
        if(this.direction === "right" || this.direction === "down"){
            for(let elem of this.arr){
                elem = elem.reverse()
            }
        }
        this.arr = this.arr.map((a)=> a.filter((a)=>a !== 0)) 
                    
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

const game = new Game()
game.drawTable(game.arr)





let arr = new Array(6).fill(0)
arr.fill(new Array(6))
arr
arr.forEach(elem =>{
    elem
    elem.fill(0)
})
let arr3 = arr.slice()
let arr2 = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
]
const getRandom = ()=>{
    return Math.floor(Math.random() * arr.length)
}
arr
arr2


let row = getRandom()
let index = getRandom()


let arr4 = [...Array(6)].map((e) => Array(6).fill(0));
arr4

if(arr4[row][index] === 0){ 
    arr4[row][index] = 2
}
arr4


if(arr3[row][index] === 0){ 
    arr3[row][index] = 2
}

if(arr2[row][index] === 0){ 
    arr2[row][index] = 2
}
arr3
arr2





