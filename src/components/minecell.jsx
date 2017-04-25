import React, { Component } from 'react';

class MineCell extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const minecellClass = 'minecell-' + this.props.surrounding_mines;
    const flagClass = this.props.flag ? 'flagged': '';
    const coveredClass = this.props.covered ? 'covered' : 'uncovered';
    return (
      <td
        className={`minecell ${coveredClass} ${minecellClass} ${flagClass}`}
        onContextMenu={(e) => this.props.onContextMenu(e, this.props.row, this.props.column)}
        onClick={() => this.props.onClick(this.props.row, this.props.column)}>
        {this.props.surrounding_mines}
      </td>
    );
  }

};

export default MineCell;
