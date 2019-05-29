import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonCard extends React.Component{
  render() {
    return (
      <div className="column">

        <Card style={{background: "white"} } className="poke-select-card">
          <Image className="ui image" src={this.props.pokemon.sprites.front_default} wrapped ui={false} onClick={() => this.props.catchPokemon(this.props.pokemon)}/>

          <Card.Content className="poke-select-content">
            <b className="poke-select-headers">{_.capitalize(this.props.pokemon.name)}</b>
            <Card.Meta>

            </Card.Meta>
            <Card.Description>

            </Card.Description>
          </Card.Content>
          <Card.Content extra>

          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default PokemonCard
