import React from "react";
import { Randomizer } from "./components/Randomizer";
import { useSockets } from "./hooks/hooks";

function App() {
  useSockets();

  return (
    <div className="App">
      <Randomizer />
    </div>
  );
}

export default App;
