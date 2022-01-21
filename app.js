
//Array of operators
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
//Array of methods
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
//Array of numbers
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
const operatorRegEx = /[-+/*]{3,}/g;


// Root component 
 class App extends React.Component {
      constructor() {
           super()
           this.state = {
               calculation: "0",
               result: "",
               keyInput: ""
           };
           
           this.methodHandler = this.methodHandler.bind(this); 
           this.numberHandler = this.numberHandler.bind(this);
           this.operatorHandler = this.operatorHandler.bind(this);

      }
       //Method to handle the calculation operators
      methodHandler(symbol) {
        const operatorsArr = ["+", "-", "/", "*"]
            if ( symbol == "Del") {
                const copy = this.state.calculation.slice(0).split('');              
                const clear =  copy.splice(-1,1).join("");
            
                this.setState({
                    calculation: copy.join("")
                });

                if (!operatorsArr.includes(copy.join("").slice(-1))) {
                    console.log("active")
                    this.setState({
                       result: eval(copy.join(""))
                    })
                };
                if (this.state.calculation.length <= 1) {
                    this.setState({
                        calculation: "0"
                    });
                }
            }
            else if (symbol == "C") {
                   this.setState({
                        calculation: "0",
                        result: ""
                   })
            }
            else if (symbol == "=") {
                const op = [...this.state.calculation.matchAll(operatorRegEx)];
                let reps = this.state.calculation;
                if(op.length > 0) {
                    op.forEach(opReg => {
                        opReg.forEach(reg => {
                        const  rep = reg.slice(-1);
                        reps = reps.replace(opReg,rep);
                        });
                    });
                    
                         console.log(eval(reps))
                        
                }
                else {
                    this.setState({
                        calculation: this.state.result.toString()
                      });
                }    
            }
            else if (symbol = ".") {
                if (this.state.calculation.length <= 0) {
                      this.setState({
                           calculation: "0."
                      });
                }
                else {
                    if(this.state.calculation.slice(-1) == ".") {
                       return;
                    } 
                    this.setState({
                        calculation: this.state.calculation + "."
                   }) 
                }
            }
         
            
    
      };
      //Method to handle the calculation digits
      numberHandler(symbol) { 
             
                if(this.state.calculation.length <= 15) {
                    if (this.state.calculation == "0" &&  symbol == "0") {
                         this.setState({
                              calculation: "0"
                         })
                    };
                    if (this.state.calculation == "0" && !symbol == "0") {
                        this.setState({ 
                            calculation: symbol   
                        });
                    }
                    else {
                        this.setState({ 
                            calculation:this.state.calculation + symbol,
                            result: eval(this.state.calculation + symbol)
                        });
                    };
                };
                if(this.state.calculation.length > 15) {
                    this.setState({ 
                        result: "Max. Digit"
                    });

                 }
      };
      //Method to handle the calculation functions
      operatorHandler(symbol) {
                const operatorsArr = ["+", "-", "/", "*"]
                const validOperatorsArr = ["-+", "+-", "--", "++", "/-", "/+", "*-", "*+"] 
              
                    
                        if(this.state.calculation == "0") {
                            if(symbol == "+" || symbol == "-")
                            this.setState({ 
                                calculation:symbol
                            });
                        }
                        else {
                            if(operatorsArr.includes(this.state.calculation.slice(-1))) {
                                if(symbol == "/" || symbol == "*") {
                                    return;
                                }
                                else {
                                    this.setState({ 
                                        calculation: this.state.calculation + symbol
                                    });
                                    }
                               


    



                                // else {
                                    // if(validOperatorsArr.includes(this.state.calculation.slice(-2))) {
                                    //     return;
                                    // }
                                    // else {
                                    // this.setState({ 
                                    //     calculation: this.state.calculation + symbol
                                    // });
                                    // }

                                //    const calCopy = this.state.calculation.slice(0,-1).split('').concat(symbol).join('');
                                //    this.setState({
                                //       calculation:calCopy,
                                //    });


                                // };
                             }
                             else {
                                this.setState({ 
                                    calculation: this.state.calculation + symbol
                                });
                             }             
                        }
                         
 
      };


  render() {
        const number = [];
        numbers.forEach((num,index)=> {
            number.push(<KeyPad calcHandler={this.numberHandler} symbol={num.symbol} key={num.symbol} class="number" id={num.name} />)
        });
        const operator =[];
        operators.forEach((opera, index)=> {
            operator.push(<KeyPad calcHandler={this.operatorHandler} symbol={opera.symbol} key={index} class="operators" id={opera.name} />)
        });
        const method = [];
        methods.forEach((meth, index)=> {
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