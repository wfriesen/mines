import React, { Component } from 'react';

class MineRow extends Component {

  render() {
    return (
      <tr>
        {this.props.cells}
      </tr>
    );
  }
}

export default MineRow;