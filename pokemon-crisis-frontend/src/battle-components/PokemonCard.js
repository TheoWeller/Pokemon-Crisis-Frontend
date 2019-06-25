import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import _ from 'lodash'

const PokemonCard = (props) => {
  return (
    <div className="column">
      <Card style={{background: "white"} } className="poke-select-card">
        <Image className="ui image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`} wrapped ui={false} onClick={() => props.catchPokemon(props.pokemon)}/>
        <Card.Content className="poke-select-content">
          <b className="poke-select-headers">{_.capitalize(props.pokemon.name)}</b>
        </Card.Content>
      </Card>
    </div>
  )
}
export default PokemonCard
