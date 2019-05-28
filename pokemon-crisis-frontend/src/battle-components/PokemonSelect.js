import React from 'react';
import semantic from 'semantic-ui-react';
import PokemonCard from './PokemonCard'

class PokemonSelect extends React.Component {

  renderPokes = () => {
    return this.props.pokemons.map(pokemon => <PokemonCard catchPokemon={this.props.catchPokemon} pokemon={pokemon}/>)
  }

  render() {
    return (
      <div className="ui six column grid">
        {this.renderPokes()}
      </div>

    )
  }

}

export default PokemonSelect
