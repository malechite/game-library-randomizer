import { Game } from "./../types/Game";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

interface SocketOptions {
  onButtonPress: (data: any) => void;
}

export const useSockets = ({ onButtonPress }: SocketOptions) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("buttonPressed", (data) => {
      onButtonPress(data);
    });

    return () => {
      socket.off("connect");
    };
  }, [onButtonPress]);

  const confirmGameSelection = (game: Game) => {
    socket.emit("gameSelected", game);
  };

  return { confirmGameSelection };
};
