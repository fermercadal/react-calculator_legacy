import React, { Component } from 'react';
import './App.css';
// up to 1:09:12

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPressed: undefined,
      currentNumber: '0',
      previousNumber: undefined,
      operation: undefined
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    const currentNumber = this.state.currentNumber;
    const previousNumber = this.state.previousNumber;
    const operation = this.state.operation
    const value = e.target.innerText;
    
    
    if(!Number.isNaN(Number(value))) {
      if (currentNumber === '0') {
        this.setState({
          currentNumber : value
        });
      } else {
        this.setState({
          currentNumber : currentNumber + value
        });
      }

      return
    }

    switch(value) {
      case('AC') : {
        this.setState({
          currentNumber: '0',
          previousNumber: undefined,
          operation: undefined
        });
        break
      }
      case('.') : {
        if(!currentNumber.includes('.')) {
          this.setState({
            currentNumber: currentNumber + value
          });
        }
      }
      default: {
        if(!operation) {
          this.setState({
            operation: value,
            previousNumber: currentNumber,
            currentNumber: '0'
          });
        } else {
          const evaluated = eval(`${previousNumber} ${operation}  ${currentNumber}`)
          this.setState({
            operation: value,
            previousNumber: evaluated,
            currentNumber: value === '=' ? evaluated : '0'
          });

          
        }
      }
    }

    this.setState({
      lastPressed: value
    });
  }

  render() {
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    const operations = ['/', '*', '-', '+', '='];
    const currentNumber = this.state.currentNumber;

    return (
      <main id="calculator" className="calculator">
       
        <div className="display">
          {currentNumber}
        </div>

        <button className="ac" onClick={this.handleClick}>AC</button>

        {numbers.map(number => (
          <button key={number} onClick={this.handleClick}>
            {number}
          </button>
        ))}

        <button className="dot" onClick={this.handleClick}>.</button>

        {operations.map(operation => (
          <button key={operation} onClick={this.handleClick}>
            {operation}
          </button>
        ))}
   
      </main>
    );
  }

}

export default App;
