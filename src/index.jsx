import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MineField from './components/minefield.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    const height = 8;
    const width = 8;
    const mine_count = 10;
    const field = this.generateField(height, width, mine_count);

    this.state = {
      height,
      width,
      mine_count,
      field
    };
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

  uncoverCell (row, column) {
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
    e.preventDefault();
    const field = this.state.field;
    if ( field[row][column].covered ) {
      field[row][column].flag = !field[row][column].flag;
      this.setState({field: field});
    }
  }

  restart() {
    this.setState({
      field: this.generateField(this.state.height, this.state.width, this.state.mine_count)
    });
  }

  render() {
    return (
      <div>
        <h1 onClick={() => this.restart()}>Mines</h1>
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
