import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'


class PokemonCard2 extends React.Component{
  renderTypeColor = (i) => {
    const type = (this.props.poke.moves[i] && this.props.poke.moves[i].type) ? this.props.poke.moves[i].type.name : "plain"
    return `btn ${type}`
  }


  render() {
    return (
      <Card style={{background: "red"}}>
        <div style={{color: "gold"}}>
          {console.log(this.props.turn)}
          {this.props.turn === "player2" ? "It is your turn!" : null}
        </div>
        <Image src={this.props.poke.sprites.front_default} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.poke.name}</Card.Header>
          <Card.Meta>

          </Card.Meta>
          <Card.Description>
            {this.props.poke.currentHP ? this.props.poke.currentHP : 0}/{this.props.poke.convertedStats.hp} HP
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div >
            <button className={this.renderTypeColor(0)} onClick={() => this.props.useMove(this.props.poke.moves[0], "player2")}>
               {this.props.poke.moves[0] ? this.props.poke.moves[0].name : null}
             </button>
            <button className={this.renderTypeColor(1)} onClick={() => this.props.useMove(this.props.poke.moves[1], "player2")}>
               {this.props.poke.moves[1] ? this.props.poke.moves[1].name : null}
             </button>
            <button className={this.renderTypeColor(2)} onClick={() => this.props.useMove(this.props.poke.moves[2], "player2")}>
               {this.props.poke.moves[2] ? this.props.poke.moves[2].name : null}
             </button>
            <button className={this.renderTypeColor(3)} onClick={() => this.props.useMove(this.props.poke.moves[3], "player2")}>
               {this.props.poke.moves[3] ? this.props.poke.moves[3].name : null}
             </button>
           </div>
        </Card.Content>
      </Card>
    )
  }
}

export default PokemonCard2
