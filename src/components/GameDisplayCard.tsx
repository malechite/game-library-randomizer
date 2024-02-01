import React from "react";
import styled from "styled-components";
import { Game } from "../types/Game";

interface GameDisplayCardProps {
  game: Game;
}

export const GameDisplayCard = ({ game }: GameDisplayCardProps) => {
  return (
    <Card>
      <CardContent>
        <Title>{game.Title}</Title>
        <Detail>Platform: {game.Platform}</Detail>
        <Detail>Publisher: {game.Publisher}</Detail>
        <Detail>Developer: {game.Developer}</Detail>
        {/* Add more details as needed */}
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 250px;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const Detail = styled.p`
  font-size: 14px;
  color: #333;
`;
