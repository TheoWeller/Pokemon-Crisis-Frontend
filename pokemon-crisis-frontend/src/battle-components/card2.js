import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


class PokemonCard2 extends React.Component{
  render() {
    return (
      <Card style={{background: "red"}}>
        <Image src={this.props.poke.sprites.front_default} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.poke.name}</Card.Header>
          <Card.Meta>

          </Card.Meta>
          <Card.Description>
          {this.props.currentHP}/{this.props.hp} HP
          </Card.Description>
        </Card.Content>
        <Card.Content extra>

        </Card.Content>
      </Card>
    )
  }
}

export default PokemonCard2
