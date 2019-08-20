function nextGeneration(){
    calculateFitness();

    for(let i=0;i<TOTAL;i++){
        birds[i] = pickOneBird();
    }
}


function pickOneBird() {
    var index = 0;
    var r = random(1);
    while (r > 0) {
      r = r - previousGenerationBirds[index].fitness;
      index++;
    }
    index--;
    let randomBird = previousGenerationBirds[index];
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