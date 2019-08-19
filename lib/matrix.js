class Matrix{
  constructor(rows,cols){
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(rows);
    for (var i = 0; i < this.rows; i++) {
      this.data[i] = new Array(cols);
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    } 
  }

  // This fills the data with random values (gaussian distribution)
  randomize() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }
  
  // Take the data and make it a 1 dimensional array
  toArray() {
    // Add all the values to the array
    var arr = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }
  
  
  // This transposes a data
  // rows X cols --> cols X rows
  static transpose(a) {
    var result = new Matrix(a.cols, a.rows);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[j][i];
      }
    }
    return result;
  }
  
  // This makes a copy of the data
  static copy(a) {
    var result = new Matrix(a.rows, a.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j];
      }
    }
    return result;
  }

  add(other){

    if(other instanceof Matrix){
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += other.data[i][j];
        }
      }
    }
    else{
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += other;
        }
      }
    }
    
  }

  
  // This multiplies another data or a single value
  // This is different than the dot() function!


    // Multiplies two matrices together
  static multiply(a, b) {
    // Won't work if columns of A don't equal columns of B
    if (a.cols != b.rows) {
      console.log("Incompatible data sizes!");
      return;
    }
    // Make a new data
    var result = new Matrix(a.rows, b.cols);
    for (var i = 0; i < a.rows; i++) {
      for (var j = 0; j < b.cols; j++) {
        // Sum all the rows of A times columns of B
        var sum = 0;
        for (var k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        // New value
        result.data[i][j] = sum;
      }
    }
    return result;
  }
    
  
  
  multiply(other) {
    // Are we trying to multiply a Matrix?
    if (other instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= other.data[i][j];
        }
      }
      // Or just a single scalar value?
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= other;
        }
      }
    }
  }
  
  
  
  
  // Subtracts one data from another
  static subtract(a, b) {
    var result = new Matrix(a.rows, a.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }
  
  

  
  // Turn a 1 dimensional array into a data
  static fromArray(array) {
    var m = new Matrix(array.length, 1);
    for (var i = 0; i < array.length; i++) {
      m.data[i][0] = array[i];
    }
    return m;
  }


  map(func){
    for(var i = 0;i<this.rows;i++){
      for(var j=0;j<this.cols;j++){
        var value = this.data[i][j];
        this.data[i][j] = func(value);
      }
    }
  }

  print(){
    console.table(this.data);
  }

}
