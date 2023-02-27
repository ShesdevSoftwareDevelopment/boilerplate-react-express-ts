import { useState } from "react";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import { User } from "./types/componentTypes";

const App = () => {
  const [user, setUser] = useState<User | null>();
  return <AppHeader user={user} setUser={setUser} />;
};

export default App;
