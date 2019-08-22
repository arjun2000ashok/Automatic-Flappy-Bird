function nextGeneration(prevGen){
    calculateFitness(prevGen);

    for(let i=0;i<TOTAL;i++){
        birds[i] = pickOneBird(prevGen);
    }
}


function pickOneBird(prevGen) {
    var index = 0;
    var r = random(1);
    while (r > 0) {
      r = r - prevGen[index].fitness;
      index++;
    }
    index--;
    let randomBird = prevGen[index];
    return Bird.copy(randomBird);
  }


function calculateFitness(gen){
    let sum = 0;

    for(let bird of gen){
        sum += bird.score;
    }

    for(let bird of gen){
        bird.fitness = bird.score / sum;
    }
}