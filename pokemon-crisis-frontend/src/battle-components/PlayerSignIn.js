import React from 'react';
import {Form} from 'semantic-ui-react';

class PlayerSignIn extends React.Component {

  state = {
    player1: "",
    player2: ""
  }

  renderInput = (player, e) => {
    const input = e.target.value
    this.setState({[player]: input })
  }

  renderForm = () => {
    return (
    <Form onSubmit={(e) => this.props.signUp(this.state.player1, this.state.player2, e)}>
      <Form.Group widths='equal'>
        <Form.Input fluid label='Player 1' placeholder='Name' value={this.state.player1} onChange={(e) => this.renderInput("player1", e)}/>
        <Form.Input fluid label='Player 2' placeholder='Name' value={this.state.player2} onChange={(e) => this.renderInput("player2", e)}/>
        <Form.Button>Battle</Form.Button>
       </Form.Group>
    </Form>
    )
  }

  renderPlayer1 = () => {
    console.log(this.props);
    return (
      <span>
        Welcome {this.props.player1.name}!
        Welcome {this.props.player2.name}!
      </span>
    )

  }



  render() {
    return (
      this.props.player1.name ? this.renderPlayer1() : this.renderForm()
    )
  }

}

export default PlayerSignIn