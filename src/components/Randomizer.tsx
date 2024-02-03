import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSockets } from "../hooks/useSockets";
import { GameDisplayCard } from "./GameDisplayCard";
import gameDataJson from "../data/game_collection.json";
import { Game } from "../types/Game";

export const Randomizer = () => {
  let gameData: Game[] = gameDataJson as Game[];
  gameData = gameData.filter((g) => g.Category === "Games");
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [speed, setSpeed] = useState<number>(50); // Starting interval speed in milliseconds
  const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const isDev = process.env.NODE_ENV === "development";
  const clear = () => clearInterval(intervalRef.current);

  const startRandomizing = () => {
    if (!isRandomizing) {
      setSelectedGame(null);
      setSpeed(50); // Reset speed to initial value
      setIsRandomizing(true);
    }
  };

  const { confirmGameSelection } = useSockets({
    onButtonPress: startRandomizing,
  });

  useEffect(() => {
    const confirmSelection = () => {
      const game = gameData[selectedCardIndex];
      clear();
      setSelectedGame(game);
      setIsRandomizing(false);
      confirmGameSelection(game);
    };

    if (isRandomizing && speed > 0) {
      intervalRef.current = setInterval(() => {
        setSelectedCardIndex(Math.floor(Math.random() * gameData.length));
        setSpeed((prevSpeed) => {
          const newSpeed = prevSpeed * 1.05; // Adjust the multiplier for faster slowdown
          if (newSpeed > 450) confirmSelection();
          return newSpeed < 500 ? newSpeed : prevSpeed; // Cap the speed increase to stop it
        });
      }, speed);
    } else if (speed <= 0 && isRandomizing) {
      clear();
      setIsRandomizing(false);
    }

    return () => clear(); // Cleanup on component unmount or when stopping the randomization
  }, [confirmGameSelection, gameData, isRandomizing, selectedCardIndex, speed]);

  return (
    <Container>
      {(isRandomizing || selectedGame) && (
        <GameDisplayCard
          game={gameData[selectedCardIndex]}
          showArtwork={!isRandomizing}
        />
      )}
      {isDev && <button onClick={() => startRandomizing()}>Start</button>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  align-items: center;
  gap: 20px;
  background-color: #111111;
`;
