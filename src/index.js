import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MineField from './components/minefield.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      board: this.generateBoard()
    }
  }

  generateBoard() {
    const BOARD_HEIGHT = 8;
    const BOARD_WIDTH = 8;
    const CELL_COUNT = BOARD_HEIGHT * BOARD_WIDTH;
    const MINE_COUNT = 10;

    // Generate initial, empty board
    var board = [];
    for (var i=0; i<BOARD_HEIGHT; i++) {
      var row = []
      for (var j=0; j<BOARD_WIDTH; j++) {
        row.push(0);
      }
      board.push(row);
    }

    // Add mines
    for (var i=0; i<MINE_COUNT; i++) {
      var row = Math.floor(Math.random() * BOARD_HEIGHT);
      var column = Math.floor(Math.random() * BOARD_WIDTH);
      if ( board[row][column] == 0) {
        board[row][column] = 9;
      } else {
        i--;
      }
    }

    return board;
  }

  render() {
    return (
      <div>
        <h1>Mines</h1>
        <MineField board={this.state.board} />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('.container'));
