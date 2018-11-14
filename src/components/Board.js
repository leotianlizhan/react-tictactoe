import React, { Component } from 'react';
import Square from './Square';
import {Row, Button, Table} from 'reactstrap';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: 0,
      count: 0, 
      p0_score: 0,
      p1_score: 0
    };
    this.handleRestart = this.handleRestart.bind(this);
  }

  
  gameOver(){
    return this.state.count === 9;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(this.gameOver() || detectWinner(squares) || squares[i]) return;
    squares[i] = this.state.nextPlayer == 1 ? 'O':'X';
    let lastPlayer = this.state.nextPlayer;
    let modifiedState = {...this.state, squares: squares, nextPlayer: 1-lastPlayer, count: this.state.count+1};
    if(detectWinner(squares)){
      if(lastPlayer == 1){
        modifiedState.p1_score++;
      }else{
        modifiedState.p0_score++;
      }
    }
    this.setState(modifiedState);
  }

  handleRestart(){
    this.setState({...this.state, 
      squares: Array(9).fill(null),
      count: 0
    })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderRestart(){
    if(this.gameOver() || detectWinner(this.state.squares)) return (<Button color="primary" onClick={this.handleRestart}>Restart</Button>);
  }

  render() {
    let winner = detectWinner(this.state.squares);
    if(winner){
      var status = 'The Winner is player ' + (1-this.state.nextPlayer);
    } else if(this.gameOver()){
      var status = 'Tied';
    } else {
      var status = 'Next player: ' + this.state.nextPlayer;
    }
    return (
      <div>
        <h1 className="display-3">{status}</h1>
        { this.renderRestart() }
        <Row>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </Row>
        <Row>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </Row>
        <Row>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </Row>

        <Table>
        <thead>
          <tr>
            <th>Player #</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">0</th>
            <td>{this.state.p0_score}</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>{this.state.p1_score}</td>
          </tr>
        </tbody>
      </Table>
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
      
      return true;
    }
  }
  return false;
}



export default Board;