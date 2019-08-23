let birds = [];
let pipes = [];
let previousGenerationBirds = [];
const TOTAL = 500;
let counter = 0;
let slider;
function setup(){
    createCanvas(640,480);
    for(let i=0;i<TOTAL;i++){
        birds[i] = new Bird();
    }
    slider = createSlider(1,500,1);
}

function draw(){

    for(let n = 0; n < slider.value(); n++){
        if(counter % 100 == 0){
            pipes.push(new Pipe());
        }
        counter++;
        
        for(let  i=pipes.length - 1 ;i >= 0;i--){
            //pipes[i].show();
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
            //birds[i].show();
            birds[i].update();
        }
    }


    //drawing logic:

    background(0);
    for(let i=0;i<birds.length;i++){
        birds[i].show();
        if(birds[i].offscreen()){
            previousGenerationBirds.push(birds[i]);
            birds.splice(i,1);
        }
    }

    for(let pipe of pipes){
        pipe.show();
    }
    

    //Generation end logic:
    
    if(birds.length === 0){
        console.log("End of generation!");
        nextGeneration(previousGenerationBirds);
        counter = 0;
        pipes = [];
    }


}

function keyPressed(){
    if(key == 's'){
        saveJSON(birds[0].brain,'bestBird.json');
    }
    if(key == 'l'){
        var json = loadJSON('bestBird.json');
        console.log(NeuralNetwork.deserialize(json));
    }
}