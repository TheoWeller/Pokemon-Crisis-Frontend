import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'


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
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => this.props.useMove(this.props.moves[0], "player2")}>
             {this.props.moves[0] ? this.props.moves[0].name : null}
           </Button>
          <Button basic color='green' onClick={() => this.props.useMove(this.props.moves[1], "player2")}>
             {this.props.moves[1] ? this.props.moves[1].name : null}
           </Button>
          <Button basic color='green' onClick={() => this.props.useMove(this.props.moves[2], "player2")}>
             {this.props.moves[2] ? this.props.moves[2].name : null}
           </Button>
          <Button basic color='green' onClick={() => this.props.useMove(this.props.moves[3], "player2")}>
             {this.props.moves[3] ? this.props.moves[3].name : null}
           </Button>
         </div>
        </Card.Content>
      </Card>
    )
  }
}

export default PokemonCard2
