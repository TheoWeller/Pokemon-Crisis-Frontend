import React from 'react';
import semantic from 'semantic-ui-react';
import PokemonCard1 from './card1'
import PokemonCard2 from './card2'

let pokemon1 = {"name":"tentacool","id":72,"sprites":{"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/72.png","back_female":null,"back_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/72.png","back_shiny_female":null,"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png","front_female":null,"front_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/72.png","front_shiny_female":null},"types":[{"slot":2,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}},{"slot":1,"type":{"name":"water","url":"https://pokeapi.co/api/v2/type/11/"}}],"base_xp":67,"abilities":[{"ability":{"name":"rain-dish","url":"https://pokeapi.co/api/v2/ability/44/"},"is_hidden":true,"slot":3},{"ability":{"name":"liquid-ooze","url":"https://pokeapi.co/api/v2/ability/64/"},"is_hidden":false,"slot":2},{"ability":{"name":"clear-body","url":"https://pokeapi.co/api/v2/ability/29/"},"is_hidden":false,"slot":1}],"moves":[{"move":{"name":"bubble-beam","url":"https://pokeapi.co/api/v2/move/61/"},"level_learned":25},{"move":{"name":"cut","url":"https://pokeapi.co/api/v2/move/15/"},"level_learned":0},{"move":{"name":"mega-drain","url":"https://pokeapi.co/api/v2/move/72/"},"level_learned":0},{"move":{"name":"poison-jab","url":"https://pokeapi.co/api/v2/move/398/"},"level_learned":0}],"stats":[{"base_stat":70,"effort":0,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}},{"base_stat":100,"effort":1,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":50,"effort":0,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":35,"effort":0,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":40,"effort":0,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":40,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}}]}

let pokemon2 = {"name":"garbodor","id":569,"sprites":{"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/569.png","back_female":null,"back_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/569.png","back_shiny_female":null,"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/569.png","front_female":null,"front_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/569.png","front_shiny_female":null},"types":[{"slot":1,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}}],"base_xp":166,"abilities":[{"ability":{"name":"aftermath","url":"https://pokeapi.co/api/v2/ability/106/"},"is_hidden":true,"slot":3},{"ability":{"name":"weak-armor","url":"https://pokeapi.co/api/v2/ability/133/"},"is_hidden":false,"slot":2},{"ability":{"name":"stench","url":"https://pokeapi.co/api/v2/ability/1/"},"is_hidden":false,"slot":1}],"moves":[{"move":{"name":"venoshock","url":"https://pokeapi.co/api/v2/move/474/"},"level_learned":0},{"move":{"name":"payback","url":"https://pokeapi.co/api/v2/move/371/"},"level_learned":0},{"move":{"name":"dark-pulse","url":"https://pokeapi.co/api/v2/move/399/"},"level_learned":0},{"move":{"name":"giga-drain","url":"https://pokeapi.co/api/v2/move/202/"},"level_learned":0}],"stats":[{"base_stat":75,"effort":0,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}},{"base_stat":82,"effort":0,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":60,"effort":0,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":82,"effort":0,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":95,"effort":2,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":80,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}}]}



let newObj = {}
class BattleContainer extends React.Component {

  state = {player1: pokemon1, player2: pokemon2, playerMoves: [], level: 20}

  componentDidMount(){
    this.fetchPlayersHelper()
  }

  /*****************************************************************************
    FETCH HELPER METHODS
  *****************************************************************************/

  fetchMovesPlayerOne = (player, url) => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      let playerClone = { ...player, moves: [...this.state.player1.moves, data] }
      this.deleteUselessKeysFromMoves(playerClone.moves)
      playerClone.moves = this.removeOldMoveSlots(playerClone.moves);
      this.setState({player1: playerClone})
    })
  }

  fetchMovesPlayerTwo = (player, url) => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      let playerClone = { ...player, moves: [...this.state.player2.moves, data] }
      this.deleteUselessKeysFromMoves(playerClone.moves)
      playerClone.moves = this.removeOldMoveSlots(playerClone.moves);
      this.setState({player2: playerClone})
    })
  }

  fetchPlayersHelper = () => {
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][0]["move"]["url"])
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][1]["move"]["url"])
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][2]["move"]["url"])
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][3]["move"]["url"])
    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][0]["move"]["url"])
    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][1]["move"]["url"])
    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][2]["move"]["url"])
    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][3]["move"]["url"])
  }

  /*****************************************************************************
    FORMATTING MOVES HELPER METHODS
  *****************************************************************************/

  deleteUselessKeysFromMoves = (playerMoves) => {

    playerMoves.forEach(move => {
      delete move.contest_combos;
      delete move.effect_changes;
      delete move.effect_chance;
      delete move.priority;
      delete move.stat_changes;
      delete move.past_values;
      delete move.contest_effect;
      delete move.contest_type;
      delete move.generation;
      delete move.flavor_text_entries;
      delete move.machines;
      delete move.meta;
      delete move.names;
      delete move.super_contest_effect;
      delete move.target;
    })
  }

  removeOldMoveSlots = (playerMoves) => {
    return playerMoves.filter(move => {
      return !move.hasOwnProperty('move')
    })
  }


  render(){
    console.log("PLAYER-1 MOVES", this.state.player1.moves);
    console.log("PLAYER-2 MOVES", this.state.player2.moves);
    return (
      <div>
        <h1>Pokemon Cr151s</h1>
        <PokemonCard1 poke={pokemon1} moves={this.state.player1.moves} level={this.state.level}/>
        <PokemonCard2 poke={pokemon2} moves={this.state.player2.moves} level={this.state.level}/>
      </div>
    )

  }

}
export default BattleContainer;


// {this.props.pokemons[0] ? this.props.pokemons[0].name : "waiting..."}
