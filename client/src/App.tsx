import { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import TicTacToe from "./components/tic-tac-toe/TicTacToe";
import { User } from "./types/componentTypes";

const App = () => {
  const [user, setUser] = useState<User | null>();
  const [startGame, setStartGame] = useState<Boolean>(false);
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");

  const getUserNames = () => {
    const firstUsername = localStorage.getItem("firstusername");
    const secondUsername = localStorage.getItem("secondusername");
    if (firstUsername) {
      setPlayerOneName(firstUsername);
    }
    if (secondUsername) {
      setPlayerTwoName(secondUsername);
    }
  };

  useEffect(getUserNames, [startGame]);
  return (
    <>
      {startGame && (
        <TicTacToe
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          setPlayerOneName={setPlayerOneName}
          setPlayerTwoName={setPlayerTwoName}
        />
      )}
      <AppHeader user={user} setUser={setUser} setStartGame={setStartGame} />
    </>
  );
};

export default App;
