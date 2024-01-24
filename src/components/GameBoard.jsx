const initialGameBoard = [
  ["X", "X", "X"],
  ["X", "X", "X"],
  ["X", "X", "X"],
];

export default function GameBoard() {
  return (
    <ol id="game-board">
        {initialGameBoard.map((row) => (
          
        ))}
    </ol>
  );
}
