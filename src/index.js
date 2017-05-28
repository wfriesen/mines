import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MineField from './components/minefield.jsx';
import '../node_modules/font-awesome/css/font-awesome.min.css'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      board_height: 8,
      board_width: 8,
      mine_count: 10
    }
  }

  render() {
    return (
      <div>
        <h1>Mines</h1>
        <MineField height={this.state.board_height} width={this.state.board_width} mines={this.state.mine_count} />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('.container'));
