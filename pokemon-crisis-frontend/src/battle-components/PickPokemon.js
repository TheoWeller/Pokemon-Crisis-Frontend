import React from 'react';
import {Grid, Image, Card, Button } from 'semantic-ui-react';

class PickPokemon extends React.Component {


    renderImage = (player) => {

      if (this.props.turn === player) {
        return this.props.selectedPokemen.sprites ? this.props.selectedPokemen.sprites.front_default : null
      } else {
        return null
      }
      // const imgUrl = this.props.selectedPokemen.sprites.front_default
    }



  render(){
    console.log("MOVENAMES", this.props.selectedPokemen.moveNames);
    return (
      <div id="pick-pokes">
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <h1>{this.props.player1.name}</h1>
                  <Image src={this.props.player1.battlePoke ? this.props.player1.battlePoke.sprites.front_default : this.renderImage("player1")} />
                <Card.Description>
                  {`Moves: ${this.props.selectedPokemen.moveNames}`}
                </Card.Description>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <h1>{this.props.player2.name}</h1>
                <Image src={this.props.player2.battlePoke ? this.props.player2.battlePoke.sprites.front_default : this.renderImage("player2")} />
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button onClick={(e) => this.props.handlePokemonSelect(e)}>CATCH!</Button>
      </div>
        )
      }
    }
    export default PickPokemon;
