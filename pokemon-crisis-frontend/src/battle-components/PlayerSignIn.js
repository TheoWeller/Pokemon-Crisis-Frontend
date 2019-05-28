import React from 'react';
import semantic from 'semantic-ui-react';

class PlayerSignIn extends React.Component {

  state = {
    name: ""
  }

  renderInput = (e) => {
    // console.log(e.target.value)
    this.setState({name: e.target.value})
  }

  renderForm = () => {
    return <form onSubmit={this.props.signUp}>
      <label>
        Eyo
        <input type="text" name="name" value={this.state.name} onChange={this.renderInput}/>
      </label>
      <input type="submit" name="submit" />
    </form>

  }

  renderPlayer1 = () => {
    console.log(this.props.player1);
    return <span>Welcome {this.props.player1.name}!</span>

  }



  render() {
    return (
      this.props.player1.name ? this.renderPlayer1() : this.renderForm()
    )
  }

}

export default PlayerSignIn
