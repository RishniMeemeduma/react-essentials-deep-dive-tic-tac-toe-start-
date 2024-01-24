import {useState} from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard.jsx';
function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => curActivePlayer=== 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
            <Player name="Player 1" symbol="X"  isActive={activePlayer}/>
            <Player name="Player 2" symbol="O" isActive={activePlayer}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
