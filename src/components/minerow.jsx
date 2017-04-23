import React, { Component } from 'react';
import MineCell from './minecell.jsx';

class MineRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: props.row.map((cell, index) => {
        return (
          <MineCell cell={cell} key={index} />
        );
      })
    }
  }

  render() {
    return (
      <tr>
        {this.state.cells}
      </tr>
    );
  }
}

export default MineRow;