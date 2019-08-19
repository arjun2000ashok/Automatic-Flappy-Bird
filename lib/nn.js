function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork{

    constructor(input_nodes,hidden_nodes,output_nodes){
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.learning_rate = 0.1;

        this.weights_ih = new Matrix(this.hidden_nodes,this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes,this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes,1);
        this.bias_o = new Matrix(this.output_nodes,1);
        this.bias_h.randomize();
        this.bias_o.randomize();
    }

    feedForward(inputArray){
        let inputs = Matrix.fromArray(inputArray);        
        let hidden = Matrix.multiply(this.weights_ih,inputs);
        // console.table(hiddenValues.data);
        hidden.add(this.bias_h);
        // console.table(hidden.data);
        hidden.map(sigmoid);
            

        let outputs = Matrix.multiply(this.weights_ho,hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);
        return outputs.toArray();
    }


    train(inputArray,targetArray){



        let targets = Matrix.fromArray(targetArray);


        
        /*----------------------------FEED FORWARD ALGORITHM--------------------------*/
        let inputs = Matrix.fromArray(inputArray);        
        let hidden = Matrix.multiply(this.weights_ih,inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);
            

        let outputs = Matrix.multiply(this.weights_ho,hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);


        /*----------------------------END OF FEED FORWARD ALGORITHM--------------------------*/


        /*----------------------------BACK PROPAGATION ALGORITHM--------------------------*/

        //REFER BOOK PAGE 83
        //The error of the first hidden node is sum o w11 * e1 and w12 * e2 (if it has 2 nodes)
        //This is done by transposing the matrix first and then multiplying as the matrix is in the order ij where i = outputNodeNumber and j = hiddenNodeNumber



        //Gradient Descent left

        //Adjust weights_ho based on outputErrors (and the hiddenValues)
        //Adjust weights_ih based on hiddenErrors (and the inputValues)


        /*----------------------------BACK PROPAGATION ALGORITHM : ADJUSTING THE WEIGHTS BETWEEN HIDDEN AND OUTPUT LAYERS--------------------------*/

        
        let outputErrors = Matrix.subtract(targets,outputs);

        let derivativeOfOutputMatrix = Matrix.copy(outputs);
        derivativeOfOutputMatrix.map((x) => {return x * (1 - x)});
        derivativeOfOutputMatrix.multiply(outputErrors); //does element*element multiplication
        derivativeOfOutputMatrix.multiply(this.learning_rate); //does scalar multiplication

        //now perform a row-column multiplication of the derivativeOfOutputMatrix with the TRANSPOSE OF hidden values

        let deltaW_ho = Matrix.multiply(derivativeOfOutputMatrix,Matrix.transpose(hidden));

        this.weights_ho.add(deltaW_ho);

        this.bias_o.add(derivativeOfOutputMatrix); //as the input of the BIAS IS 1 ALWAYS


        /*----------------------------END OF BACK PROPAGATION ALGORITHM : ADJUSTING THE WEIGHTS BETWEEN HIDDEN AND OUTPUT LAYERS--------------------------*/






        /*----------------------------BACK PROPAGATION ALGORITHM : ADJUSTING THE WEIGHTS BETWEEN INPUT AND HIDDEN LAYERS--------------------------*/



        let hiddenErrors = Matrix.multiply(Matrix.transpose(this.weights_ho),outputErrors);


        let derivativeOfHiddenMatrix = Matrix.copy(hidden);
        derivativeOfHiddenMatrix.map((x) => {return x * (1 - x)});
        derivativeOfHiddenMatrix.multiply(hiddenErrors); //does element*element multiplication
        derivativeOfHiddenMatrix.multiply(this.learning_rate); //does scalar multiplication

        //now perform a row-column multiplication of the derivativeOfHiddenMatrix with the TRANSPOSE OF input values

        let deltaW_ih = Matrix.multiply(derivativeOfHiddenMatrix,Matrix.transpose(inputs));

        this.weights_ih.add(deltaW_ih);

        this.bias_h.add(derivativeOfHiddenMatrix); //as the input of the BIAS IS 1 ALWAYS



        /*----------------------------END OF BACK PROPAGATION ALGORITHM : ADJUSTING THE WEIGHTS BETWEEN INPUT AND HIDDEN LAYERS--------------------------*/
    }


}