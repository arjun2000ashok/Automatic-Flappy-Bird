function nextGeneration(){
    calculateFitness();

    for(let i=0;i<TOTAL;i++){
        birds[i] = pickOneBird();
    }
}

function pickOneBird(){
    let randomBird = random(previousGenerationBirds);
    let bird = new Bird(randomBird.brain);
    bird.brain.mutate(0.1);
    return randomBird;
}


function calculateFitness(){
    let sum = 0;

    for(let bird of previousGenerationBirds){
        sum += bird.score;
    }

    for(let bird of previousGenerationBirds){
        bird.fitness = bird.score / sum;
    }
}