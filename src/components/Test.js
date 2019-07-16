import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { connect } from 'react-redux'

import { getImage } from '../actions/start'

const styles = {
  board: {
    display: 'flex',
    flexDirection: 'column',
    // paddingTop: '50px',
    alignContent: 'center',
    justifyContent: 'center',
    // width: 100
    flex: 1
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  box: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    width: 100,
    height: 100,
    padding: 10,
    // fontSize: 14,
    // color: '#3f3d3d',
    textAlign: 'center'
  },
  text: {
    fontSize: 24,
    // position: 'fixed',
    marginTop: 15
  },
  tl: {},
  tm: {},
  tr: {},
  ml: {},
  m: {},
  mr: {},
  bl: {},
  bm: {},
  br: {},
  win: {
    fontSize: '80px',
    color: '#3f3d3d'
  }
}

export class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: ['', '', '', '', '', '', '', '', ''],
      activePlayer: 'X',
      playerOneTurn: true,
      playerTwoTurn: false,
      winner: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.checkForWin = this.checkForWin.bind(this)
    this.checkRows = this.checkRows.bind(this)
    this.checkCols = this.checkCols.bind(this)
    this.checkDiagonal = this.checkDiagonal.bind(this)
  }

  handleClick(loc) {
    if (this.state.board[loc] === '' && this.state.playerOneTurn) {
      this.setState({
        playerOneTurn: false,
        playerTwoTurn: true,
        activePlayer: 'O'
      })
    }
    if (this.state.board[loc] === '' && this.state.playerTwoTurn) {
      this.setState({
        playerOneTurn: true,
        playerTwoTurn: false,
        activePlayer: 'X'
      })
    }
    if (this.state.board[loc] === '') {
      let newBoard = []
      this.state.board.forEach(item => {
        newBoard.push(item)
      })
      newBoard.splice(loc, 1, this.state.activePlayer)
      this.setState(
        {
          board: newBoard
        },
        () => this.checkForWin()
      )
    }
  }

  handleRefresh() {
    this.setState({
      board: ['', '', '', '', '', '', '', '', ''],
      winner: ''
    })
  }

  checkForWin() {
    this.checkRows()
    this.checkCols()
    this.checkDiagonal() // none of these are working well, need new strategy
  }

  checkRows() {
    // if ever three in a row!
    const {board} = this.state
    let winner = null
    if (board[0] === board[1] && board[1] === board[2]) {
      winner = board[0]
    } else if (board[3] === board[4] && board[4] === board[5]) {
      winner = board[3]
    } else if (board[6] === board[7] && board[7] === board[8]) {
      winner = board[6]
    }
    if (winner) {
      this.setState({
        winner: winner
      })
    }
  }

  checkCols() {
    // if ever exactly two spaces between
    const board = this.state.board
    let winner = null
    if (board[0] === board[3] && board[3] === board[6]) {
      winner = board[0]
    } else if (board[1] === board[4] && board[4] === board[7]) {
      winner = board[1]
    } else if (board[2] === board[5] && board[5] === board[8]) {
      winner = board[2]
    }
    if (winner) {
      this.setState({
        winner: winner
      })
    }
  }

  checkDiagonal() {
    // if ['', '', 'x', '', 'x', 'x', '', '', '']
    // if gap is two, then one, then none
    // if ['x', '', '', '', 'x', '', '', '', 'x']
    // if three separate
    const board = this.state.board
    let winner = null
    if (board[0] === board[4] && board[4] === board[8]) {
      winner = board[0]
    } else if (board[2] === board[4] && board[4] === board[6]) {
      winner = board[2]
    }
    if (winner) {
      this.setState({
        winner: winner
      })
    }
  }

  render() {
    const {
      start: { pic, des },
      start
    } = this.props
    const { board, winner } = this.state
    return (
      <View style={styles.board}>
        <View style={styles.row} className="row">
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(0)}
              title={board[0]}
            />
          </View>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(1)}
              title={board[1]}
            />
          </View>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(2)}
              title={board[2]}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(3)}
              title={board[3]}
            />
          </View>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(4)}
              title={board[4]}
            />
          </View>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(5)}
              title={board[5]}
            >
              {/* {board[5]} */}
            </Button>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(6)}
              title={board[6]}
            />
          </View>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(7)}
              title={board[7]}
            />
          </View>
          <View style={styles.box}>
            <Button
              style={styles.box}
              onPress={() => this.handleClick(8)}
              title={board[8]}
            />
          </View>
        </View>
        <Button
          style={styles.box}
          onPress={() => this.handleRefresh()}
          title="refresh"
        />
        <View style={styles.row}>
          {winner ? (
            <View style={styles.text}>
              <Text>{winner} wins!</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    start: state.start
  }
}

export default connect(mapStateToProps)(Test)
