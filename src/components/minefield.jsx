import React, { Component } from 'react';
import MineCell from './minecell.jsx'

class MineField extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const rows = [];
    for (var i=0; i<this.props.field.length; i++) {
      var cells = [];
      for (var j=0; j<this.props.field[i].length; j++) {
        cells.push(
          <MineCell
            key={j}
            covered={this.props.field[i][j].covered}
            flag={this.props.field[i][j].flag}
            onContextMenu={this.props.flagCell}
            onClick={this.props.uncoverCell}
            row={i}
            column={j}
            surrounding_mines={this.props.field[i][j].surrounding_mines}
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
