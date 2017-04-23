import React, { Component } from 'react';

class MineCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surrounding_mines: props.cell.surrounding_mines,
      covered: props.cell.covered
    }
  }

  handleClick() {
    if ( this.state.surrounding_mines == 9 ) {
      alert('Game over');
    }
    this.setState({covered: false});
  }

  render() {
    return (
      <td
        className={`${this.state.covered ? 'covered' : 'uncovered'} minecell minecell-${this.state.surrounding_mines}`}
        onClick={() => this.handleClick()} >
        {this.state.surrounding_mines}
      </td>
    );
  }

};

export default MineCell;
