import React, { Component } from 'react';
import MineRow from './minerow.jsx'

class MineField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: props.board.map((row, index) => {
        return (
          <MineRow row={row} key={index} />
        );
      })
    }
  }

  render() {
    return (
      <table className="minefield">
        <tbody>
          {this.state.rows}
        </tbody>
      </table>
    );
  }
}

export default MineField;
