import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

class Leaderboard extends React.Component {

  renderLeaderBoardForm = (stat, index) => {
    if (this.props.leaderBoard){
      return this.props.leaderBoard[index][stat]
    } else {
      return "Pending..."
    }
  }

  render(){
    console.log(this.props.leaderBoard);
    return (
      <div id="leaderboard">
        <Table size='small' id="table">
          <Table.Header className="lead-header">
            <Table.Row className="lead-row">
              <Table.HeaderCell className="table-header" >Place</Table.HeaderCell>
              <Table.HeaderCell className="table-header" >Name</Table.HeaderCell>
              <Table.HeaderCell className="table-header" >Wins</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="lead-row">1st</Table.Cell>
                <Table.Cell className="lead-row">{this.renderLeaderBoardForm("name", 0)}</Table.Cell>
                <Table.Cell className="lead-row">{this.renderLeaderBoardForm("win", 0)}</Table.Cell>
                </Table.Row>
              <Table.Row className="lead-row">
                <Table.Cell>2nd</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("name", 1)}</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("win", 1)}</Table.Cell>
              </Table.Row>
              <Table.Row className="lead-row">
                <Table.Cell>3rd</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("name", 2)}</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("win", 2)}</Table.Cell>
              </Table.Row>
              <Table.Row className="lead-row">
                <Table.Cell>4th</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("name", 3)}</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("win", 3)}</Table.Cell>
              </Table.Row>
              <Table.Row className="lead-row">
                <Table.Cell>5th</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("name", 4)}</Table.Cell>
                <Table.Cell>{this.renderLeaderBoardForm("win", 4)}</Table.Cell>
              </Table.Row>
            </Table.Body>
        </Table>

    </div>
    )
  }

}

export default Leaderboard
