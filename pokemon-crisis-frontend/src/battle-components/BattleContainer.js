import React from 'react';
import semantic from 'semantic-ui-react';
import PokemonCard1 from './card1'
import PokemonCard2 from './card2'
import _ from 'lodash'
import {Grid} from 'semantic-ui-react';

let newObj = {}
class BattleContainer extends React.Component {

  state = {
    player1: this.props.player1.battlePoke,
    player2: this.props.player2.battlePoke,
    playerMoves: [],
    level: 20,
    counter: 0,
    message: "",
    knockedOut: ""
  }

  componentDidMount(){
    this.fetchPlayersHelper()
    this.calculateStat("player1")
    this.calculateStat("player2")
    this.determineFirst()
  }

  rematch = () => {
    if (this.state.knockedOut !== "") {
      let winner = this.state.knockedOut === "player1" ? "player2" : "player1"
      const results = {winner: this.props[winner].id, loser: this.props[this.state.knockedOut].id}
      this.props.handleStats(results)
      return <button className="btn rematch" onClick={this.props.rematch}>Rematch?</button>
    }
  }

  /*****************************************************************************
    FETCH HELPER METHODS
  *****************************************************************************/
  fetchMovesPlayerOne = (player, url) => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      let playerClone = { ...this.state.player1, moves: [...this.state.player1.moves, data] }
      this.deleteUselessKeysFromMoves(playerClone.moves)
      playerClone.moves = this.removeOldMoveSlots(playerClone.moves);
      this.setState({player1: playerClone, counter: this.state.counter + 1})
    })
  }

  fetchMovesPlayerTwo = (player, url) => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      let playerClone = { ...this.state.player2, moves: [...this.state.player2.moves, data] }
      this.deleteUselessKeysFromMoves(playerClone.moves)
      playerClone.moves = this.removeOldMoveSlots(playerClone.moves);
      this.setState({player2: playerClone, counter: this.state.counter + 1})
    })
  }

  fetchPlayersHelper = () => {
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][0]["move"]["url"])
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][1]["move"]["url"])
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][2]["move"]["url"])
    this.fetchMovesPlayerOne(this.state.player1, this.state.player1["moves"][3]["move"]["url"])

    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][0]["move"]["url"])
    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][1]["move"]["url"])
    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][2]["move"]["url"])
    this.fetchMovesPlayerTwo(this.state.player2, this.state.player2["moves"][3]["move"]["url"])
  }

  /*****************************************************************************
    FORMATTING MOVES HELPER METHODS
  *****************************************************************************/
  //The pokemon api comes with an immense amount of information
  deleteUselessKeysFromMoves = (playerMoves) => {
    playerMoves.forEach(move => {
      delete move.contest_combos;
      delete move.effect_changes;
      delete move.effect_chance;
      delete move.priority;
      delete move.stat_changes;
      delete move.past_values;
      delete move.contest_effect;
      delete move.contest_type;
      delete move.generation;
      delete move.flavor_text_entries;
      delete move.machines;
      delete move.meta;
      delete move.names;
      delete move.super_contest_effect;
      delete move.target;
    })
  }

  removeOldMoveSlots = (playerMoves) => {
    return playerMoves.filter(move => {
      return !move.hasOwnProperty('move')
    })
  }

  /*******************************************************************************
      CALCULATING INITIAL STATISTICS
  *******************************************************************************/
    calculateStat = (player) => {

      const convertedHP = Math.floor( ( ( ( 2 * this.state[player].stats[5].base_stat + 0 + ( 0/4 ) ) * this.state.level) / 100 ) + this.state.level + 10
      const convertedAtk = this.convertedStatNotHP(player, 4)
      const convertedDef = this.convertedStatNotHP(player, 3)
      const convertedSAtk = this.convertedStatNotHP(player, 2)
      const convertedSDef = this.convertedStatNotHP(player, 1)
      const convertedSpeed = this.convertedStatNotHP(player, 0)
      const converted = {
        hp: convertedHP,
        atk: convertedAtk,
        def: convertedDef,
        sAtk: convertedSAtk,
        sDef: convertedSDef,
        speed: convertedSpeed
      }

      this.setState({
        [player]: {
          ...this.state[player],
          currentHP: convertedHP,
          convertedStats: converted
        }
      })
    }

    convertedStatNotHP = (player, index) => {
      return Math.floor( ( ( ( ( 2 * this.state[player].stats[index].base_stat + 0 + ( 0/4 ) ) * this.state.level) / 100 ) + 5 ) * 1 )
    }

  /*****************************************************************************
    ATTACKING METHODS
  *****************************************************************************/
  useMove = (move, pkmn) => {
    if (this.props.turn === pkmn && this.state.knockedOut === "") {

    const enemy = pkmn === "player1" ? "player2" : "player1"
    let attackingStat;
    let defendingStat;
    if (move.damage_class.name === "physical"){
      attackingStat = this.state[pkmn].convertedStats.atk
      defendingStat = this.state[enemy].convertedStats.def
    } else if (move.damage_class.name === "special"){
      attackingStat = this.state[pkmn].convertedStats.sAtk
      defendingStat = this.state[enemy].convertedStats.sDef
    }

    let baseDamage = ( ( ( ( ( 2 * this.state.level ) / 5 ) + 2 ) * move.power * ( attackingStat/defendingStat ) ) / 50 ) + 2
    /*****************
    DAMAGE MODIFIERS
    *****************/
    const typeMultipler = this.typeAdvantage(move.type.name, this.state[enemy].types)
    const stab = this.calcSTAB(move.type.name, this.state[pkmn].types)
    const criticalHit = (_.random(1, 24) === 24 ? 1.5 : 1 )
    const random = _.random(217, 255) / 255
    /*****************
      NOTIFICATIONS
    *****************/
    let message
    message = `${_.capitalize(this.state[pkmn].name)} used ${move.name}!`

    // TYPES EFFECTIVENESS MESSAGES
    if (typeMultipler === 0.5){
      message = message.concat('\n', "It was not very effective.")
    } else if (typeMultipler === 2) {
      message = message.concat('\n', "It was super effective!")
    } else if (typeMultipler === 0) {
      message = message.concat('\n',`${_.capitalize(this.state[enemy].name)} was unaffected by ${move.name}`)
    } else if (typeMultipler === 0.25) {
      message = message.concat('\n', " It was super not very effective!!!")
    } else if (typeMultipler === 4) {
      message = message.concat('\n', " That was super duper effective!!!")
    }
     if (criticalHit === 1.5) {
       message = message.concat('\n', " Critical Hit!")
     }
    baseDamage = baseDamage * typeMultipler * stab * criticalHit * random

    let damageDifference = (Math.floor(baseDamage) > this.state[enemy].currentHP) ? 0 : this.state[enemy].currentHP - Math.floor(baseDamage)
    damageDifference === 0 ? message = message.concat('\n', `${_.capitalize(this.state[enemy].name)} was knocked out!`) : message = message

    let knockedOutPlayer
    damageDifference === 0 ? knockedOutPlayer = enemy : knockedOutPlayer = ""

    this.setState( {
      [enemy]: {
        ...this.state[enemy],
        currentHP: damageDifference
      },
      message: message,
      knockedOut: knockedOutPlayer
    }, () => this.props.turnChange() )
  } else if (this.props.turn !== pkmn) {
    alert("It is not your turn!");
    }
  }

  /*****************************************************************************
    ATTACKING HELPER METHODS
  *****************************************************************************/
  typeAdvantage = (attackingType, defendingType) => {
    const chart = {
      normal: {
        rock: .5,
        ghost: 0,
        steel: .5
      },
      fire: {
        fire: .5,
        water: .5,
        grass: 2,
        ice: 2,
        bug: 2,
        rock: .5,
        dragon: .5,
        steel: 2
      },
      water: {
        fire: 2,
        water: .5,
        grass: .5,
        ground: 2,
        rock: 2,
        dragon: .5
      },
      electric: {
        water: 2,
        electric: .5,
        grass: .5,
        ground: 0,
        flying: 2,
        dragon: .5
      },
      grass : {
        fire: .5,
        water: 2,
        grass: .5,
        poison: .5,
        ground: 2,
        flying: .5,
        bug: .5,
        rock: 2,
        dragon: .5,
        steel: .5
      },
      ice: {
        fire: .5,
        water: .5,
        grass: 2,
        ice: .5,
        ground: 2,
        flying: 2,
        dragon: 2,
        steel: .5
      },
      fighting: {
        normal: 2,
        ice: 2,
        poison: .5,
        flying: .5,
        psychic: .5,
        bug: .5,
        rock: 2,
        ghost: 0,
        dark: 2,
        steel: 2,
        fairy: .5
      },
      poison: {
        grass: 2,
        poison: .5,
        ground: .5,
        rock: .5,
        ghost: .5,
        steel: 0,
        fairy: 2
      },
      ground: {
        fire: 2,
        electric: 2,
        grass: .5,
        poison: 2,
        flying: 0,
        bug: .5,
        rock: 2,
        steel: 2
      },
      flying: {
        electric: .5,
        grass: 2,
        fighting: 2,
        bug: 2,
        rock: .5,
        steel: .5
      },
      psychic: {
        fighting: 2,
        poison: 2,
        psychic: .5,
        dark: 0,
        steel: .5
      },
      bug: {
        fire: .5,
        grass: 2,
        fighting: .5,
        poison: .5,
        flying: .5,
        psychic: 2,
        ghost: .5,
        dark: 2,
        steel: .5,
        fairy: .5
      },
      rock: {
        fire: 2,
        ice: 2,
        fighting: .5,
        ground: .5,
        flying: 2,
        bug: 2,
        steel: .5
      },
      ghost: {
        normal: 0,
        psychic: 2,
        ghost: 2,
        dark: .5
      },
      dragon: {
        dragon: 2,
        steel: .5,
        fairy: 0
      },
      dark: {
        fighting: .5,
        psychic: 2,
        ghost: 2,
        dark: .5,
        fairy: .5
      },
      steel: {
        fire: .5,
        water: .5,
        electric: .5,
        ice: 2,
        rock: 2,
        steel: .5,
        fairy: 2
      },
      fairy: {
        fire: .5,
        fighting: 2,
        poison: .5,
        dragon: 2,
        dark: 2,
        steel: .5
      }
    }
    if (defendingType.length === 1) {
      return chart[attackingType][defendingType[0].type.name] === undefined ? 1 : chart[attackingType][defendingType[0].type.name]
    }  else {
      const firstType = chart[attackingType][defendingType[0].type.name] === undefined ? 1 : chart[attackingType][defendingType[0].type.name]
      const secondType = chart[attackingType][defendingType[1].type.name] === undefined ? 1 : chart[attackingType][defendingType[1].type.name]

      return (firstType * secondType)
    }
  }

  calcSTAB = (attackingType, attackingPokemon) => {
    if (attackingPokemon.length === 1){
      return attackingPokemon[0].type.name === attackingType ? 1.5 : 1
    } else {
      const firstType = attackingPokemon[0].type.name === attackingType ? 1.5 : 1
      const secondType = attackingPokemon[1].type.name === attackingType ? 1.5 : 1
      return firstType * secondType
    }
  }

  determineFirst = () => {
    const player1Speed = this.state.player1.stats[0].base_stat
    const player2Speed = this.state.player2.stats[0].base_stat
    let fasterPoke;
    if (player1Speed > player2Speed){
      fasterPoke = "player1"
    } else if (player1Speed < player2Speed) {
      fasterPoke = "player2"
    } else if (player1Speed === player2Speed) {
      fasterPoke = _.random(["player1", "player2"])
    }
    this.props.determineFirstPoke(fasterPoke)
  }

  renderBattleCards = () => {
    if (this.state.counter > 7) {
      return (
        <Grid columns={2} divided id="battle-grid">
          <Grid.Row>
          <Grid.Column width={1}/>
            <Grid.Column id="battle-buddies-1" width={6}>
              <PokemonCard1 turn={this.props.turn} poke={this.state.player1} useMove={this.useMove} />
            </Grid.Column>
            <Grid.Column width={2}>
              {this.rematch()}
            </Grid.Column>
            <Grid.Column id="battle-buddies-2" width={6}>
              <PokemonCard2 turn={this.props.turn} poke={this.state.player2} useMove={this.useMove} />
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
      )
    }
  }
  render(){
    return (
      <div id="battle-container">
        <h1></h1>
          {this.renderBattleCards()}
        <br />
          {this.state.message}
      </div>
    )
  }
}
export default BattleContainer;

// <PokemonCard1 poke={pokemon1} moves={this.state.player1.moves} hp={this.state.player1.convertedStats? this.state.player1.convertedStats.hp : null} currentHP={this.state.player1.currentHP ? this.state.player1.currentHP : null} useMove={this.useMove} />
// <PokemonCard2 poke={pokemon2} moves={this.state.player2.moves} hp={this.state.player2.convertedStats ? this.state.player2.convertedStats.hp : null} currentHP={this.state.player2.currentHP ? this.state.player2.currentHP : null} useMove={this.useMove} />

// {this.props.pokemons[0] ? this.props.pokemons[0].name : "waiting..."}
