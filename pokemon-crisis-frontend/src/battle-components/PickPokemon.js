import React from 'react';
import {Grid, Image, Card, Button } from 'semantic-ui-react';

class PickPokemon extends React.Component {


    renderImage = (player) => {

      if (this.props.turn === player) {
        return this.props.selectedPokemen.sprites ? this.props.selectedPokemen.sprites.front_default : "https://pbs.twimg.com/profile_images/986725869665173505/HO26SmgX_200x200.jpg"
      } else {
        return "https://pbs.twimg.com/profile_images/986725869665173505/HO26SmgX_200x200.jpg"
      }
      // const imgUrl = this.props.selectedPokemen.sprites.front_default
    }

    renderTypes = (player) => {
      if (this.props.selectedPokemen.typeNames && this.props.turn === player) {
        return `Type(s): ${this.props.selectedPokemen.typeNames}`
      } else {
        return null
      }
    }
    renderMoves = (player) => {
      if (this.props.selectedPokemen.moveNames && this.props.turn === player) {
        return `Moves: ${this.props.selectedPokemen.moveNames}`
      } else {
        return null
      }
    }


    renderTurn = (player) => {
      if(this.props.turn === player){
        return {"borderStyle": "solid", "borderColor": "gold", "borderWidth": ".2em"}
      } else {
        return {"borderStyle": "solid", "borderColor": "black", "borderWidth": ".2em"}
      }
    }

    
    // <Card.Description>
    //   {`Moves: ${this.props.selectedPokemen.moveNames}`}
    // </Card.Description>

  render(){
    console.log("TYPES-NAMES", this.props.selectedPokemen.typeNames);
    return (
      <div>
        <div id="pick-pokes">
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Card className="pick-poke-card" style={this.renderTurn("player1")}>
                  <h1>{this.props.player1.name}</h1>
                    <Image className="ui image" src={this.props.player1.battlePoke ? this.props.player1.battlePoke.sprites.front_default : this.renderImage("player1")} />
                </Card>

                <Grid.Column>
                  <div className="select-details">
                    {this.renderTypes("player1")}
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="select-details">
                    {this.renderMoves("player1")}
                  </div>
                </Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <Card className="pick-poke-card" style={this.renderTurn("player2")}>
                  <h1>{this.props.player2.name}</h1>
                  <Image className="ui image" src={this.props.player2.battlePoke ? this.props.player2.battlePoke.sprites.front_default : this.renderImage("player2")} />
                </Card>
                <Grid.Column>
                  <div className="select-details">
                    {this.renderTypes("player2")}
                  </div>
                </Grid.Column>
                <br />
                <Grid.Column>
                  <div className="select-details">
                    {this.renderMoves("player2")}
                  </div>
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        {this.props.selectedPokemen.name ? <div id="catch"><Button onClick={(e) => this.props.handlePokemonSelect(e)}>CATCH!</Button></div> : null}
      </div>
        )
      }
    }
    export default PickPokemon;
