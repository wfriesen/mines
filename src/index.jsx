import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MineField from './components/minefield.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    const height = 8;
    const width = 8;
    const mine_count = 10;
    const gameOn = false;
    const field = this.generateField(height, width, mine_count);

    this.state = { height, width, mine_count, gameOn, field };
  }

  generateField(height, width, mines) {
    // Generate initial, empty field
    var field = [];
    for (var i=0; i<height; i++) {
      var cells = []
      for (var j=0; j<width; j++) {
        cells.push({
          covered: true,
          flag: false,
          surrounding_mines: 0
        })
      }
      field.push(cells);
    }

    // Add mines
    for (var i=0; i<mines; i++) {
      var row = Math.floor(Math.random() * height);
      var column = Math.floor(Math.random() * width);
      if ( field[row][column].surrounding_mines == 0) {
        field[row][column].surrounding_mines = 9;
      } else {
        i--;
      }
    }

    // Set surrounding mine counts
    for (var i=0; i<height; i++) {
      for (var j=0; j<width; j++) {
        if ( field[i][j].surrounding_mines == 9 ) {
          continue;
        }

        this.getSurroundingCells(i, j, height, width).forEach((item) => {
          if (field[item[0]][item[1]].surrounding_mines == 9) {
            field[i][j].surrounding_mines++;
          }
        });
      }
    }

    return field;
  }

  getSurroundingCells(row, column, height, width) {
    const cells = [];
    [
      [row-1, column-1],
      [row-1, column],
      [row-1, column+1],
      [row, column-1],
      [row, column+1],
      [row+1, column-1],
      [row+1, column],
      [row+1, column+1]
    ].forEach((cell) => {
      if (cell[0] >= 0 && cell[1] >= 0 && cell[0] < height && cell[1] < width) {
        cells.push([cell[0], cell[1]]);
      }
    });
    return cells;
  }

  updateTimer() {
    const now = new Date().getTime();
    const time = Math.trunc((now - this.state.startTime) / 1000);
    this.setState({time});
  }

  startGame() {
    if ( !this.state.gameOn ) {
      const gameOn = true;
      const startTime = new Date().getTime();
      const timerInterval = setInterval(() => {this.updateTimer();}, 1000);
      const time = 0;
      this.setState({ gameOn, startTime, timerInterval, time });
    }
  }

  uncoverCell (row, column) {
    this.startGame();
    const field = this.state.field;
    if ( field[row][column].covered && !field[row][column].flag ) {
      field[row][column].covered = false;
      if ( field[row][column].surrounding_mines == 0 ) {
        this.getSurroundingCells(row, column, this.state.height, this.state.width).forEach((cell) => {
          if ( field[cell[0]][cell[1]].covered ) {
            this.uncoverCell(cell[0], cell[1]);
          }
        });
      }
      this.setState({field: field});
    }
  }

  flagCell (e, row, column) {
    this.startGame();
    e.preventDefault();
    const field = this.state.field;
    if ( field[row][column].covered ) {
      field[row][column].flag = !field[row][column].flag;
      this.setState({field: field});
    }
  }

  restart() {
    const field = this.generateField(this.state.height, this.state.width, this.state.mine_count);
    const gameOn = false;
    const startTime = undefined;
    const timerInterval = undefined;
    const time = undefined;
    clearInterval(this.state.timerInterval);
    this.setState({ field, gameOn, startTime, time, timerInterval });
  }

  changeHeight(new_height) {
    const height = parseInt(new_height);
    if ( !isNaN(height) ) {
      const field = this.generateField(height, this.state.width, this.state.mine_count);
      this.setState({ height, field });
    }
  }

  changeWidth(new_width) {
    const width = parseInt(new_width);
    if ( !isNaN(width) ) {
      const field = this.generateField(this.state.height, width, this.state.mine_count);
      this.setState({ width, field });
    }
  }

  changeMineCount(new_mine_count) {
    const mine_count = parseInt(new_mine_count);
    if ( !isNaN(mine_count) ) {
      const field = this.generateField(this.state.height, this.state.width, mine_count);
      this.setState({ mine_count, field });
    }
  }

  render() {
    return (
      <div>
        <h1 onClick={() => this.restart()}>Mines</h1>
        <input
          type="text"
          value={this.state.height}
          onChange={(e) => this.changeHeight(e.target.value)}
        />
        <input
          type="text"
          value={this.state.width}
          onChange={(e) => this.changeWidth(e.target.value)}
        />
        <input
          type="text"
          value={this.state.mine_count}
          onChange={(e) => this.changeMineCount(e.target.value)}
        />
        <span className="timer">{this.state.time}</span>
        <MineField
          height={this.state.height}
          width={this.state.width}
          mines={this.state.mine_count}
          field={this.state.field}
          uncoverCell={(row, column) => this.uncoverCell(row, column)}
          flagCell={(e, row, column) => this.flagCell(e, row, column)}
        />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('.container'));
