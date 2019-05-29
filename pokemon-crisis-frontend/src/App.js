import React from 'react';
import './App.css';
import semantic from 'semantic-ui-react';
import BattleContainer from './battle-components/BattleContainer'
import _ from 'lodash'
import PokemonSelect from './battle-components/PokemonSelect'
import PlayerSignIn from './battle-components/PlayerSignIn'
import PickPokemon from './battle-components/PickPokemon'
import pk from './Pokemon-Kry51s.png'

class App extends React.Component {
  state = { pokemons: [], player1: {}, player2: {}, battleReady: false, selectedPokemen: {} , turn: ""}

  componentDidMount(){
    this.fetchAllPokemon()
    this.setState({turn: _.sample(["player1", "player2"])})
  }

  fetchAllPokemon = () => {
    fetch('http://localhost:3000/api/v1/pokemons')
    .then(resp => resp.json())
    .then(data => this.setState({pokemons: data}))
  }

  renderMoveNames = (pokemon) => {
    let moves = []
     pokemon.moves.forEach(move => {
       moves.push(move.move.name)
    })
    moves = moves.join(", ")
    return moves
  }

  catchPokemon = (poke) => {
    const pokemon = {...poke, moveNames: this.renderMoveNames(poke)}
    this.setState( { selectedPokemen: pokemon } )
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

  renderTitle = () => {
    if(!this.state.player1.name && !this.state.player2.name) {
      return <img src={pk} />
    }
  }

  handlePokemonSelect = (e) => {
    e.preventDefault()
    this.setState( { [this.state.turn]: { ...this.state[this.state.turn], battlePoke: this.state.selectedPokemen }, selectedPokemen: "", turn: this.state.turn === "player1" ? "player2" : "player1" } )
  }

  consitionallyRenderPickPokes = () => {
    if(this.state.player1.battlePoke && this.state.player2.battlePoke) {
      return <BattleContainer player1={this.state.player1} player2={this.state.player2} turn={this.state.turn} turnChange={this.turnChange} rematch={this.rematch}/>
    } else {
      return(
        <div>
          <PokemonSelect catchPokemon={this.catchPokemon} pokemons={this.state.pokemons} battleReady={this.state.battleReady}/>
        </div>
      )
    }
  }


  renderSignIn = () => {
    if(!this.state.player1.name && !this.state.player1.name){
      return <PlayerSignIn signUp={this.signUp} player1={this.state.player1} player2={this.state.player2} />
    }
  }

  renderPickPokemon = () => {
    // you can only pick your pokemon if:
    //  - the players are both created
    //  - a player's name renders
    //  - both players have not yet picked a pokemon
    console.log(this.state.player1.battlePoke)
    console.log(this.state.player2.battlePoke)
    if(this.state.battleReady && this.state.player1.name && (!this.state.player2.battlePoke || !this.state.player1.battlePoke)) {
      return <PickPokemon selectedPokemen={this.state.selectedPokemen} player1={this.state.player1} player2={this.state.player2} turn={this.state.turn} handlePokemonSelect={this.handlePokemonSelect}/>
    }
  }

  turnChange = () => {
    this.setState({turn: this.state.turn === "player1" ? "player2" : "player1"})
  }

  rematch = () => {
    this.setState( {player1: {...this.state.player1, battlePoke: null }, player2: {...this.state.player2, battlePoke: null } } )
  }

  render(){
    console.log(this.state.turn)
    return (
      <div className="App">
        <header className="App-header">
          {this.renderLogo()}
          {this.renderTitle()}
          {this.renderPickPokemon()}
          {this.renderSignIn()}
          {this.consitionallyRenderPickPokes()}

        </header>

      </div>
    );

  }
}

export default App;
