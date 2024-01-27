import {useState} from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning_combinations';
import GameWinner from './components/GameWinner';

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derievePlayer(gameTurns) {
  let currentplayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player== 'X') {
    currentplayer = 'O';
  }
  return currentplayer;
}

function derieveWinner(gameBoard, players) {
  let winner;

  for(const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function derieveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

  for(const turns of gameTurns) {
    const {square, player} = turns;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derievePlayer(gameTurns);

  const gameBoard = derieveGameBoard(gameTurns);

  const winner = derieveWinner(gameBoard, players);

  const hasDraw = gameTurns.length=== 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentplayer = derievePlayer(prevTurns);
      let updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentplayer},...prevTurns]
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    }  
    );
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
            <Player name={PLAYERS.X} symbol="X"  isActive={activePlayer} onChangeName={handlePlayerNameChange}/>
            <Player name={PLAYERS.O} symbol="O" isActive={activePlayer} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameWinner winner={winner} restart={handleRestart} /> }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log Turns={gameTurns}/>
    </main>
  )
}

export default App
