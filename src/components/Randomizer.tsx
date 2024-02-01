import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { GameDisplayCard } from "./GameDisplayCard";
import gameDataJson from "../data/game_collection.json";
import { Game } from "../types/Game";

export const Randomizer = () => {
  let gameData: Game[] = gameDataJson as Game[];
  gameData = gameData.filter((g) => g.Category === "Games");
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [speed, setSpeed] = useState<number>(10); // Starting interval speed in milliseconds
  const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const clear = () => clearInterval(intervalRef.current);

  useEffect(() => {
    if (isRandomizing && speed > 0) {
      intervalRef.current = setInterval(() => {
        setSelectedCardIndex(Math.floor(Math.random() * gameData.length));
        setSpeed((prevSpeed) => {
          const newSpeed = prevSpeed * 1.1; // Adjust the multiplier for faster slowdown
          if (newSpeed > 450) {
            clear();
            setSelectedGame(gameData[selectedCardIndex]);
            setIsRandomizing(false); // Stop the randomization process
          }
          return newSpeed < 500 ? newSpeed : prevSpeed; // Cap the speed increase to stop it
        });
      }, speed);
    } else if (speed <= 0 && isRandomizing) {
      clear();
      setIsRandomizing(false); // Stop the randomization process
    }

    return () => clear(); // Cleanup on component unmount or when stopping the randomization
  }, [gameData, isRandomizing, selectedCardIndex, speed]);

  const startRandomizing = () => {
    if (!isRandomizing) {
      setSelectedGame(null);
      setSpeed(10); // Reset speed to initial value
      setIsRandomizing(true);
    }
  };

  return (
    <Container>
      {(isRandomizing || selectedGame) && (
        <GameDisplayCard game={gameData[selectedCardIndex]} />
      )}
      {!isRandomizing && (
        <StartButton onClick={startRandomizing}>Go!</StartButton>
      )}
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
  padding: 20px;
  background-color: #f5f5f5;
`;

const StartButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: darkgreen;
  }
`;
