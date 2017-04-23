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
    const MINE_COUNT = 10;

    // Generate initial, empty board
    var board = [];
    for (var i=0; i<BOARD_HEIGHT; i++) {
      var row = []
      for (var j=0; j<BOARD_WIDTH; j++) {
        row.push({
          surrounding_mines: 0,
          covered: true
        });
      }
      board.push(row);
    }

    // Add mines
    for (var i=0; i<MINE_COUNT; i++) {
      var row = Math.floor(Math.random() * BOARD_HEIGHT);
      var column = Math.floor(Math.random() * BOARD_WIDTH);
      if ( board[row][column].surrounding_mines == 0) {
        board[row][column].surrounding_mines = 9;
      } else {
        i--;
      }
    }

    const isMine = (row, column) => {
      if ( board[row] != undefined && board[row][column] != undefined ) {
        return (board[row][column].surrounding_mines == 9);
      }
      else return false;
    }

    for (var i=0; i<BOARD_HEIGHT; i++) {
      for (var j=0; j<BOARD_WIDTH; j++) {
        if ( board[i][j].surrounding_mines == 9 ) {
          continue;
        }

        [
          [i-1, j-1],
          [i-1, j],
          [i-1, j+1],
          [i, j-1],
          [i, j+1],
          [i+1, j-1],
          [i+1, j],
          [i+1, j+1]
        ].forEach((item) => {
          if ( isMine(item[0], item[1]) ) {
            board[i][j].surrounding_mines++;
          }
        });
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
