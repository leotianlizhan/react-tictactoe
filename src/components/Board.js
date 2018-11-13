import React, { Component } from 'react';
import Square from './Square';
import '../App.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      turn: 0,
      start: true
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(!this.state.start || detectWinner(squares) || squares[i]) return;
    squares[i] = this.state.turn == 1 ? 'O':'X';
    this.setState({squares: squares, turn: 1-this.state.turn});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let winner = detectWinner(this.state.squares);
    if(winner)
      var status = 'The Winner is player ' + (1-this.state.turn);
    else
      var status = 'Next player: ' + this.state.turn;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function detectWinner(squares){
  const cond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < cond.length; i++) {
    const [a, b, c] = cond[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Board;