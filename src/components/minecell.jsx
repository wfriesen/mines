import React, { Component } from 'react';

class MineCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      surrounding_mines: props.surrounding_mines
    }
  }

  handleClick() {
    this.setState({surrounding_mines: '?'});
  }

  render() {
    return (
      <td className={'minecell-' + this.state.surrounding_mines} onClick={() => this.handleClick()} >
        {this.state.surrounding_mines}
      </td>
    );
  }

};

export default MineCell;
