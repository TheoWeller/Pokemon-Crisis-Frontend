import React from 'react';
import './App.css';
import semantic from 'semantic-ui-react';
import BattleContainer from './battle-components/BattleContainer'
import _ from 'lodash'
import PokemonSelect from './battle-components/PokemonSelect'
import PlayerSignIn from './battle-components/PlayerSignIn'

class App extends React.Component {
  state = { pokemons: [{"name":"tentacool","id":72,"sprites":{"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/72.png","back_female":null,"back_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/72.png","back_shiny_female":null,"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png","front_female":null,"front_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/72.png","front_shiny_female":null},"types":[{"slot":2,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}},{"slot":1,"type":{"name":"water","url":"https://pokeapi.co/api/v2/type/11/"}}],"base_xp":67,"abilities":[{"ability":{"name":"rain-dish","url":"https://pokeapi.co/api/v2/ability/44/"},"is_hidden":true,"slot":3},{"ability":{"name":"liquid-ooze","url":"https://pokeapi.co/api/v2/ability/64/"},"is_hidden":false,"slot":2},{"ability":{"name":"clear-body","url":"https://pokeapi.co/api/v2/ability/29/"},"is_hidden":false,"slot":1}],"moves":[{"move":{"name":"bubble-beam","url":"https://pokeapi.co/api/v2/move/61/"},"level_learned":25},{"move":{"name":"cut","url":"https://pokeapi.co/api/v2/move/15/"},"level_learned":0},{"move":{"name":"mega-drain","url":"https://pokeapi.co/api/v2/move/72/"},"level_learned":0},{"move":{"name":"poison-jab","url":"https://pokeapi.co/api/v2/move/398/"},"level_learned":0}],"stats":[{"base_stat":70,"effort":0,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}},{"base_stat":100,"effort":1,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":50,"effort":0,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":35,"effort":0,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":40,"effort":0,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":40,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}}]}, {"name":"garbodor","id":569,"sprites":{"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/569.png","back_female":null,"back_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/569.png","back_shiny_female":null,"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/569.png","front_female":null,"front_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/569.png","front_shiny_female":null},"types":[{"slot":1,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}}],"base_xp":166,"abilities":[{"ability":{"name":"aftermath","url":"https://pokeapi.co/api/v2/ability/106/"},"is_hidden":true,"slot":3},{"ability":{"name":"weak-armor","url":"https://pokeapi.co/api/v2/ability/133/"},"is_hidden":false,"slot":2},{"ability":{"name":"stench","url":"https://pokeapi.co/api/v2/ability/1/"},"is_hidden":false,"slot":1}],"moves":[{"move":{"name":"venoshock","url":"https://pokeapi.co/api/v2/move/474/"},"level_learned":0},{"move":{"name":"payback","url":"https://pokeapi.co/api/v2/move/371/"},"level_learned":0},{"move":{"name":"dark-pulse","url":"https://pokeapi.co/api/v2/move/399/"},"level_learned":0},{"move":{"name":"giga-drain","url":"https://pokeapi.co/api/v2/move/202/"},"level_learned":0}],"stats":[{"base_stat":75,"effort":0,"stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}},{"base_stat":82,"effort":0,"stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":60,"effort":0,"stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":82,"effort":0,"stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":95,"effort":2,"stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":80,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}}]}], player1: {} }

  // componentDidMount(){
  //   fetch('http://localhost:3000/api/v1/pokemons')
  //   .then(resp => resp.json())
  //   .then(data => this.setState({pokemons: data}))
  // }

  catchPokemon = (poke) => {
    console.log(poke)
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
