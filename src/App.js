import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPressed: '',
      currentNumber: '0',
      previousNumber: '',
      operation: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    const lastPressed = this.state.lastPressed;
    const currentNumber = this.state.currentNumber;
    const previousNumber = this.state.previousNumber;
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

    switch(value) {
      case('AC') : {
        this.setState({
          currentNumber: '0',
          previousNumber: '',
          operation: ''
        });
        break
      }
      case('.') : {
        if(!currentNumber.includes('.')) {
          this.setState({
            currentNumber: currentNumber + value
          });
        }
        break
      }
      default: {
        // if press operation without first number 
        if(value === '-') {
          if(lastPressed === '' || lastPressed === '0' || lastPressed === 'AC'  ) {
            this.setState({
              currentNumber: value
            });
            return false;
          }
        }

        // If press operation for the first time
        if(!operation) {
          if(value === '=') {
            return false;
          } else {
            this.setState({
              operation: value,
              previousNumber: currentNumber,
              currentNumber: '0'
            });
          }
        }

        // If press operation after getting a result
        else if(lastPressed === '=' && operation === '=') {
          if(value !== '=') {
            this.setState({
              operation: value,
              previousNumber: currentNumber,
              currentNumber: '0'
            });
          } 
          // If press two consecutive equals
          else {
            return false;
          }
        }
        
        // ...
        else {
          console.log('operation' + value);
          if(
            value === '/' ||
            value === '*' ||
            value === '+'
          ) {

          }
          const evaluated = eval(`${previousNumber} ${operation} ${currentNumber}`)

          this.setState({
            operation: value,
            previousNumber: `${previousNumber} ${operation}  ${currentNumber}`,
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
    const numbers = [
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
    ];
    const operations = [
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
      }, 
      {
        value: '=',
        id: 'equals'
      }
    ];

    const previousNumber = this.state.previousNumber;
    const operation = this.state.operation;
    const currentNumber = this.state.currentNumber;

    const thisCurrent = currentNumber === '0' ? '' : currentNumber;
    const currentOperation = currentNumber === '0' && previousNumber === '' ? '' : `${ previousNumber } ${ operation }  ${ thisCurrent }`;

    return (
      <main id="calculator" className="calculator">
      
      <p style={{position: 'absolute', top: 0}}>
        { JSON.stringify(this.state, null, 2) }
      </p>
       
        <div className="currentOperation">
          { currentOperation }
        </div>
        <div className="display" id="display">
          { currentNumber }
        </div>

        <button 
          className="ac" 
          id="clear"
          onClick={this.handleClick}>
            AC
        </button>

        { numbers.map(number => (
          <button 
            key={ number.value }
            id={ number.id }
            onClick={this.handleClick}>
            { number.value }
          </button>
        )) }

        <button 
          className="dot"
          id="decimal"
          onClick={this.handleClick}>
            .
        </button>

        { operations.map(operation => (
          <button 
            key={ operation.id } 
            id={ operation.id } 
            onClick={this.handleClick}>
              { operation.value }
          </button>
        )) }
   
      </main>
    );
  }

}

export default App;
