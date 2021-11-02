"use strict";
class Game {
    constructor(){
        this.canvas = null;
        this.ctx = null;
        this.score = 0;
        this.arr = null
        this.direction = "null"
    }
    start(size){
        let tableSize = Number(size)
        this.arr = [...Array(tableSize)].map((e) => Array(tableSize).fill(0))
        
        this.newCell()
        this.newCell()
        console.log(this.arr)
        this.drawTable(this.arr, tableSize)
        this.handleKeyDown = (event) => {
            
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
        document.body.addEventListener("keydown", this.handleKeyDown);    
    }
    gameOver = (arr) => {
        arr
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
        let size = tableSize *100
        this.canvas = document.querySelector("canvas");
        this.canvas.setAttribute(`width`, `${size}`)
        this.canvas.setAttribute(`height`, `${size}`)
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "30px Arial";
        let line = 100
        let y = 50  
        let x;
        table
        
        
        
        for(let elem of table){
            this.ctx.beginPath();
            this.ctx.moveTo(line, 0);
            this.ctx.lineTo(line, 600);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, line);
            this.ctx.lineTo(600, line);
            this.ctx.stroke();
            x = 40
            elem.map((a)=>{
                if(a===0){this.ctx.fillText(" ", x, y)}
                else{this.ctx.fillText(a, x, y)}
                x+= 100
            })
            line += 100
            y+= 100;
        }
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
                this.score = a + elem[next]
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
    printScore = ()=>{

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
        console.log(this.arr)
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
//game.start(game.arr)





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





