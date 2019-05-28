import React from 'react';
import './App.css';
import semantic from 'semantic-ui-react';
import BattleContainer from './battle-components/BattleContainer'
import _ from 'lodash'
import PokemonSelect from './battle-components/PokemonSelect'
import PlayerSignIn from './battle-components/PlayerSignIn'

class App extends React.Component {
  state = { pokemons: [], player1: {}, player2: {}, battleReady: false }

  componentDidMount(){
    this.fetchAllPokemon()
  }

  fetchAllPokemon = () => {
    fetch('http://localhost:3000/api/v1/pokemons')
    .then(resp => resp.json())
    .then(data => this.setState({pokemons: data}))
  }

  catchPokemon = (poke) => {
    console.log(poke)
  }

  signUp = (p1, p2, e) => {
    e.preventDefault()

    fetch('http://localhost:3000/api/v1/trainers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, body: JSON.stringify({

        'player1': p1,
        'player2': p2
      })
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        player1: {...this.state.player1, id: data.player1.id},
        player2: {...this.state.player2, id: data.player2.id}
      })
    })
    //optimistically set player names
    this.setState({ player1: {name: p1}, player2: {name: p2}, battleReady: true})
  }




  render(){

    console.log(this.state.player1)
    console.log(this.state.player2)
    return (
      <div className="App">
        <header className="App-header">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${_.random(1, 807)}.png`} className="App-logo" alt="logo" />
          <PlayerSignIn signUp={this.signUp} player1={this.state.player1} player2={this.state.player2} />
          <br />
          <PokemonSelect pokemons={this.state.pokemons} battleReady={this.state.battleReady}/>
          <BattleContainer pokemons={this.state.pokemons}/>
        </header>
      </div>
    );

  }
}

export default App;
