import React from 'react';
import logo from './logo.svg';
import './App.css';
import semantic from 'semantic-ui-react';
import BattleContainer from './battle-components/BattleContainer'
import _ from 'lodash'

class App extends React.Component {
  state = { pokemons: [] }

  // componentDidMount(){
  //   fetch('http://localhost:3000/api/v1/pokemons')
  //   .then(resp => resp.json())
  //   .then(data => this.setState({pokemons: data}))
  // }


  render(){

    console.log(this.state.pokemons)
    return (
      <div className="App">
        <header className="App-header">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${_.random(1, 807)}.png`} className="App-logo" alt="logo" />
          <BattleContainer pokemons={this.state.pokemons}/>
        </header>
      </div>
    );

  }
}

export default App;
