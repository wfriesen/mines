import React, { Component } from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css'

class MineCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const minecellClass = 'minecell-' + this.props.surrounding_mines;
    const coveredClass = this.props.covered ? 'covered' : 'uncovered';

    let mineCount = '';
    let iconClass = '';
    if ( this.props.flag ) {
      iconClass = 'fa fa-flag';
    } else if ( !this.props.covered ) {
      if ( this.props.surrounding_mines == 9 ) {
        iconClass = 'fa fa-bomb';
      } else {
        mineCount = this.props.surrounding_mines;
      }
    }

    return (
      <td
        onContextMenu={(e) => this.props.onContextMenu(e, this.props.row, this.props.column)}
        onClick={() => this.props.onClick(this.props.row, this.props.column)}
      >
        <button
          className={`minebutton ${coveredClass} ${iconClass} ${minecellClass}`}
          disabled={!this.props.covered}
          >
          { mineCount }
        </button>
      </td>
    );
  }

};

export default MineCell;
