let birds = [];
let pipes = [];
let previousGenerationBirds = [];
const TOTAL = 100;
function setup(){
    createCanvas(640,480);
    for(let i=0;i<TOTAL;i++){
        birds[i] = new Bird();
    }
    pipes.push(new Pipe());
}

function draw(){
    background(0);

    if(birds.length === 0){
        //the population is over
        console.log("End of generation!");
        nextGeneration(previousGenerationBirds);
    }
    
    for(let  i=pipes.length - 1 ;i >= 0;i--){
        pipes[i].show();
        pipes[i].update();
        
        for(let j=0;j<birds.length;j++){
            if(pipes[i].hits(birds[j])){
                previousGenerationBirds.push(birds[j]);
                birds.splice(j,1);
            }
        }     
        if(pipes[i].offscreen()){
            pipes.splice(i,1);
        }
    }
    for(let i=0;i<birds.length;i++){
        birds[i].think(pipes);
        birds[i].show();
        birds[i].update();
    }
    

    if(frameCount % 60 == 0){
        pipes.push(new Pipe());
    }
}

// function keyPressed(){
//     if(key == ' '){
//         bird.up();
//     }
// }