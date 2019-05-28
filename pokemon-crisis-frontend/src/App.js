import React from 'react';
import './App.css';
import semantic from 'semantic-ui-react';
import BattleContainer from './battle-components/BattleContainer'
import _ from 'lodash'
import PokemonSelect from './battle-components/PokemonSelect'
import PlayerSignIn from './battle-components/PlayerSignIn'

class App extends React.Component {
  state = { pokemons: [], player1: {} }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/pokemons')
    .then(resp => resp.json())
    .then(data => this.setState({pokemons: data}))
  }

  signUp = (e) => {
    e.preventDefault()
    // console.log(e.target.name.value);
    fetch('http://localhost:3000/api/v1/trainers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, body: JSON.stringify({

        'name': e.target.name.value
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data.name)
      this.setState({
        player1: {
          name: data.name,
          id: data.id
        }
      })
    })
  }


  render(){

    console.log(this.state.pokemons)
    return (
      <div className="App">
        <header className="App-header">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${_.random(1, 807)}.png`} className="App-logo" alt="logo" />
          <PlayerSignIn signUp={this.signUp} player1={this.state.player1} />
          <br />
          <PokemonSelect pokemons={this.state.pokemons}/>
          <BattleContainer pokemons={this.state.pokemons}/>
        </header>
      </div>
    );

  }
}

export default App;
