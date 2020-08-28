let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
console.log();
//load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables 

let gap = 75 ;
let constant = pipeNorth.height+gap;

let bx = 10;
let by = 150;

let gravity = 1.5;

let score = 0;

// on key down

document.addEventListener("keydown", moveUp);

function moveUp(){
    by -= 25
}

//pipe coordinates

let pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}


// draw image 

function draw(){
    ctx.drawImage(bg,0,0);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)- 
                pipeNorth.height
            })
        }
        // detect collison 

        if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by + bird.height >= 
            pipe[i].y+constant) || by + bird.height >= cvs.height - fg.height ){
                location.reload();// reload the page
            }
            if(pipe[i].x == 5){
                score++;
            }
    }

    

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bx,by);

    by += gravity;

    ctx.fillStyle = "#000";
    ctx.fillText("Score : "+ score,10,cvs.height-20)

    requestAnimationFrame(draw);
}

draw();

