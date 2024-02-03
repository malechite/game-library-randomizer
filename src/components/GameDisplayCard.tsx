import React from "react";
import styled from "styled-components";
import { Game } from "../types/Game";

interface GameDisplayCardProps {
  game: Game;
}

export const GameDisplayCard = ({ game }: GameDisplayCardProps) => {
  return (
    <Card>
      <Title>{game.Title}</Title>
      <Platform>{game.Platform}</Platform>
      <Value>
        Current Value: <span>${game.YourPrice}</span>
      </Value>
      <Detail>
        Developed by {game.Developer}, published by {game.Publisher}.
      </Detail>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 36px;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.h2`
  font-size: calc(100vh / 14);
  font-family: "Play", sans-serif;
  color: #fff;
  margin: 0;
`;

const Platform = styled.p`
  font-size: calc(100vh / 22);
  font-family: "Play", sans-serif;
  color: #aaa;
`;

const Value = styled.p`
  font-size: calc(100vh / 30);
  font-family: "Play", sans-serif;
  position: relative;
  display: inline-block;
  color: #aaa;
  span {
    color: #4caf50;
  }
`;

const Detail = styled.p`
  display: flex;
  flex: 1;
  align-items: flex-end;
  font-size: 14px;
  font-family: "Play", sans-serif;
  color: #aaa;
`;
