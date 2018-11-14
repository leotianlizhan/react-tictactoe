import React, { Component } from 'react';
import logo from './assets/donut.svg';
import './App.css';
import Board from './components/Board.js';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Board />
      </Container>
    );
  }
}

export default App;
