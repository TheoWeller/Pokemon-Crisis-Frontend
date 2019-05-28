import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'


class PokemonCard extends React.Component{
  render() {
    return (
      <div className="column">

        <Card style={{background: "white"}}>
          <Image className="ui image" src={this.props.pokemon.sprites.front_default} wrapped ui={false} onClick={() => this.props.catchPokemon(this.props.pokemon)}/>

          <Card.Content>
            <Card.Header>{this.props.pokemon.name}</Card.Header>
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
