import React from 'react';
import semantic from 'semantic-ui-react';
import PokemonCard from './PokemonCard'

class PokemonSelect extends React.Component {

  renderPokes = () => {
    this.props.pokemons.map(pokemon => <PokemonCard pokemon={pokemon}/>)
  }

  render() {
    return (
      <span>
        {this.renderPokes()}
      </span>

    )
  }

}

export default PokemonSelect
