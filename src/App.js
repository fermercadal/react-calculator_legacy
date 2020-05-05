import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // goes up to minute 48:15
  
  constructor(props) {
    super(props);

    this.state = {
      lastPressed: undefined,
      firstNumber: undefined
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    const value = e.target.innerText;
    console.log(value);
    
    switch(value) {

    }
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
