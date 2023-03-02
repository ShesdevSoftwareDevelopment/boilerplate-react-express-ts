import { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import TicTacToe from "./components/tic-tac-toe/TicTacToe";
import { User } from "./types/componentTypes";

const App = () => {
  const [user, setUser] = useState<User | null>();
  const [startGame, setStartGame] = useState<Boolean>(false);
  const [lastGameState, setLastGameState] = useState(Array(9).fill(null));
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");

  const getUserNames = () => {
    const firstUsername = localStorage.getItem("firstusername");
    const secondUsername = localStorage.getItem("secondusername");
    const currentGameState = localStorage.getItem("history");
    if (firstUsername) {
      setPlayerOneName(firstUsername);
    }
    if (secondUsername) {
      setPlayerTwoName(secondUsername);
    }
    if (currentGameState) {
      setLastGameState(JSON.parse(currentGameState));
      const isInitialGameState = !JSON.parse(currentGameState).reduce(
        (el: any) => el
      );
      if (!isInitialGameState) setStartGame(true);
    }
  };

  useEffect(getUserNames, [startGame]);
  return (
    <>
      {startGame && (
        <TicTacToe
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          lastGameState={lastGameState}
          setPlayerOneName={setPlayerOneName}
          setPlayerTwoName={setPlayerTwoName}
          setStartGame={setStartGame}
        />
      )}
      <AppHeader user={user} setUser={setUser} setStartGame={setStartGame} />
    </>
  );
};

export default App;
