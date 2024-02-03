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
  const image = game.Image ? require(`../../assets/${game.Image}`) : null;
  return (
    <Card>
      <Title>{game.Title}</Title>
      <Platform>{game.Platform}</Platform>
      <Value>
        Current Value: <span>${game.YourPrice}</span>
      </Value>
      {!!image && showArtwork && (
        <ImageContainer>
          <img src={image} alt={game.Title} />
        </ImageContainer>
      )}
      <Detail>
        Developed by {game.Developer}, published by {game.Publisher}.
      </Detail>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 36px;
  height: 100vh;
  width: 100vw;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 36px;
  max-height: 50vh;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
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
