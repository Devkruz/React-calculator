
// Root component 
 class App extends React.Component {
      constructor() {
           super()
           this.state = {
               calculation: "",
               result: "",
               keyInput: ""
           };

    
          
      }


  render() {
    return( 
        <div className="app-wrapper">
            <div className="app-container">
                 <div className="display-wrapper">
                    <Display/>
                 </div>
                 <div className="key-wrapper">
                   <KeyPad clickHandler={this.clickHandler} active={this.state.active}/>
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

                <div className="display" id="display">
                    <div className="result">
                        446
                    </div>
                    <div className="calculation">
                        {eval("2+2/2*4")}
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
                    this.activeControl();
                    setTimeout(()=>{
                        this.activeControl()
                    }, 200)
                  };
            
                  activeControl() {
                    this.setState({
                         active: !this.state.active
                    })
                   };

            render() {
                  const activeStyle = {
                       boxShadow: "1px 2px 3px black",
                       color: "red"
                  };


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
                          symbol: "x"
                      }
                  ];
            

                  const operator = []
                   operators.forEach((symbol,index)=> {
                         operator.push(<button key={index} 
                            onClick={this.clickHandler}
                            style={this.state.active ? activeStyle : {}}
                            className="operators" id={symbol.name}>{symbol.symbol}</button>)
                   });


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
                  const method = []
                  methods.forEach((meth, index)=> {
                       method.push(<button key={index} id={meth.name}
                         onClick={this.clickHandler}
                         style={this.state.active ? activeStyle : {}}
                         className="method">{meth.symbol}</button>)
                  });


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
                  const number = []
                  numbers.forEach(num=> {
                    number.push(<button key={num.symbol} 
                        id={num.name} 
                        style={this.state.active ? activeStyle : {}}
                        onClick={this.clickHandler}
                        className="number">{num.symbol}</button>)
                  });
                       
                  

                  return (
                       <div className="key-container">
                           {number}
                           {operator}
                           {method}
                       </div>
                  )
            }
}

ReactDOM.render(<App/>, document.getElementById("root"))