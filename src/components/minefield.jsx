import React, { Component } from 'react';
import MineCell from './minecell.jsx'

class MineField extends Component {

  constructor(props) {
    super(props);

    // Generate initial, empty field
    var field = [];
    for (var i=0; i<this.props.height; i++) {
      var cells = []
      for (var j=0; j<this.props.width; j++) {
        cells.push({
          covered: true,
          flag: false,
          surrounding_mines: 0
        })
      }
      field.push(cells);
    }

    // Add mines
    for (var i=0; i<this.props.mines; i++) {
      var row = Math.floor(Math.random() * this.props.height);
      var column = Math.floor(Math.random() * this.props.width);
      if ( field[row][column].surrounding_mines == 0) {
        field[row][column].surrounding_mines = 9;
      } else {
        i--;
      }
    }

    // Set surrounding mine counts
    for (var i=0; i<this.props.height; i++) {
      for (var j=0; j<this.props.width; j++) {
        if ( field[i][j].surrounding_mines == 9 ) {
          continue;
        }

        this.getSurroundingCells(i, j).forEach((item) => {
          if (field[item[0]][item[1]].surrounding_mines == 9) {
            field[i][j].surrounding_mines++;
          }
        });
      }
    }

    this.state = {field}
  }

  getSurroundingCells(row, column) {
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
      if (cell[0] >= 0 && cell[1] >= 0 && cell[0] < this.props.height && cell[1] < this.props.width) {
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
        this.getSurroundingCells(row, column).forEach((cell) => {
          if ( field[cell[0]][cell[1]].covered ) {
            this.uncoverCell(cell[0], cell[1]);
          }
        });
      }
      this.setState({field});
    }
  }

  flagCell (e, row, column) {
    e.preventDefault();
    const field = this.state.field;
    if ( field[row][column].covered ) {
      field[row][column].flag = !field[row][column].flag;
      this.setState({field});
    }
  }

  render() {
    const rows = [];
    for (var i=0; i<this.state.field.length; i++) {
      var cells = [];
      for (var j=0; j<this.state.field[i].length; j++) {
        cells.push(
          <MineCell
            key={j}
            covered={this.state.field[i][j].covered}
            flag={this.state.field[i][j].flag}
            onContextMenu={this.flagCell.bind(this)}
            onClick={this.uncoverCell.bind(this)}
            row={i}
            column={j}
            surrounding_mines={this.state.field[i][j].surrounding_mines}
          />
        )
      }
      rows.push(
        <tr key={i}>
          {cells}
        </tr>
      )
    }

    return (
      <table className="minefield">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default MineField;
