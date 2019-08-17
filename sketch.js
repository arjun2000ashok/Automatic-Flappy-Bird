let bird;
let pipes = [];
function setup(){
    createCanvas(640,480);
    bird = new Bird();
    pipes.push(new Pipe());
}

function draw(){
    background(0);
    bird.show();
    bird.update();
    for(let  i=pipes.length - 1 ;i >= 0;i--){
        pipes[i].show();
        pipes[i].update();
        
        if(pipes[i].hits(bird)){
            console.log("HIT!");
        }
        
        if(pipes[i].offscreen()){
            pipes.splice(i,1);
        }
    }

    if(frameCount % 60 == 0){
        pipes.push(new Pipe());
    }
}

function keyPressed(){
    if(key == ' '){
        bird.up();
    }
}