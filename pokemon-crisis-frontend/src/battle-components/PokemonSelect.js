import React from 'react';
import PokemonCard from './PokemonCard'


class PokemonSelect extends React.Component {

  renderPokes = () => {
    return this.props.pokemons.map(pokemon => <PokemonCard catchPokemon={this.props.catchPokemon} pokemon={pokemon}/>)
  }

  contiionallyRenderAllPokes = () => {
    return this.props.battleReady === true ? this.renderPokes() : null
  }

  render() {
    return (
      <div className="ui six column grid" id="margin-boi">
        {this.contiionallyRenderAllPokes()}
      </div>
    )
  }

}

export default PokemonSelect
