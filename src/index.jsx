import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MineField from './components/minefield.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      height: 8,
      width: 8,
      mine_count: 10
    }
  }

  render() {
    return (
      <div>
        <h1>Mines</h1>
        <MineField height={this.state.height} width={this.state.width} mines={this.state.mine_count} />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('.container'));
