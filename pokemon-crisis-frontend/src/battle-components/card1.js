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
    this.calculateStat("hp", this.props.poke.stats[5].base_stat)
    this.calculateStat("atk", this.props.poke.stats[4].base_stat)
    this.calculateStat("def", this.props.poke.stats[3].base_stat)
    this.calculateStat("sAtk", this.props.poke.stats[2].base_stat)
    this.calculateStat("sDef", this.props.poke.stats[1].base_stat)
    this.calculateStat("speed", this.props.poke.stats[0].base_stat)
  }
/*******************************************************************************
    CALCULATING INITIAL STATISTICS
*******************************************************************************/
  calculateStat = (stat, baseStat) => {
    if (stat === "hp"){
      const convertedHP = Math.floor( ( ( ( 2 * baseStat + 0 + ( 0/4 ) ) * this.props.level) / 100 ) + this.props.level + 10 )
      this.setState({hp: convertedHP, currentHP: convertedHP})
    } else {
      const convertedStat = Math.floor( ( ( ( ( 2 * baseStat + 0 + ( 0/4 ) ) * this.props.level) / 100 ) + 5 ) * 1 )
      this.setState({[stat]: convertedStat})
    }
  }

  render() {
    return (
      <Card style={{background: "blue"}}>
        <Image src={this.props.poke.sprites.front_default} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.poke.name}</Card.Header>
          <Card.Meta>

          </Card.Meta>
          <Card.Description>
            {this.state.currentHP}/{this.state.hp} HP
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
               {this.props.moves[0] ? this.props.moves[0].name : null}
             </Button>
            <Button basic color='green'>
               {this.props.moves[1] ? this.props.moves[1].name : null}
             </Button>
            <Button basic color='green'>
               {this.props.moves[2] ? this.props.moves[2].name : null}
             </Button>
            <Button basic color='green'>
               {this.props.moves[3] ? this.props.moves[3].name : null}
             </Button>
           </div>
        </Card.Content>
      </Card>
    )
  }
}

export default PokemonCard1
