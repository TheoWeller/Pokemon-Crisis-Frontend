import React from 'react';
import './App.css';
import semantic from 'semantic-ui-react';
import BattleContainer from './battle-components/BattleContainer'
import _ from 'lodash'
import PokemonSelect from './battle-components/PokemonSelect'
import PlayerSignIn from './battle-components/PlayerSignIn'
import PickPokemon from './battle-components/PickPokemon'

class App extends React.Component {
  state = { pokemons: [], player1: {}, player2: {}, battleReady: false, selectedPokemen: {} , turn: "player2"}

  componentDidMount(){
    this.fetchAllPokemon()
    this.setState({turn: _.sample(["player1", "player2"])})
  }

  fetchAllPokemon = () => {
    fetch('http://localhost:3000/api/v1/pokemons')
    .then(resp => resp.json())
    .then(data => this.setState({pokemons: data}))
  }

  catchPokemon = (poke) => {
    console.log(poke)
    this.setState( { selectedPokemen: poke } )
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

  renderLogo = () => {
    if(!this.state.player1.name && !this.state.player2.name) {
      return <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${_.random(1, 807)}.png`} className="App-logo" alt="logo" />
    }
  }

  handlePokemonSelect = (e) => {
    e.preventDefault()
    this.setState( { [this.state.turn]: { ...this.state[this.state.turn], battlePoke: this.state.selectedPokemen }, selectedPokemen: "", turn: this.state.turn === "player1" ? "player2" : "player1" } )
  }






  render(){

    // console.log(this.state.player1)
    // console.log(this.state.player2)
    console.log(this.state.turn)
    return (
      <div className="App">
        <header className="App-header">
        <PickPokemon selectedPokemen={this.state.selectedPokemen} player1={this.state.player1} player2={this.state.player2} turn={this.state.turn} handlePokemonSelect={this.handlePokemonSelect}/>
        <PokemonSelect catchPokemon={this.catchPokemon} pokemons={this.state.pokemons} battleReady={this.state.battleReady}/>
          {this.renderLogo()}
          <PlayerSignIn signUp={this.signUp} player1={this.state.player1} player2={this.state.player2} />
          <br />
          <BattleContainer pokemons={this.state.pokemons}/>
        </header>
      </div>
    );

  }
}

export default App;
