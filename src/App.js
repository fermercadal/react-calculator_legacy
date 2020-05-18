import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPressed: '',
      currentNumber: '0',
      previousNumber: '',
      operation: '',
      operations: [
        {
          value: '/',
          id: 'divide'
        }, 
        {
          value: '*',
          id: 'multiply'
        }, 
        {
          value: '-',
          id: 'subtract'
        }, 
        {
          value: '+',
          id: 'add'
        }
      ],
      numbers: [
        {
          value: 7,
          id: 'seven'
        },
        {
          value: 8,
          id: 'eight'
        },
        {
          value: 9,
          id: 'nine'
        },
        {
          value: 4,
          id: 'four'
        },
        {
          value: 5,
          id: 'five'
        },
        {
          value: 6,
          id: 'six'
        },
        {
          value: 1,
          id: 'one'
        },
        {
          value: 2,
          id: 'two'
        },
        {
          value: 3,
          id: 'three'
        },
        {
          value: 0,
          id: 'zero'
        }
      ]
    }

    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleAcClick = this.handleAcClick.bind(this);
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleClick = this.handleOperationClick.bind(this);
  }

  handleNumberClick = (e) => {
    const lastPressed = this.state.lastPressed;
    const currentNumber = this.state.currentNumber;
    const operation = this.state.operation
    const value = e.target.innerText;
    
    if(!Number.isNaN(Number(value))) {
      if(lastPressed === '=' && operation === '=') {
        this.setState({
          lastPressed: value,
          currentNumber : value,
          operation: '',
          previousNumber: ''
        });
      } else {
        if (currentNumber === '0') {
          this.setState({
            lastPressed: value,
            currentNumber : value
          });
        } else {
          this.setState({
            lastPressed: value,
            currentNumber : currentNumber + value
          });
        }
      }
      return
    }
  }

  handleAcClick = (e) => {
    const value = e.target.innerText;

    this.setState({
      lastPressed: value,
      currentNumber: '0',
      previousNumber: '',
      operation: ''
    });
  }

  handleDecimalClick = (e) => {
    const currentNumber = this.state.currentNumber;
    const value = e.target.innerText;

    if(!currentNumber.includes('.')) {
      this.setState({
        currentNumber: currentNumber + value
      });
    }
  }

  handleOperationClick = (e) => {
    const lastPressed = this.state.lastPressed;
    const currentNumber = this.state.currentNumber;
    const previousNumber = this.state.previousNumber;
    const operation = this.state.operation
    const value = e.target.innerText;
    var evaluated = '';
   
    switch(value) {
      case('=') : {
        if(!operation) {
          return false;
        }
        else if(currentNumber === '-') {
          return false;
        }
        else if(lastPressed === '=' && operation === '=') {
          return false;
        }
        else {
          evaluated = eval(`${previousNumber} ${operation} ${currentNumber}`)

          this.setState({
            lastPressed: value,
            operation: value,
            previousNumber: `${previousNumber} ${operation}  ${currentNumber}`,
            currentNumber: evaluated
          });
        }
        break;
      }
      
      case('*') :
      case('/') :
      case('+') : {
        // If last pressed is equal, use result as first number
        if(lastPressed === '=' && operation === '=') {
          this.setState({
            lastPressed: value,
            operation: value,
            previousNumber: currentNumber,
            currentNumber: '0'
          });
        }
        else if(currentNumber === '0' && lastPressed !== '') {
          this.setState({
            lastPressed: value,
            operation: value,
          });
        }
        // Pressing operation for the firt time
        else if(!operation) {
          this.setState({
            lastPressed: value,
            operation: value,
            previousNumber: currentNumber,
            currentNumber: '0'
          });
        }
        else if(currentNumber !== '-') {
          this.setState({
            lastPressed: value,
            operation: value,
            previousNumber: `${previousNumber} ${operation}  ${currentNumber}`,
            currentNumber: '0'
          });
        } 
        else {
          this.setState({
            lastPressed: value,
            operation: value,
            currentNumber: '0'
          });
        }
        break;
      }

      case('-') : {
        if (lastPressed === '-') {
          return false;
        }
        if(currentNumber === '0') {
          this.setState({
            lastPressed: value,
            currentNumber: value
          });
        }
        else {
          this.setState({
            lastPressed: value,
            operation: value,
            previousNumber: `${previousNumber} ${operation}  ${currentNumber}`,
            currentNumber: '0'
          });
        }
        break;
      }

      default : {
        return false;
      }
    }
  }

  render() {
    const numbers = this.state.numbers;
    const operations = this.state.operations;

    const previousNumber = this.state.previousNumber;
    const operation = this.state.operation;
    const currentNumber = this.state.currentNumber;

    const thisCurrent = currentNumber === '0' ? '' : currentNumber;
    const currentOperation = currentNumber === '0' && previousNumber === '' ? '' : `${ previousNumber } ${ operation }  ${ thisCurrent }`;

    return (
      <main id="calculator" className="calculator">
        <div className="calculator-top">
          <h1>React JS Calculator</h1>
          <section className="screen">
            <div className="currentOperation">
              { currentOperation }
            </div>
            <div className="display" id="display">
              { currentNumber }
            </div>
          </section>
        </div>

        <div className="calculator-buttons">
          <section className="numbers">
            <button 
              className="ac" 
              id="clear"
              onClick={this.handleAcClick}>
                AC
            </button>

            { numbers.map(number => (
              <button 
                key={ number.value }
                id={ number.id }
                onClick={this.handleNumberClick}>
                { number.value }
              </button>
            )) }

            <button 
              className="dot"
              id="decimal"
              onClick={this.handleDecimalClick}>
                .
            </button>

            <button 
              className="equals"
              id="equals"
              onClick={this.handleOperationClick}>
                =
            </button>
          </section>

          <section className="operations">
            { operations.map(operation => (
              <button 
                key={ operation.id } 
                id={ operation.id } 
                onClick={this.handleOperationClick}>
                  { operation.value }
              </button>
            )) }
          </section>
        </div>
        
        
        

        
      </main>
    );
  }

}

export default App;
