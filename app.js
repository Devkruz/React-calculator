
// Array of operators
const operators = [
    {
        name: "add",
        symbol: "+"
    },
    {
        name: "subtract",
        symbol: "-"
    },
    {
        name: "divide",
        symbol: "/"
    },
    {
        name: "multiply",
        symbol: "*"
    }
];
// Array of methods
const methods = [
    {
        name: "clear",
        symbol: "C"
    },
    {
        name: "delete",
        symbol: "Del"
    },
    {
        name: "decimal",
        symbol: "."
    },
    {
        name: "equals",
        symbol: "="
    }
];
// Array of numbers
const numbers = [
    {
        name: "zero",
        symbol: "0"
    },
    {
        name: "one",
        symbol: "1"
    },
    {
        name: "two",
        symbol: "2"
    },
    {
        name: "three",
        symbol: "3"
    },
    {
        name: "four",
        symbol: "4"
    },
    {
        name: "five",
        symbol: "5"
    },
    {
        name: "six",
        symbol: "6"
    },
    {
        name: "seven",
        symbol: "7"
    },
    {
        name: "eight",
        symbol: "8"
    },
    {
        name: "nine",
        symbol: "9"
    }      
];
// RegEx to check for more than three operator in a row
const operatorRegEx = /[-+/*]{3,}/g;


// Root component 
 class App extends React.Component {
      constructor() {
           super()
           this.state = {
               calculation: "0",
               result: ""
           };
        
           this.methodHandler = this.methodHandler.bind(this); 
           this.numberHandler = this.numberHandler.bind(this);
           this.operatorHandler = this.operatorHandler.bind(this);

      }
       // Method to handle the calculation operators
      methodHandler(symbol) {
          // Arr of operators to check the incoming input
        const operatorsArr = ["+", "-", "/", "*"]
            // Check if the symbol is "Del"
            if ( symbol == "Del") { 
                // copy the calcultion state to perfome mutable functions
                const copy = this.state.calculation.slice(0).split('');  
                // Delete the last digit            
                const clear =  copy.splice(-1,1).join("");
                // Set the state when the last digit is deleted
                this.setState({
                    calculation: copy.join("")
                });
                // Once the last digit is deleted, check if the new last digit is not an operator 
                // Evaluate and set it to the result state
                if (!operatorsArr.includes(copy.join("").slice(-1))) {
                    console.log("active")
                    this.setState({
                       result: eval(copy.join(""))
                    })
                };
                // Check if  the calculation state is empty
                // Set the calculation state back to it initiall state "0"
                if (this.state.calculation.length <= 1) {
                    this.setState({
                        calculation: "0"
                    });
                }
            }
            // Check if the symbol is "Clear"
            else if (symbol == "C") {
                // Set the calculation state to "0"
                // Set the result state to ""
                   this.setState({
                        calculation: "0",
                        result: ""
                   })
            }
            // Check if the symbol is "="
            else if (symbol == "=") {
                   // Set the calculation state to result state
                    this.setState({
                        calculation: this.state.result.toString()
                      });
            }
            // Check if the symbol is "."
            else if (symbol = ".") {
                // Check if the last digit is a decimal
                    if(this.state.calculation.slice(-1) == ".") {
                       return;
                    } 
                // If not
                    else {
                        this.setState({
                            calculation: this.state.calculation + "."
                        });
                    }
                    
                
            }
         
            
    
      };
      //Method to handle the calculation digits
      numberHandler(symbol) { 
               // Check if the calculation state length is less than 15
                if(this.state.calculation.length <= 15) {
                    // Check if the calculation state is "0"
                    // Check if the symbol is "0"
                    if (this.state.calculation == "0" &&  symbol == "0") {
                        // Set the calculatio stae to "0"
                         this.setState({
                              calculation: "0"
                         })
                    };
                    // Check if the calcultion stae is "0"
                    // Check if the symbol is not "0"
                    if (this.state.calculation == "0" && !symbol == "0") {
                        // Set the calculation state to the incoming symbol
                        this.setState({ 
                            calculation: symbol   
                        });
                    }
                    else {
                        // Match all consecutive operator that are more than three
                        // Put them into an array
                        const op = [...this.state.calculation.matchAll(operatorRegEx)];
                        // Concat the calculation state and symbol
                        // Put it into a variable
                        let reps = this.state.calculation + symbol;
                        // Check if operator array is filled 
                        if(op.length > 0) {
                            // Loop through the operator array
                            op.forEach(opReg => {
                                // Loop through the operator string
                                opReg.forEach(reg => {
                                // Put the last operator into a variable
                                const  rep = reg.slice(-1);
                                // Replace the string of operator with the last operator
                                // Put it in the declared variable
                                reps = reps.replace(opReg,rep);
                                });
                            });
                            // Set the calculation state 
                            // Evaluate the mutated calcultation and set it to the result state
                            this.setState({ 
                                calculation:this.state.calculation + symbol,
                                result: eval(reps)
                            });
                            console.log(typeof(reps))
                            console.log(reps)
                            console.log("operation filled")

                        }
                        // If the operator array is not filled
                        else {
                            // Set the calculation state and the result state
                            this.setState({ 
                                calculation:this.state.calculation + symbol,
                                result: eval(this.state.calculation + symbol)
                            });
                            console.log("operation not filled")
                        }
                    };
                };
                // Check if the calcultion state lenght is greater than 15 
                if(this.state.calculation.length > 15) {
                    // Set the result state to "Max. Digit"
                    this.setState({ 
                        result: "Max. Digit"
                    });

                 }
      };
      //Method to handle the calculation functions 
      operatorHandler(symbol) {
                // Operator Array
                const operatorsArr = ["+", "-", "/", "*"]
                const validOperatorsArr = ["-+", "+-", "--", "++", "/-", "/+", "*-", "*+"] 
              
                        // Check if the calculation state is "0"
                        if(this.state.calculation == "0") {
                            // Check if the symbol is "+" or "-"
                            if(symbol == "+" || symbol == "-")
                            // Set the calculation state to the symbol
                            this.setState({ 
                                calculation:symbol
                            });
                        }
                        // If the calculation state is not "0"
                        else {
                            // Check if the last digit in the calculation is operator
                            if(operatorsArr.includes(this.state.calculation.slice(-1))) {
                                // Check if the symbol is "/" or "*"
                                if(symbol == "/" || symbol == "*") {
                                    // Do nothing
                                    return;
                                }
                                // If not the symbol is  "/" or "*"
                                else {
                                    // Check if the last digit in the calculation state is equal to the symbol
                                    if(this.state.calculation.slice(-1) == symbol) {
                                        // Do nothing
                                        return;
                                    }
                                    else {
                                        // If not
                                        this.setState({ 
                                            // Add symbol to what is in the calculation state
                                            calculation: this.state.calculation + symbol
                                        });
                                    }
                                    };
                             }
                             // If not the last digit in calculation state is an operator
                             else {
                                this.setState({ 
                                    // Add symbol to what in the calculation state
                                    calculation: this.state.calculation + symbol
                                });
                             }             
                        }
                         
 
      };


  render() {
        // Declare a number array
        const number = [];
        // Loops through numbers array 
        numbers.forEach((num,index)=> {
            // Push to number array with this data
            number.push(<KeyPad calcHandler={this.numberHandler} symbol={num.symbol} key={num.symbol} class="number" id={num.name} />)
        });
        // Declare an operator array
        const operator = [];
        // Loops through operators array 
        operators.forEach((opera, index)=> {
            // Push to operator array with this data
            operator.push(<KeyPad calcHandler={this.operatorHandler} symbol={opera.symbol} key={index} class="operators" id={opera.name} />)
        });
        // Declare an method array
        const method = [];
         // Loops through method array 
        methods.forEach((meth, index)=> {
             // Push to method array with this data
            method.push(<KeyPad calcHandler={this.methodHandler} symbol={meth.symbol} key={index} class="operators" id={meth.name} />)
        })
       
        

    
    return( 
        <div className="app-wrapper">
            <div className="app-container">
                 <div className="display-wrapper">
                    <Display result={this.state.result} calculation={this.state.calculation}/>
                 </div>
                 <div className="key-wrapper">
                     <div className="key-container">
                         {number}
                         {operator}
                         {method}
                     </div>
                  
                 </div>
            </div>
         <p className="dev-link">Developed by <a href="https://codepen.io/Devkruz">DevKruz</a></p>  
        </div>
    );
  }
}

// Display component
class Display extends React.Component {
         render() {
               return (

                <div className="display-container">
                    <div className="result">
                       {this.props.result}
                    </div>
                    <div className="calculation" id="display">
                        {this.props.calculation}
                    </div>
                </div>
               )
         }
}

// Key pad component
class KeyPad extends React.Component {
                   constructor() {
                        super();
                        this.state = {
                            active: false
                        }

                        this.clickHandler = this.clickHandler.bind(this);
                        this.activeControl = this.activeControl.bind(this);
                   }

              
                   clickHandler() { 
                    this.props.calcHandler(this.props.symbol);
                    this.activeControl();
                    setTimeout(()=>{
                        this.activeControl()
                    }, 100)
                  };
            
                  activeControl() {
                    this.setState({
                         active: !this.state.active
                    })
                   };

            render() {
                  const activeStyle = {
                    boxShadow: "10px 10px 81px -20px rgba(0,0,0,0.45) inset",
                    WebkitBoxShadow: "10px 10px 81px -20px rgba(0,0,0,0.45) inset",
                    MozBoxShadow: "10px 10px 81px -20px rgba(0,0,0,0.45) inset",
                  };

                  return (
    
                        <button key={this.props.key} 
                            id={this.props.id} 
                            style={this.state.active ? activeStyle : {}}
                            onClick={this.clickHandler}
                            className={this.props.class}>{this.props.symbol}
                        </button>  
                    
                  )
            }
}

ReactDOM.render(<App/>, document.getElementById("root"))