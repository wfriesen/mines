import React, { Component } from 'react';

class MineCell extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <td
        className={`${this.props.covered ? 'covered' : 'uncovered'} minecell minecell-${this.props.surrounding_mines} ${this.props.flag ? 'flagged': ''}`}
        onContextMenu={(e) => this.props.onContextMenu(e, this.props.row, this.props.column)}
        onClick={() => this.props.onClick(this.props.row, this.props.column)}>
        {this.props.surrounding_mines}
      </td>
    );
  }

};

export default MineCell;
