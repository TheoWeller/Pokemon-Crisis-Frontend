import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'


class PokemonCard2 extends React.Component{
  renderTypeColor = (i) => {
    console.log(this.props.moves[i])
    const type = (this.props.moves[i] && this.props.moves[i].type) ? this.props.moves[i].type.name : "plain"
    return `btn ${type}`
  }


  render() {
    return (
      <Card style={{background: "red"}}>
        <Image src={this.props.poke.sprites.front_default} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.poke.name}</Card.Header>
          <Card.Meta>

          </Card.Meta>
          <Card.Description>
            {this.props.currentHP ? this.props.currentHP : 0}/{this.props.hp} HP
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div >
            <button className={this.renderTypeColor(0)} onClick={() => this.props.useMove(this.props.moves[0], "player1")}>
               {this.props.moves[0] ? this.props.moves[0].name : null}
             </button>
            <button className={this.renderTypeColor(1)} onClick={() => this.props.useMove(this.props.moves[1], "player1")}>
               {this.props.moves[1] ? this.props.moves[1].name : null}
             </button>
            <button className={this.renderTypeColor(2)} onClick={() => this.props.useMove(this.props.moves[2], "player1")}>
               {this.props.moves[2] ? this.props.moves[2].name : null}
             </button>
            <button className={this.renderTypeColor(3)} onClick={() => this.props.useMove(this.props.moves[3], "player1")}>
               {this.props.moves[3] ? this.props.moves[3].name : null}
             </button>
           </div>
        </Card.Content>
      </Card>
    )
  }
}

export default PokemonCard2
