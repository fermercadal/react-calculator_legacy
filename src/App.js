import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPressed: undefined,
      currentNumber: '0',
      previousNumber: undefined
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    const lastPressed = this.state.lastPressed;
    const currentNumber = this.state.currentNumber;
    const previousNumber = this.state.previousNumber;
    const value = e.target.innerText;
    
    if(!Number.isNaN(Number(value))) {
      if (currentNumber === 0) {
        this.setState({
          currentNumber = value
        });
      } else {
        this.setState({
          currentNumber = currentNumber + value
        });
      }
      
    }

    switch(value) {

    }

    this.setState({
      lastPressed: value
    });
  }

  render() {
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    const operations = ['/', '*', '-', '+', '='];

    return (
      <main id="calculator" className="calculator">
       
        <div className="display">1234</div>

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
