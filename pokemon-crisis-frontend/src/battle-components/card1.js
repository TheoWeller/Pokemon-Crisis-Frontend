import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'


class PokemonCard1 extends React.Component{
  state = {
    atk: 0,
    def: 0,
    sAtk: 0,
    sDef: 0,
    speed: 0,
    hp: 0,
    currentHP: 0
  }

  componentDidMount() {
    // this.calculateStat("hp", this.props.poke.stats[5].base_stat)
    // this.calculateStat("atk", this.props.poke.stats[4].base_stat)
    // this.calculateStat("def", this.props.poke.stats[3].base_stat)
    // this.calculateStat("sAtk", this.props.poke.stats[2].base_stat)
    // this.calculateStat("sDef", this.props.poke.stats[1].base_stat)
    // this.calculateStat("speed", this.props.poke.stats[0].base_stat)
  }
/*******************************************************************************
    CALCULATING INITIAL STATISTICS
    NOTE: MOVED UP TO PARENT COMPONENT, COULD NOT MAKE IT WORK AS SMOOTHLY
    THIS CODE IS A VESTIGE, BUT COULD BE USED TO REFACTOR IN THE FUTURE
*******************************************************************************/
  // calculateStat = (stat, baseStat) => {
  //   if (stat === "hp"){
  //     const convertedHP = Math.floor( ( ( ( 2 * baseStat + 0 + ( 0/4 ) ) * this.props.level) / 100 ) + this.props.level + 10 )
  //     this.setState({hp: convertedHP, currentHP: convertedHP})
  //   } else {
  //     const convertedStat = Math.floor( ( ( ( ( 2 * baseStat + 0 + ( 0/4 ) ) * this.props.level) / 100 ) + 5 ) * 1 )
  //     this.setState({[stat]: convertedStat})
  //   }
  // }


    renderTypeColor = (i) => {
      const type = (this.props.poke.moves[i] && this.props.poke.moves[i].type) ? this.props.poke.moves[i].type.name : "plain"
      return `btn ${type}`
    }

    renderTurn = () => {
      if(this.props.turn === "player1"){
        return {"borderStyle": "solid", "borderColor": "gold", "borderWidth": ".4em"}
      } else {
        return {"borderStyle": "solid", "borderColor": "black", "borderWidth": ".4em"}
      }
    }

    render() {
      return (
        <Card id="player-1-card" style={this.renderTurn()}>
          <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.poke.id}.png`} wrapped ui={false} />
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
              <button className={this.renderTypeColor(0)} onClick={() => this.props.useMove(this.props.poke.moves[0], "player1")}>
                 {this.props.poke.moves[0] ? this.props.poke.moves[0].name : null}
               </button>
              <button className={this.renderTypeColor(1)} onClick={() => this.props.useMove(this.props.poke.moves[1], "player1")}>
                 {this.props.poke.moves[1] ? this.props.poke.moves[1].name : null}
               </button>
              <button className={this.renderTypeColor(2)} onClick={() => this.props.useMove(this.props.poke.moves[2], "player1")}>
                 {this.props.poke.moves[2] ? this.props.poke.moves[2].name : null}
               </button>
              <button className={this.renderTypeColor(3)} onClick={() => this.props.useMove(this.props.poke.moves[3], "player1")}>
                 {this.props.poke.moves[3] ? this.props.poke.moves[3].name : null}
               </button>
             </div>
          </Card.Content>
        </Card>
      )
    }
  }

export default PokemonCard1
