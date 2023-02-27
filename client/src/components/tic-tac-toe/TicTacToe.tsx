import { useState } from "react";
import "./TicTacToe.css";

function Square({ value, onSquareClick }: any) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
  playerOneName,
  playerTwoName,
}: any) {
  function handleClick(i: any) {
    if (calculateWinner(squares, playerOneName, playerTwoName) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares, playerOneName, playerTwoName);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    const arrayIsFull = squares.every((element: string) => element !== null);
    status = arrayIsFull
      ? "It's a Tie!"
      : "Next player: " + (xIsNext ? playerOneName : playerTwoName);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game({
  playerOneName,
  playerTwoName,
  setPlayerOneName,
  setPlayerTwoName,
}: any) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const handleFirstUsernameChange = (event: any) => {
    setPlayerOneName(event.target.value);
    localStorage.setItem("firstusername", event.target.value);
  };

  const handleSecondUsernameChange = (event: any) => {
    setPlayerTwoName(event.target.value);
    localStorage.setItem("secondusername", event.target.value);
  };

  const handleHistoryChange = (nextHistory: string[][]) => {
    const hostoryString = JSON.stringify(nextHistory[nextHistory.length - 1]);
    localStorage.setItem("history", hostoryString);
  };

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    handleHistoryChange(nextHistory);
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="user-names">
        <h1>Names</h1>
        <label htmlFor="p1">Player 1</label>
        <input
          name="p1"
          type="text"
          value={playerOneName}
          onChange={handleFirstUsernameChange}
        />
        <br />
        <label htmlFor="p2">Player 2</label>

        <input
          name="p2"
          type="text"
          value={playerTwoName}
          onChange={handleSecondUsernameChange}
        />
      </div>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(
  squares: string[],
  playerOneName: string,
  playerTwoName: string
) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] === "X" ? playerOneName : playerTwoName;
    }
  }
  return null;
}