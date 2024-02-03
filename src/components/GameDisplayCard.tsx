import React from "react";
import styled from "styled-components";
import { Game } from "../types/Game";

interface GameDisplayCardProps {
  game: Game;
  showArtwork: boolean;
}

export const GameDisplayCard = ({
  game,
  showArtwork,
}: GameDisplayCardProps) => {
  const image =
    game.Image && showArtwork ? require(`../../assets/${game.Image}`) : null;
  return (
    <Card style={image ? { backgroundImage: `url(${image})` } : {}}>
      <GradientOverlay />
      <GameInfo>
        <Title>{game.Title}</Title>
        <Platform>{game.Platform}</Platform>
        <Value>
          Current Value: <span>${game.YourPrice}</span>
        </Value>
        <Detail>
          Developed by {game.Developer}, published by {game.Publisher}.
        </Detail>
      </GameInfo>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  display: flex;
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`;

const GameInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 36px;
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  font-size: calc(100vh / 11);
  font-family: "Play", sans-serif;
  color: #fff;
  margin: 0;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Platform = styled.p`
  font-size: calc(100vh / 18);
  font-family: "Play", sans-serif;
  color: #ccc;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Value = styled.p`
  font-size: calc(100vh / 20);
  font-family: "Play", sans-serif;
  position: relative;
  display: inline-block;
  color: #ccc;
  span {
    color: #4caf50;
  }
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Detail = styled.p`
  display: flex;
  flex: 1;
  align-items: flex-end;
  font-size: 22px;
  font-family: "Play", sans-serif;
  color: #ccc;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;
