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
        onContextMenu={(e) => this.props.onContextMenu(e, this.props.row, this.props.column)}
        onClick={() => this.props.onClick(this.props.row, this.props.column)}
      >
        <button
          className={`${coveredClass} ${flagClass} ${minecellClass}`}
          disabled={!this.props.covered}
          >
          <span className={`minecell ${coveredClass}`}>
            {this.props.surrounding_mines}
          </span>
        </button>
      </td>
    );
  }

};

export default MineCell;
