import React from 'react';
import semantic from 'semantic-ui-react';
import PokemonCard from './PokemonCard'

class PokemonSelect extends React.Component {

  renderPokes = () => {
    console.log("HEY it BRok3", this.props);
    return this.props.pokemons.map(pokemon => <PokemonCard catchPokemon={this.props.catchPokemon} pokemon={pokemon}/>)
  }

  contiionallyRenderAllPokes = () => {
    return this.props.battleReady === true ? this.renderPokes() : "Loading..."
  }

  render() {
    return (
      <div className="ui six column grid">

        {this.contiionallyRenderAllPokes()}
      </div>

    )
  }

}

export default PokemonSelect
